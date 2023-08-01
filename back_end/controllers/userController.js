require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const algo = 'aes-256-cbc'
const KEY = process.env.SECRET_KEY
const FINAL_KEY = crypto.createHash('sha256').update(KEY).digest().slice(0,32)



const createUser = async (req, res) => {
    try {
        const { name, email, pass, web3_id } = req.body
        const alreadyExist = await User.findOne({ name: name, email: email })
        if (alreadyExist) {
            return res.json({
                success: false,
                message: 'E-Mail already taken.',
            })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(pass, salt)
        const iv = crypto.randomBytes(16)
        // const ivBase64 = iv.toString('base64')
        const cypher = crypto.createCipheriv(algo, Buffer.from(FINAL_KEY), iv)
        const initial_web3_id = cypher.update(web3_id, 'utf8', 'hex')
        const encrypted_web3_id = initial_web3_id+cypher.final('hex')
        const user = await User.create({
            name: name,
            email: email,
            pass: secPass,
            iv: iv,
            web3_id: encrypted_web3_id,
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

const loginUser = async (req, res) => {
    try {
        const { email, pass } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({
                success: false,
                message: 'Account does not exist.',
            })
        }
        const matchpass = await bcrypt.compare(pass, user.pass)
        if (!matchpass) {
            return res.json({ success: false, message: 'Password does not match.' })
        }
        const data = {
            User: {
                User_id: User._id,
            },
        }
        const authToken = jwt.sign(data, KEY)
        res.json({
            success: true,
            message: 'Login Successfully',
            token: authToken,
        })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error Occured' })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.User.User_id
        const user = await User.findOne({ _id: id }).select('-pass')
        if (!user) {
            return res.json({ success: false, message: 'No User found' })
        }
        res.json({ success: true, message: 'User details found', data: User })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal server error occurred.' })
    }
}
module.exports = { createUser, loginUser, getUser }
