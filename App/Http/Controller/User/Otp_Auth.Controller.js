const Controller = require("../Controller");
const createHttpError = require("http-errors");
const { randomNumberFiveDigitsGenerator } = require("../../../Utills/Public_Function");
const { ActivationModel } = require("../../../Models/Activation.Model");
const { otpRegisterSchema } = require("../../Validations/User/OtpAuth.Schema");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { UserModel } = require("../../../Models/User.Model");
const { ROLES } = require("../../../Utills/Constants");

class OtpAuthenticationController extends Controller{
    async otp_Register(req, res, next){
        try {
            const requestBody = await otpRegisterSchema.validateAsync(req.body);
            const { mobile } = requestBody;
            const code = await randomNumberFiveDigitsGenerator();
            const resault = await this.saveUser(mobile, code);
            if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
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
    }
};

module.exports = {
    OtpAuthenticationController: new OtpAuthenticationController()
}