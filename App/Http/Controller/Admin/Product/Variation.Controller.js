const Controller = require("../../Controller");
const { createVariationSchema } = require("../../../Validations/Admin/Variation.Schema");
const { 
  checkExistOfModelById, 
  copyObject, 
  deleteInvalidPropertyObjectWithOutBlackList, 
  checkExistOfModelByTitle, 
  deleteFileInPath} = require("../../../../Utills/Public_Function");
const { VariationModel } = require("../../../../Models/Variation.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { ProductCategoryModel } = require("../../../../Models/Product_Category.Model");
const path = require("path");
const { VariationCategoryModel } = require("../../../../Models/Variation_category");

class VariationController extends Controller{
  async createVariation(req, res, next){
    try {
      const requestBody = await createVariationSchema.validateAsync(req.body);
      const { title, en_title, show_in_archive, show_in_up } = requestBody;
      if(req.body.fileUploadpath && req.body.filename){
        req.body.icon = path.join(req.body.fileUploadpath, req.body.filename).replace(/\\/g, "/");
      }
      checkExistOfModelByTitle(title, VariationModel, req.body.icon)
      const icon = req.body.icon;
      const createResault = await VariationModel.create(
        {
          title,
          en_title,
          show_in_archive,
          show_in_up,
          icon
        });
      if(!createResault){
        deleteFileInPath(req.body.icon);
        throw new createHttpError.InternalServerError("خطای سروری");
      }
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "جزئیات محصول با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
    // try {
    //   const requestBody = await createVariationSchema.validateAsync(req.body);
    //   const { product_category_Id, name } = requestBody;
    //   const checkTitle = await VariationModel.findOne({product_category_Id, name});
    //   if(checkTitle){
    //     throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید")
    //   }
    //   const variation = await VariationModel.create({product_category_Id, name});
    //   if(!variation) throw new createHttpError.InternalServerError("خطای سروری");
    //   return res.status(httpStatus.CREATED).json({
    //     statusCode: httpStatus.CREATED,
    //     data: {
    //       message: "عنوان مشخصات فنی با موفقیت ثبت گردید"
    //     }
    //   });

    // } catch (error) {
    //   next(error)
    // }
  };
  async listOfVariation(req, res, next){
    try {
      const { search } = req.query;
      let variation, numberOfResault;
      if(search){
        variation = await VariationModel.find(
          {
            $text: {
              $search: new RegExp(search, "ig")
            }
          });
        numberOfResault = await VariationModel.find(
          {
            $text: {
              $search: new RegExp(search, "ig")
            }
          }).count();
      } else {
        variation = await VariationModel.find({});
        numberOfResault = await VariationModel.find({}).count();
      }
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      data: {
        variation,
        numberOfResault
      }
    });
    } catch (error) {
      next(error)
    }
  };
  async listOfVariationById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, VariationModel);
      const variation = await VariationModel.findOne({_id: checkId._id});
      if(!variation) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          variation
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateVariation(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, VariationModel);
      const requestData = copyObject(req.body);
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      const updateResault = await VariationModel.updateOne({_id: checkId._id}, {$set: requestData});
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خططای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "به روز رسانی با موفقیت انجام شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async deleteVariation(req, res, next){
    try {
      const { id } = req.params;
      await checkExistOfModelById(id, VariationModel);
      const deleteResault = await VariationModel.deleteOne({_id: id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "عنوان مشخصات فنی با موفقیت حذف شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
};

module.exports = {
  VariationController: new VariationController()
}