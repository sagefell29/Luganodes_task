require('dotenv').config()
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

const getUser = (req, res, next) => {
    //    Get the user from the jwt token and add id to req object 
    const token = req.header("auth-token")
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token." })
    }

    try {
        const data = jwt.verify(token, KEY)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
}


module.exports = getUser