const createHttpError = require("http-errors");
const { ProductCategoryModel } = require("../../../../Models/Product_Category.Model");
const { deleteFileInPath, 
  createCounterCategory, 
  checkExistOfModelById, 
  copyObject, 
  deleteInvalidPropertyObjectWithOutBlackList,
  updateCounterCategory, 
  deleteCounterCategory} = require("../../../../Utills/Public_Function");
const { createProductCategorySchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");

class ProductCategoryController extends Controller{
  async createProductCategory(req, res, next){
    try {
      const requestBody = await createProductCategorySchema.validateAsync(req.body);
      const { title, en_title, showInArchive, priority, parent_Category, text, short_text, tags } = requestBody;
      if(req.body.fileUploadPath && req.body.filename){
        req.body.icon = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, "/");
      }
      const productCategoryTitle = await ProductCategoryModel.findOne({title});
      if(productCategoryTitle){
        deleteFileInPath(req.body.icon)
        throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
      }
      const icon = req.body.icon;
      const createResault = await ProductCategoryModel.create(
        {
          title, 
          en_title, 
          text, 
          short_text, 
          parent_Category,  
          icon, 
          showInArchive,
          priority,
          tags
        });
      if(!createResault){
        deleteFileInPath(req.body.icon);
        throw new createHttpError.InternalServerError("خطای سروری");
      }
      if(requestBody.parent_Category){
        await createCounterCategory(ProductCategoryModel, requestBody.parent_Category);
      }
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
            message: "دسته بندی محصول با موفقیت ثبت گردید"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductCategory(req, res, next){
    try {
      const { search } = req.query;
      let productCategory;
      if(search){
        productCategory = await ProductCategoryModel.findOne(
          { parent_Category: undefined,
            $text: {
              $search: new RegExp(search, "ig")
            }
          }
          );
        
      } else {
        productCategory = await ProductCategoryModel.find({parent_Category: undefined});
      }
      if(!productCategory) throw new createHttpError.NotFound("دسته بندی محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productCategory
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductCategoryById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductCategoryModel);
      const productCategory = await ProductCategoryModel.findOne({_id: checkId.id});
      if(!productCategory) throw new createHttpError.NotFound("دسته بندی ای یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productCategory
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfAllProductCategory(req, res, next){
    try {
      const productCategories = await ProductCategoryModel.find({});
      if(!productCategories) throw new createHttpError.NotFound("دسته بندی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productCategories
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async updateProductCategory(req, res, next){
    try {
      const { id } = req.params;
      const productCategory = await checkExistOfModelById(id, ProductCategoryModel);
      const dataBody = copyObject(req.body);
      if(dataBody.fileUploadPath && dataBody.filename){
        deleteFileInPath(productCategory.icon);
        dataBody.icon = path.join(dataBody.fileUploadPath, dataBody.filename).replace(/\\/g, "/");
      };
      deleteInvalidPropertyObjectWithOutBlackList(dataBody);
      if(dataBody.parent_Category){
        updateCounterCategory(ProductCategoryModel, productCategory.parent_Category, dataBody.parent_Category)
      }
      const updateResault = await ProductCategoryModel.updateOne({_id: productCategory.id}, {$set: dataBody});
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
  };
  async removeProductCategory(req, res, next){
    try {
      const { id } = req.params;
      const productCategory = await checkExistOfModelById(id, ProductCategoryModel);
      const deleteResault = await ProductCategoryModel.deleteOne({$or: [
        {_id: productCategory._id},
        {parent_Category: productCategory._id}
      ]});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      deleteCounterCategory(ProductCategoryModel, productCategory.parent_Category);
      deleteFileInPath(productCategory.icon);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "دسته بندی با موفقیت حذف شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  ProductCategoryController: new ProductCategoryController()
}