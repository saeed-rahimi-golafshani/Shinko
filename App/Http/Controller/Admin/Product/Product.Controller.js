const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../Models/Product.Model");
const { 
  listOfImageFromRequest, 
  checkExistOfModelByTitle, 
  discountOFPrice, 
  getFileOrginalname, 
  getFileEncoding, 
  getFileMimetype, 
  getFileFilename, 
  getFileSize, 
  createCounterCategory,
  checkExistOfModelById,
  copyObject,
  deleteFileInPathArray,
  deleteInvalidPropertyObject,
  updateCounterCategory,
  deleteFolderInPath} = require("../../../../Utills/Public_Function");
const { createProductSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const { ProductCategoryModel } = require("../../../../Models/Product_Category.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { FileModel } = require("../../../../Models/Files.Model");
const { ProductTypeModel } = require("../../../../Models/Product_Type.Model");
const productBlackList = {
  FILE_ID: "file_Id",
  PRICE: "price",
}
Object.freeze(productBlackList);

class ProductController extends Controller{
  async createProduct(req, res, next){
    try {
      const requestBody = await createProductSchema.validateAsync(req.body);
      const { 
        title, 
        en_title, 
        text, 
        short_text, 
        tags, 
        product_category_Id, 
        Product_Type_Id,
        producer, 
        status, 
        stock, 
        active, 
        main_price, 
        discount, 
        send_date, 
        returned } = requestBody;
      const fileAddress = listOfImageFromRequest(req.files.images || [], requestBody.fileUploadPath);
      await checkExistOfModelByTitle(title, ProductModel, fileAddress);
      const price = discountOFPrice(main_price, discount);
      const createProduct = await ProductModel.create({
        title,
        en_title,
        text,
        short_text,
        tags,
        product_category_Id,
        Product_Type_Id,
        producer,
        status,
        stock,
        active,
        main_price,
        discount,
        price,
        send_date,
        returned
      });
      if(!createProduct) throw new createHttpError.InternalServerError("خطای سروری");
      // ----------------------- file model -------------------
      const type_files = listOfImageFromRequest(req.files.images || [], requestBody.fileUploadPath);
      const type = "product";
      const orginalName = getFileOrginalname(req.files['images']);
      const fileEncoding = getFileEncoding(req.files['images']);
      const mimeType = getFileMimetype(req.files['images']);
      const fileName = getFileFilename(req.files['images']);
      const fileSize = getFileSize(req.files['images']);
      const fileDetailes = await FileModel.create({
        files: type_files, 
        type,
        originalnames: orginalName,
        encoding: fileEncoding,
        mimetype: mimeType,
        filename: fileName,
        size: fileSize
      });
      if(!fileDetailes) throw new createHttpError.InternalServerError("خطای سروری");
      const fileId = fileDetailes._id;
      await ProductModel.updateOne({_id: createProduct._id}, {file_Id: fileId});
      //  ------------- count product categhory ------------------------
      await createCounterCategory(ProductCategoryModel, createProduct.product_category_Id);
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
            message: "محصول با موفقیت ثبت شد"
        }
    })

    } catch (error) {
      next(error)
    }
  };
  async listOfProduct(req, res, next){
    try {
      const { search } = req.query;
      let products;
      if(search){
        products = await ProductModel.findOne(
          { 
            $text: {
              $search: new RegExp(search, "ig")
            }
          }).populate([
            {path: "file_Id", select: {files: 1}},
            {path: "product_category_Id", select: {title: 1}},
            {path: "Product_Type_Id", select: {type_name: 1}}
          ]);
      } else {
        products = await ProductModel.find({}).populate([
          {path: "file_Id", select: {files: 1}},
          {path: "product_category_Id", select: {title: 1}},
          {path: "Product_Type_Id", select: {type_name: 1}}
        ]);
      }
      if(!products) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductById(req, res, next){
    try {
      const { id } = req.params;
      const product = await checkExistOfModelById(id, ProductModel);
      const listOfProduct = await ProductModel.findOne({_id: product._id}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}}
      ]);
      if(!listOfProduct) throw new createHttpError.NotFound("محصولی یافت نشد");
      console.log(listOfProduct);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          product: listOfProduct
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByCategory(req, res, next){
    try {
      const { productCategoryId } = req.params;
      const product = await checkExistOfModelById(productCategoryId, ProductCategoryModel);
      const listOfProduct = await ProductModel.find({product_category_Id: product._id}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}}
      ]);
      if(!listOfProduct) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products: listOfProduct
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByProductType(req, res, next){
    try {
      const { productTypeId } = req.params;
      const product = await checkExistOfModelById(productTypeId, ProductTypeModel);
      const listOfProduct = await ProductModel.find({Product_Type_Id: product._id}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}}
      ]);
      if(!listOfProduct) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products: listOfProduct
        }
      })

    } catch (error) {
      next(error)
    }
  };
  async listOfProductByProducer(req, res, next){
    try {
      const { producer } = req.params;
      const product = await ProductModel.find({producer}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}}
      ]);
      if(!product) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products: product
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByActive(req, res, next){
    try {
      const product = await ProductModel.find({active: true}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}}
      ]);
      if(!product) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products: product
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByNotActive(req, res, next){
    try {
      const product = await ProductModel.find({active: false}).populate([
        {path: "file_Id", select: {files: 1}},
        {path: "product_category_Id", select: {title: 1}},
        {path: "Product_Type_Id", select: {type_name: 1}}
      ]);
      if(!product) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products: product
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async updateProduct(req, res, next){
    try {
      const { id } = req.params;
      const product = await checkExistOfModelById(id, ProductModel);
      const dataBody = copyObject(req.body);
      const fileId = await FileModel.findOne({_id: product.file_Id});
      if(dataBody.fileUploadPath && dataBody.filename){
        const files = listOfImageFromRequest(req.files.images || [], dataBody.fileUploadPath);
        deleteFileInPathArray(fileId.files);
        await FileModel.updateOne({_id: fileId._id}, {files});
      }
      let blackFeildList = Object.values(productBlackList);
      deleteInvalidPropertyObject(dataBody, blackFeildList);
      if(dataBody.product_category_Id){
        updateCounterCategory(ProductCategoryModel, product.product_category_Id, dataBody.product_category_Id)
      }
      const updateResault = await ProductModel.updateOne({_id: product._id}, {$set: dataBody});
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "به روز رسانی محصول با موفقیت انجام شد"
        }
      })

    } catch (error) {
      next(error)
    }
  };
  async deleteProduct(req, res, next){
    try {
      const { id } = req.params;
      const product = await checkExistOfModelById(id, ProductModel);
      const file = await FileModel.findOne({_id: product.file_Id});
      if(!file || !product) throw new createHttpError.NotFound("محصولی یافت نشد");
      deleteFolderInPath(file.files);
      const deleteResaultProduct = await ProductModel.deleteOne({_id: product._id});
      const deleteResaultFile = await FileModel.deleteOne({_id: file._id});
      if(deleteResaultProduct.deletedCount == 0 || deleteResaultFile.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "محصول با موفقیت حذف گردید"
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  ProductController: new ProductController()
}