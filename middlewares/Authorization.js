const jwt = require('jsonwebtoken')
const Token = require("../models/Token.model");
const { response } = require("../helper")


module.exports = async (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');

        if (typeof bearer[0] !== 'undefined' && typeof bearer[1] !== 'undefined' && bearer[0] == 'Bearer') {
            // Get token from array
            const bearerToken = bearer[1];
            // verifying token from database
            let decoded = ""
            try {
                decoded = jwt.verify(bearerToken, "randomString");
            } catch (error) {
                return response(res, 403, 3, "Session Expired, Please Login again", {})
            }

            const tokenFromDb = await Token.findOne({user_id:decoded.user.id});
            if(tokenFromDb == null){
                return response(res, 500, 0, "Invalid Session, Please Login again", {})
            }
            if(bearerToken != tokenFromDb.token){
                return response(res, 500, 3, "Invalid Session, Please Login again", {})
            } 
            req.user = decoded.user;
            next();
        } else {
            // Forbidden
            return response(res, 403, 3, "Unauthenticated request", {})
        }
    } else {
        return response(res, 403, 3, "Unauthenticated request", {})
    }
}