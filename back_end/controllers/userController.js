require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const algo = 'aes-256-cbc'
const KEY = process.env.SECRET_KEY
const FINAL_KEY = crypto.createHash('sha256').update(KEY).digest().slice(0, 32)

const encrypt = async (data) => {
    try {
        const iv = await crypto.randomBytes(16)
        const cypher = await crypto.createCipheriv(
            algo,
            Buffer.from(FINAL_KEY),
            iv
        )
        const ini = await cypher.update(data, 'utf8', 'hex')
        const final = ini + cypher.final('hex')
        return ({ encryptedData: final, iv: iv })
    } catch (error) {
        console.log(error)
    }
}

const decrypt = async (enData, iv) => {
    const decipher = await crypto.createDecipheriv(algo, Buffer.from(FINAL_KEY), iv)
    const ini = await decipher.update(enData, 'hex', 'utf8')
    const final = ini + decipher.final('utf8')
    return final
}

const hash = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashdata = await bcrypt.hash(data, salt)
        return hashdata
    } catch (error) {
        console.log(error)
    }
}

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
        const secPass = await hash(pass)
        const result = await encrypt(web3_id)
        // console.log(res)
        const user = await User.create({
            name: name,
            email: email,
            pass: secPass,
            iv: result.iv,
            web3_id: result.encryptedData,
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
            return res.json({
                success: false,
                message: 'Password does not match.',
            })
        }
        const data = {
            user: {
                user_id: User._id,
            },
        }
        const authToken = jwt.sign(data, KEY)
        res.json({
            success: true,
            message: 'Login Successful.',
            token: authToken,
        })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error Occured' })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.user.user_id
        const user = await User.findOne({ id }).select('-pass')
        if (!user) {
            return res.json({ success: false, message: 'No User found.' })
        }
        // const iv_new = Buffer.from(user.iv, 'hex')
        const decipher = crypto.createDecipheriv(
            algo,
            Buffer.from(FINAL_KEY),
            user.iv
        )
        const web3_id_new = await decrypt(user.web3_id, user.iv)
        user.web3_id = web3_id_new
        res.json({ success: true, message: 'User details found.', data: user })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal server error occurred.' })
    }
}
module.exports = { createUser, loginUser, getUser }
