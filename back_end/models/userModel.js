const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: { type: String },
        pass: { type: String },
        email: { type: String },
        web3_id: { type: String },
        // iv: { type: Buffer },
    },
    { timestamps: true }
)

const User = mongoose.model('user', userSchema)
User.createIndexes()
module.exports = User
