const createHttpError = require("http-errors");
const { PasswordModel } = require("../../../Models/Password.Model");
const { UserModel } = require("../../../Models/User.Model");
const { registerSchema, loginSchema } = require("../../Validations/User/AuthUserProfile.Schema");
const Controller = require("../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { hashString, persionDateGenerator } = require("../../../Utills/Public_Function");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../../../Utills/Token");

class Auth_UserProfile_Controller extends Controller{
    async register(req, res, next){
        try {
            const requestBody = await registerSchema.validateAsync(req.body);
            const { firstname, lastname, mobile, email, password } = requestBody;
            await this.checkExistUser(mobile);
            const user = await UserModel.create({firstname, lastname, mobile, email})
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
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken
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