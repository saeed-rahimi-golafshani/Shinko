const Jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");
const { ACCESS_Token_SECRETKEY, REFRESH_TOKEN_SECRETKEY } = require("./Constants");
const { UserModel } = require("../Models/User.Model");
const createHttpError = require("http-errors");
const redisClient = require("./Init.Redis");

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
};
function signRefreshToken(userId){
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile: user.mobile
        };
        const option = {
            expiresIn: "1y"
        };
        Jwt.sign(payload, REFRESH_TOKEN_SECRETKEY, option, async(error, token) => {
            if(error) reject(createHttpError.InternalServerError("خطای سروری"));
            await redisClient.SETEX(userId, (360*24*60*60), token);
            resolve(token)
        })
    })
};
function verifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        Jwt.verify(token, REFRESH_TOKEN_SECRETKEY, async(error, payload) => {
            if(error) reject(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({mobile});
            if(!user) reject(createHttpError.NotFound("حساب کاربری یافت نشد"));
            const refReshToken = redisClient.get(user?._id || "key_default");
            if(!refReshToken) reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری امکان پذیر نمیباشد، لطفا مجددا تلاش نمایید"));
            if(token === refReshToken) return resolve(mobile);
            reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری امکان پذیر نمیباشد، لطفا مجددا تلاش نمایید"))
        })
    })
}

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}