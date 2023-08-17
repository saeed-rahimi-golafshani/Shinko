const Jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");
const { ACCESS_Token_SECRETKEY } = require("./Constants");
const { UserModel } = require("../Models/User.Model");
const createHttpError = require("http-errors");

function signAccessToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile: user.mobile
        };
        const option = {
            expiresIn: "24h"
        };
        Jwt.sign(payload, ACCESS_Token_SECRETKEY, option, (error, token) => {
            if(error) reject(createHttpError.InternalServerError("خطای سروری"))
            resolve(token)
        })
    })
}

module.exports = {
    signAccessToken
}