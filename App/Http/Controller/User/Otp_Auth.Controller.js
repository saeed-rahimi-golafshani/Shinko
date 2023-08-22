const Controller = require("../Controller");
const createHttpError = require("http-errors");
const { randomNumberFiveDigitsGenerator } = require("../../../Utills/Public_Function");
const { ActivationModel } = require("../../../Models/Activation.Model");
const { otpRegisterSchema, otpLoginSchema } = require("../../Validations/User/OtpAuth.Schema");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { UserModel } = require("../../../Models/User.Model");
const { ROLES } = require("../../../Utills/Constants");
const { smsClient } = require("../../../Utills/Sms.Panel");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../../../Utills/Token");
const ip = require("ip");
const { LoginModel } = require("../../../Models/Login.Model");
const { BrowserModel } = require("../../../Models/Browser.Model");
class OtpAuthenticationController extends Controller{
    async otp_Register(req, res, next){
        try {
            const requestBody = await otpRegisterSchema.validateAsync(req.body);
            const { mobile } = requestBody;
            const code = await randomNumberFiveDigitsGenerator();
            const resault = await this.saveUser(mobile, code);
            if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
            // await smsClient(mobile, code)
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    // message: `کد تایید برای شماره ${mobile} ارسال شد`
                    code
                }
            })
        } catch (error) {
            next(error)
        }        
    };
    async saveUser(mobile, code){
        let otp = {
            code,
            expiresIn: (new Date().getTime() + (process.env.OTP_EXPIRESIN))
        };
        const resault = await this.checkExistUser(mobile);
        if(resault){
            return await this.updateUser(mobile, {otp})
        } else {
            const user = await UserModel.create({
                mobile,
                role: ROLES.BUYER
            });
            const activation = await ActivationModel.create({user_Id: user._id, otp});
            return !!(activation, user)
        }

    };
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        return !!user
    };
    async updateUser(mobile, dataObj= {}){
        const nullishData = ["", " ", null, 0, NaN, undefined];
        Object.keys(dataObj).forEach(key => {
            if(nullishData.includes(dataObj[key])) delete dataObj[key]
        });
        const user = await UserModel.findOne({mobile});
        const updateUser = await ActivationModel.updateOne({user_Id: user._id}, {$set: dataObj})
        return !!updateUser.modifiedCount
    };
    async otp_Login(req, res, next){
        try {
            const requestBody = await otpLoginSchema.validateAsync(req.body);
            const { mobile, code } = requestBody;
            const user = await UserModel.findOne({mobile});
            if(!user) throw new createHttpError.NotFound("کاربر مورد نظر یافت نشد");
            const userOtp = await ActivationModel.findOne({user_Id: user._id});
            if(userOtp.otp.code != code) throw new createHttpError.Unauthorized("کد تایید ارسال شده صحیح نمی باشد");
            let now = Date.now();
            if(+userOtp.otp.expiresIn < now ) throw new createHttpError.Unauthorized("کد تایید منقضی شده است");
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            if(accessToken && refreshToken){
                const checkLogin = await LoginModel.findOne({user_Id: user._id});
                const checkBrowser = await BrowserModel.findOne({user_Id: user._id});
                const ip_number = ip.address();
                let userAgent;
                req.headers.useragent = userAgent
                userAgent = {
                    browser: req.useragent.browser,
                    version: req.useragent.version,
                    os: req.useragent.os,
                    platform: req.useragent.platform,
                    source: req.useragent.source,
                    geoIp: req.useragent.geoIp,
                    isMobile: req.useragent.isMobile,
                    isDesktop: req.useragent.isDesktop
                };
                if(checkLogin && checkBrowser){
                    const browserUpdate = await BrowserModel.updateOne(
                        {user_Id: user._id},
                        {
                            browser: userAgent.browser,
                            version: userAgent.version, 
                            os: userAgent.os, 
                            platform: userAgent.platform, 
                            source: userAgent.soure, 
                            geoIp: userAgent.geoIp, 
                            isMobile: userAgent.isMobile, 
                            isDesktop: userAgent.isDesktop
                        });
                        if(browserUpdate.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
                    const updateLoginResault = await LoginModel.updateOne({user_Id: user._id}, {browser_Id: browserUpdate._id, ip_Number: ip_number});
                    if(updateLoginResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
                }else {
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
                        if(!loginCreate) throw new createHttpError.InternalServerError("خطای سروری") 
                }
               
            }
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    };
    async otp_refreshToken(req, res, next){
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
    };
};

module.exports = {
    OtpAuthenticationController: new OtpAuthenticationController()
}