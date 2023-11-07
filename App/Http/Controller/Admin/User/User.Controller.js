const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../Models/Role.Model");
const { UserModel } = require("../../../../Models/User.Model");
const { ROLES, USER_STATUS, USER_GENDER } = require("../../../../Utills/Constants");
const { checkExistUser, hashString, persionDateGenerator, checkExistOfModelById, convertGregorianDateToPersionDateToToday } = require("../../../../Utills/Public_Function");
const { registerSchema } = require("../../../Validations/User/AuthUserProfile.Schema");
const { StatusCodes: httpStatus } = require("http-status-codes")
const Controller = require("../../Controller");
const { PasswordModel } = require("../../../../Models/Password.Model");

class UserController extends Controller{
  async createUserAdmin(req, res, next){
    try {
      const requestBody = await registerSchema.validateAsync(req.body);
      const { firstname, lastname, mobile, email, password } = requestBody;
      await checkExistUser(mobile, UserModel);
      const role = await RoleModel.findOne({title: ROLES.BUYERS});
      const username = requestBody.firstname + "_" + requestBody.lastname;
      const craeteTime = convertGregorianDateToPersionDateToToday();
      const updateTime = convertGregorianDateToPersionDateToToday();
      const user = await UserModel.create({
        firstname,
        lastname,
        mobile,
        email,
        role_Id: role._id,
        username,
        createdAt: craeteTime,
        updatedAt: updateTime,
        Phone_verification: true,
        email_verification: true
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
    } catch (error) {
      next(error)
    }
  };
  async listOfUser(req, res, next){
    try {
      const { search } = req.query || "";
      let users, numberOfResault = 0;
      const roleBuyer = await RoleModel.findOne({title: ROLES.BUYERS});
      const roleUser = await RoleModel.findOne({title: ROLES.USER});
      if(search){
        users = await UserModel.find(
          { 
            $text: {
              $search: new RegExp(search, "ig")
            }
          }, 
          {
            username: 1,
            firstname: 1,
            lastname: 1,
            createdAt: 1,
            status: 1
          })
        numberOfResault = await UserModel.find(
          { 
            $text: {
              $search: new RegExp(search, "ig")
            }
          }).count();
      } else {
        users = await UserModel.find(
          {
            "role_Id":{"$in": [roleBuyer._id, roleUser._id]}
          }, 
          {
            username: 1,
            firstname: 1,
            lastname: 1,
            createdAt: 1,
            status: 1
          });
        numberOfResault = await UserModel.find({"role_Id":{"$in": [roleBuyer._id, roleUser._id]}}).count();
      }
      if(!users) throw new createHttpError.NotFound("نتیجه ای یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: { 
          users,
          numberOfResault
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfUserByStatus(req, res, next){
    try {
      const { userStatus } = req.query || "";
      let users, numberOfResault = 0;
      const roleBuyer = await RoleModel.findOne({title: ROLES.BUYERS});
      const roleUser = await RoleModel.findOne({title: ROLES.USER});
      if(userStatus == USER_STATUS.ACTIVE || userStatus == USER_STATUS.UNACTIVE){
        users = await UserModel.find(
          {
            "role_Id":{"$in": [roleBuyer._id, roleUser._id]},
            status: userStatus
          }, 
          {
            username: 1,
            firstname: 1,
            lastname: 1,
            createdAt: 1,
            status: 1
          }
        );
        numberOfResault = await UserModel.find(
          {
            "role_Id":{"$in": [roleBuyer._id, roleUser._id]},
            status: userStatus
          }
        ).count();
      } else if(userStatus == USER_STATUS.ALL) {
        users = await UserModel.find(
          {
            "role_Id":{"$in": [roleBuyer._id, roleUser._id]}
          }, 
          {
            username: 1,
            firstname: 1,
            lastname: 1,
            createdAt: 1,
            status: 1
          });
        numberOfResault = await UserModel.find({"role_Id":{"$in": [roleBuyer._id, roleUser._id]}}).count();
      }
      if(!users) throw new createHttpError.NotFound("نتیجه ای یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: { 
          users,
          numberOfResault
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfUserByGender(req, res, next){
   try {
    const { userGender } = req.query;
    let users, numberOfResault = 0;
      const roleBuyer = await RoleModel.findOne({title: ROLES.BUYERS});
      const roleUser = await RoleModel.findOne({title: ROLES.USER});
      if(userGender == USER_GENDER.UNKNOWN || userGender == USER_GENDER.MALE || userGender == USER_GENDER.FEMALE){
        users = await UserModel.find(
          {
            "role_Id":{"$in": [roleBuyer._id, roleUser._id]},
            gender: userGender
          }, 
          {
            username: 1,
            firstname: 1,
            lastname: 1,
            createdAt: 1,
            status: 1
          }
        );
        numberOfResault = await UserModel.find(
          {
            "role_Id":{"$in": [roleBuyer._id, roleUser._id]},
            gender: userGender
          }
        ).count();
      } else if(userGender == USER_GENDER.ALL) {
        users = await UserModel.find(
          {
            "role_Id":{"$in": [roleBuyer._id, roleUser._id]}
          }, 
          {
            username: 1,
            firstname: 1,
            lastname: 1,
            createdAt: 1,
            status: 1
          });
        numberOfResault = await UserModel.find({"role_Id":{"$in": [roleBuyer._id, roleUser._id]}}).count();
      }
      if(!users) throw new createHttpError.NotFound("نتیجه ای یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: { 
          users,
          numberOfResault
        }
      })
   } catch (error) {
    next(error)
   }
  };
  async listOfUserById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, UserModel);
      
    } catch (error) {
      next(error)
    }
  }
};

module.exports = {
  UserController: new UserController()
}