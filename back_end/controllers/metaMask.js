require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const crypto = require('crypto')
const KEY = process.env.SECRET_KEY
const encryption = require('../scripts/encryption')
const decryption = require('../scripts/decryption')

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
        // const result = await encryption(web3_id, KEY)
        const check = await User.findOne({
            web3_id: web3_id,
        })
        if (check) {
            return res.json({
                success: false,
                message: 'Current Web3_ID already exists.',
            })
        }
        const user = await User.create({
            web3_id: web3_id,
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
        const { web3_id, name, pass, email } = req.body
        const user = await User.findOne({
            web3_id: web3_id,
        })
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found.',
            })
        }
        const secPass = await hash(pass)
        await User.updateOne(
            {
                web3_id: web3_id,
            },
            {
                $set: { name: name, pass: secPass, email: email },
            }
        )
        const check = await User.findOne({
            name: name,
            pass: secPass,
            web3_id: web3_id,
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
        const { web3_id } = req.body
        // const enc_id = await encryption(curr_web3_id, KEY)
        const user = await User.findOne({
            web3_id: web3_id,
        })
        if (user) {
            const data = {
                user: {
                    user_id: user._id,
                },
            }
            const authToken = await jwt.sign(data, KEY)
            return res.json({
                success: true,
                message: 'Logged in Successfully',
                token: authToken,
            })
        } else {
            return res.json({
                success: false,
                message: 'No matching Web_ID found.',
            })
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
        // const dec = await decryption(user.web3_id, KEY)
        // user.web3_id = dec
        res.json({ success: true, message: 'User details found.', data: user })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal server error occurred.' })
    }
}

module.exports = { createMetaMask, loginMetaMask, getMetaMask, changeMetaMask }
