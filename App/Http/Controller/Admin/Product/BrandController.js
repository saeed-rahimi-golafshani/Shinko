const createHttpError = require("http-errors");
const { BrandModel } = require("../../../../Models/Brand.Model");
const { deleteFileInPath, checkExistOfModelById, copyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
const { createBrandSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { ProductModel } = require("../../../../Models/Product.Model");
const { BrandProductCategoryModel } = require("../../../../Models/Brand_ProductCategory.Model");

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
  };
  async listOfProductByBrand(req, res, next){
    try {
      const { brandId } = req.params;
      const checkId = await checkExistOfModelById(brandId, BrandModel);
      const findProductByBrand = await ProductModel.find({brand_Id: checkId._id}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
      ]);
      if(!findProductByBrand) throw new createHttpError.NotFound("محصولی با برند مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        findProductByBrand
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByBrandOfCount(req, res, next){
    try {
      const { brandId } = req.params;
      const checkId = await checkExistOfModelById(brandId, BrandModel);
      const findBrandByCount = await BrandModel.findOne({_id: checkId._id});
      if(!findBrandByCount) throw new createHttpError.NotFound("محصولی با برند مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        count: findBrandByCount.count
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByBrandOfProCat(req, res, next){
    try {
      const { brandProCatId } = req.params;
      const checkId = await checkExistOfModelById(brandProCatId, BrandProductCategoryModel);
      const findProductByBrandProCat = await ProductModel.find({brand_productCat_Id: checkId._id}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
      ]);
      if(!findProductByBrandProCat) throw new createHttpError.NotFound("محصولی با برند مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        findProductByBrandProCat
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByBrandProCatOfCount(req, res, next){
    try {
      const { brandProCatId } = req.params;
      const checkId = await checkExistOfModelById(brandProCatId, BrandProductCategoryModel);
      const findBrandProCatByCount = await BrandProductCategoryModel.findOne({_id: checkId._id});
      if(!findBrandProCatByCount) throw new createHttpError.NotFound("محصولی با دسته بندی برند مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        count: findBrandProCatByCount.count
      })
    } catch (error) {
      next(error)
    }
  };

}

module.exports = {
  BrandConteroller: new BrandConteroller()
}