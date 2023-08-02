require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const algo = 'aes-256-cbc'
const KEY = process.env.SECRET_KEY
const FINAL_KEY = crypto.createHash('sha256').update(KEY).digest().slice(0, 32)

const hash = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashdata = await bcrypt.hash(data, salt)
        return hashdata
    } catch (error) {
        console.log(error)
    }
}

const createMetaMask = async (req, res) => {
    try {
        const { web3_id } = req.body
        const result = await hash(web3_id)
        const user = await User.create({
            web3_id: result,
        })
        if (!user) {
            return res.json({
                success: false,
                message: 'Error creating account',
            })
        }
        res.json({ success: true, message: 'Account created successfully' })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error Occured' })
    }
}

const changeMetaMask = async (req, res) => {
    try {
        const { hash_web3_id, name, pass } = req.body
        const user = await User.findOne({
            web3_id: hash_web3_id,
        })
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found.',
            })
        }
        const secPass = hash(pass)
        await user.updateOne(
            {
                web3_id: hash_web3_id,
            },
            {
                $set: { name: name, pass: secPass },
            }
        )
        const check = user.findOne({
            name: name,
            pass: secPass,
            web3_id: hash_web3_id,
        })
        if (check) {
            return res.json({
                success: true,
                message: 'Row updated successfully.',
            })
        }
        return res.json({ success: false, message: 'Failed to update row.' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Internal server error occurred.' })
    }
}

const loginMetaMask = async (req, res) => {
    try {
        const { curr_web3_id } = req.body
        const users = await User.find({})

        let matchedUser = null
        for (const user of users) {
            const match_id = await bcrypt.compare(curr_web3_id, user.web3_id)
            if (!match_id) {
                return res.json({
                    success: false,
                    message: 'No matching user found.',
                })
            } else {
                const data = {
                    user: {
                        user_id: user._id,
                    },
                }
                const authToken = jwt.sign(data, KEY)
                res.json({
                    success: true,
                    message: 'Logged in Successfully',
                    token: authToken,
                })
            }
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error Occured' })
    }
}

const getMetaMask = async (req, res) => {
    try {
        const id = req.user.user_id
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.json({ success: false, message: 'No User found.' })
        }
        const dec = decrypt(user.web3_id, user.iv)
        user.web3_id = dec
        res.json({ success: true, message: 'User details found.', data: user })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal server error occurred.' })
    }
}

module.exports = { createMetaMask, loginMetaMask, getMetaMask, changeMetaMask }
