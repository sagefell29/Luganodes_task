const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        pass: { type: String, required: true },
        email: { type: String, required: true },
        web3_id: { type: String },
        iv: { type: Buffer },
    },
    { timestamps: true }
)

const User = mongoose.model('user', userSchema)
User.createIndexes()
module.exports = User
