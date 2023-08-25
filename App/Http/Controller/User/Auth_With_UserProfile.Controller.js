const createHttpError = require("http-errors");
const { PasswordModel } = require("../../../Models/Password.Model");
const { UserModel } = require("../../../Models/User.Model");
const { registerSchema, loginSchema } = require("../../Validations/User/AuthUserProfile.Schema");
const Controller = require("../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { hashString, persionDateGenerator } = require("../../../Utills/Public_Function");
const bcrypt = require("bcrypt");
const { signAccessToken, verifyRefreshToken, signRefreshToken } = require("../../../Utills/Token");
const { ROLES } = require("../../../Utills/Constants");
const ip = require("ip");
const { LoginModel } = require("../../../Models/Login.Model");
const { BrowserModel } = require("../../../Models/Browser.Model");

class Auth_UserProfile_Controller extends Controller{
    async register(req, res, next){
        try {
            const requestBody = await registerSchema.validateAsync(req.body);
            const { firstname, lastname, mobile, email, password } = requestBody;
            await this.checkExistUser(mobile);
            const user = await UserModel.create({firstname, lastname, mobile, email, role: ROLES.BUYER})
            if(!user) throw new createHttpError.InternalServerError("خطای سروری");
            const hashPassword = hashString(password);
            const now = persionDateGenerator();
            const createPassword = await PasswordModel.create({user_Id: user._id, password: hashPassword, date: now});
            if(!createPassword) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت نام با موفقیت انجام شد" 
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next){
        try {
            const requestBody = await loginSchema.validateAsync(req.body);
            const { mobile, password } = requestBody;            
            const user = await UserModel.findOne({mobile});
            if(!user) throw new createHttpError.BadRequest("درخواست نا معتبر، شماره موبایل یا رمز عبور را درست وارد کنید");
            const getPassword = await PasswordModel.findOne({user_Id: user._id});
            const confirmPassword = bcrypt.compareSync(password, getPassword.password);
            if(!confirmPassword) throw new createHttpError.BadRequest("درخواست نا معتبر، شماره موبایل یا رمز عبور را درست وارد کنید");
            const accessToken = await signAccessToken(user._id);
            const refReshToken = await signRefreshToken(user._id);
            if(accessToken && refReshToken){
                const checkLogin = await LoginModel.findOne({user_Id: user._id});
                const checkBrowser = await BrowserModel.findOne({user_Id: user._id});
                const ip_number = ip.address();
                let userAgent = {
                    browser: req.useragent.browser,
                    version: req.useragent.version,
                    os: req.useragent.os,
                    platform: req.useragent.platform,
                    source: req.useragent.source,
                    geoIp: req.useragent.geoIp,
                    isMobile: req.useragent.isMobile,
                    isDesktop: req.useragent.isDesktop
                };
                req.headers.useragent = userAgent
                if(checkLogin && checkBrowser){
                    const browserUpdate = await BrowserModel.deleteOne({user_Id: user._id});
                        if(browserUpdate.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
                    const updateLoginResault = await LoginModel.deleteOne({user_Id: user._id});
                        if(updateLoginResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
                }
                const browserCreate = await BrowserModel.create(
                    {
                        user_Id: user._id,
                        browser: userAgent.browser, 
                        version: userAgent.version, 
                        os: userAgent.os, 
                        platform: userAgent.platform, 
                        source: userAgent.sooure, 
                        geoIp: userAgent.geoIp, 
                        isMobile: userAgent.isMobile, 
                        isDesktop: userAgent.isDesktop
                    });
                    if(!browserCreate) throw new createHttpError.InternalServerError("خطای سروری");
                    const loginCreate = await LoginModel.create({user_Id: user._id, browser_Id: browserCreate._id, ip_Number: ip_number})
                    if(!loginCreate) throw new createHttpError.InternalServerError("خطای سروری");               
            }
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refReshToken
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next){
        try {
            const { refreshToken } = req.body;
            const mobile = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken = await signRefreshToken(user._id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        if(user) throw new createHttpError.BadRequest("کاربر با مشخصات زیر از قبل ثبت نام کرده است")
        return user
    }
};

module.exports = {
    Auth_UserProfile_Controller: new Auth_UserProfile_Controller()
};