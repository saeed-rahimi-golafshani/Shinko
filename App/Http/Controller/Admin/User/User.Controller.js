const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../Models/Role.Model");
const { UserModel } = require("../../../../Models/User.Model");
const { ROLES, USER_STATUS, USER_GENDER } = require("../../../../Utills/Constants");
const { checkExistUser, hashString, persionDateGenerator, checkExistOfModelById, convertGregorianDateToPersionDateToToday, copyObject, deleteInvalidPropertyObject } = require("../../../../Utills/Public_Function");
const { registerSchema } = require("../../../Validations/User/AuthUserProfile.Schema");
const { StatusCodes: httpStatus } = require("http-status-codes")
const Controller = require("../../Controller");
const { PasswordModel } = require("../../../../Models/Password.Model");
const userBlackList = {
  ROLE_ID: "role_Id",
  USERNAME: "username",
  STATUS: "status",
  WALLET: "wallet",
  RATE: "rate",
  CREATEDAT: "createdAt"
};
Object.freeze(userBlackList)

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
      const user = await UserModel.findOne({_id: checkId._id}, {role_Id: 0, birthday: 0, access_profile: 0, Phone_verification: 0, email_verification: 0, updatedAt: 0});
      if(!user) throw new createHttpError.NotFound("کاربر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          user
        }
      })
      
    } catch (error) {
      next(error)
    }
  };
  async updateOfUser(req, res, next){
    try {
      const { id } = req.params;
      let updateResault;
      const checkId = await checkExistOfModelById(id, UserModel);
      const requestData = copyObject(req.body);
      let blackFeildList = Object.values(userBlackList);
      deleteInvalidPropertyObject(requestData, blackFeildList);
      if(requestData.access_profile){
        if(requestData.access_profile == "false"){
          await UserModel.updateOne({_id: checkId._id}, {status: USER_STATUS.UNACTIVE});
        } else if(requestData.access_profile == "true"){
          await UserModel.updateOne({_id: checkId._id}, {status: USER_STATUS.ACTIVE});
        }
      };
      updateResault = await UserModel.updateOne({_id: checkId._id}, {$set: requestData});      
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      if(requestData.newPassword){
        const newPass = hashString(requestData.newPassword)
        const changePassword = await PasswordModel.updateOne({user_Id: checkId._id}, {password: newPass})
        if(!changePassword) throw new createHttpError.InternalServerError("خطای سروری");
      };
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "کاربر با موفقیت ثبت شد"
        }
      });

    } catch (error) {
      next(error)
    }
  }
};

module.exports = {
  UserController: new UserController()
}