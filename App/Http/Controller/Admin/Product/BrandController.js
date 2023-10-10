const createHttpError = require("http-errors");
const { BrandModel } = require("../../../../Models/Brand.Model");
const { deleteFileInPath, checkExistOfModelById, copyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
const { createBrandSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes")

class BrandConteroller extends Controller{
  async createBrand(req, res, next){
    try {
      const requestBody = await createBrandSchema.validateAsync(req.body);
      const { title, en_title, description, tags, show } = requestBody;
      if(req.body.fileUploadPath && req.body.filename){
        req.body.icon = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, "/");
      }
      const brandTitle = await BrandModel.findOne({title, en_title});
      if(brandTitle){
        deleteFileInPath(req.body.icon)
        throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
      }
      const icon = req.body.icon;
      const createResault = await BrandModel.create(
        {
          title,
          en_title,
          description,
          tags,
          show,
          icon
        });
        if(!createResault){
          deleteFileInPath(req.body.icon);
          throw new createHttpError.InternalServerError("خطای سروری");
        }
        return res.status(httpStatus.CREATED).json({
          statusCode: httpStatus.CREATED,
          data: {
            message: " برند با موفقیت ثبت گردید"
          }
        })
    } catch (error) {
      next(error)
    }
  };
  async listOfBrand(req, res, next){
    try {
      const { search } = req.query;
      let brands;
      if(search){
        brands = await BrandModel.findOne(
          {
            $text: {
              $search: new RegExp(search, "ig")
            }
          }, 
          {
            __v: 0
          }
        )
      } else {
        brands = await BrandModel.find({},{__v: 0});
      };
      if(!brands) throw new createHttpError.NotFound("برندی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          brands
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listofBrandById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, BrandModel);
      const brand = await BrandModel.findOne({_id: checkId.id},{__v: 0});
      if(!brand) throw new createHttpError.NotFound("برندی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          brand
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfBrandByActive(req, res, next){
    try {
      const brands = await BrandModel.find({show: true},{__v: 0});
      if(!brands) throw new createHttpError.NotFound("برندی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          brands
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfBrandByUnActive(req, res, next){
    try {
      const brands = await BrandModel.find({show: false},{__v: 0});
      if(!brands) throw new createHttpError.NotFound("برندی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          brands
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateOfBrand(req, res, next){
    try {
      const { id } = req.params;
      const brand = await checkExistOfModelById(id, BrandModel);
      const dataBody = copyObject(req.body);
      if(dataBody.fileUploadPath && dataBody.filename){
        deleteFileInPath(brand.icon);
        dataBody.icon = path.join(dataBody.fileUploadPath, dataBody.filename).replace(/\\/g, "/");
      };
      deleteInvalidPropertyObjectWithOutBlackList(dataBody);
      const updateResault = await BrandModel.updateOne({_id: brand.id}, {$set: dataBody});
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "به روز رسانی با موفقیت انجام شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }

}

module.exports = {
  BrandConteroller: new BrandConteroller()
}