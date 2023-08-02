const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: { type: String, default: "" },
        pass: { type: String, default: "" },
        email: { type: String, default: "" },
        web3_id: { type: String, default: "" },
        // iv: { type: Buffer },
    },
    { timestamps: true }
)

const User = mongoose.model('user', userSchema)
User.createIndexes()
module.exports = User
