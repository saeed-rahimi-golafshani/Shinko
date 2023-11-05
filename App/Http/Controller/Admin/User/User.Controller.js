const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../Models/Role.Model");
const { UserModel } = require("../../../../Models/User.Model");
const { ROLES } = require("../../../../Utills/Constants");
const { checkExistUser, convertGregorianToPersionToday, hashString, persionDateGenerator } = require("../../../../Utills/Public_Function");
const { registerSchema } = require("../../../Validations/User/AuthUserProfile.Schema");
const { StatusCodes: httpStatus } = require("http-status-codes")
const Controller = require("../../Controller");
const { PasswordModel } = require("../../../../Models/Password.Model");

class UserController extends Controller{
  async createUserAdmin(req, res, next){
    const requestBody = await registerSchema.validateAsync(req.body);
    const { firstname, lastname, mobile, email, password } = requestBody;
    await checkExistUser(mobile, UserModel);
    const role = await RoleModel.findOne({title: ROLES.BUYERS});
    const username = requestBody.firstname + "_" + requestBody.lastname;
    const craeteTime = convertGregorianToPersionToday();
    const updateTime = convertGregorianToPersionToday();
    const user = await UserModel.create({
      firstname,
      lastname,
      mobile,
      email,
      role_Id: role._id,
      username,
      createdAt: craeteTime,
      updatedAt: updateTime
    });
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
  }
};

module.exports = {
  UserController: new UserController()
}