const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config()


const validateJwt = async (req, res, next) => {
    try {
        const jwtValidate = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        if (jwtValidate) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

    } catch (error) {
        return res.status(401).json({
            message: 'An error happened while token verification. ' + error.message
        })
    }
}

module.exports = validateJwt;