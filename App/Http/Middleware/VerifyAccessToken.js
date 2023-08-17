const Jwt = require("jsonwebtoken");
const { ACCESS_Token_SECRETKEY } = require("../../Utills/Constants");
const { UserModel } = require("../../Models/User.Model");
const createHttpError = require("http-errors");

function getToken(headers){
    const [headers, token] = headers?.authorization.split(" ") || [];
    if(token && ["bearer", "Bearer"].includes(bearer)) return token
}

function verifyAccessToken(req, res, next){
    try {
        const token = getToken(req.headers);
        Jwt.verify(token, ACCESS_Token_SECRETKEY, async(error, payload) => {
            try {
                if(error) throw new createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
                const { mobile } = payload || {};
                const user = await UserModel.findOne({mobile});
                if(!user) throw new createHttpError.NotFound("حساب کاربری یافت نشد");
                req.user = user;
                return next()
            } catch (error) {
                next(error)
            }
        })
        
    } catch (error) {
        next(error)
    }
};

module.exports = {
    verifyAccessToken
}