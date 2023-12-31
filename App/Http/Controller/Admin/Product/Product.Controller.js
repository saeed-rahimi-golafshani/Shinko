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
  deleteFolderInPath,
  convertGregorianDateToPersionDateToToday} = require("../../../../Utills/Public_Function");
const { createProductSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const { ProductCategoryModel } = require("../../../../Models/Product_Category.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { FileModel } = require("../../../../Models/Files.Model");
const { BrandProductCategoryModel } = require("../../../../Models/Brand_ProductCategory.Model");
const { BrandModel } = require("../../../../Models/Brand.Model");
const productBlackList = {
  FILE_ID: "file_Id",
  PRICE: "price",
  BRAND_ID: "brand_Id",
  BRAND_PRODUCTCAT_ID: "brand_productCat_Id"
}
Object.freeze(productBlackList);

class ProductController extends Controller{
  
  async createProduct(req, res, next){
    try {
      console.log(req.body.image);
      const requestBody = await createProductSchema.validateAsync(req.body);
      const { 
        title, 
        en_title, 
        product_category_Id, 
        brand_Id,
        main_price, 
        discount, 
        preparation_time,
        stock,
        short_text, 
        text, 
        tags, 
        returnable,
        publication_date,
        publication_status,
         } = requestBody;
      const fileAddress = listOfImageFromRequest(req.files.image || [], requestBody.fileUploadPath);
      await checkExistOfModelByTitle(title, ProductModel, fileAddress);
      const price = discountOFPrice(main_price, discount);
      let createTime = convertGregorianDateToPersionDateToToday();
      let updateTime = convertGregorianDateToPersionDateToToday();
      const slug = (title.split(" ").toString()).replace(/,/g, "-");
      const createProduct = await ProductModel.create({
        title,
        en_title,
        product_category_Id,
        brand_Id,
        main_price,
        discount,
        price,
        preparation_time,
        stock,
        short_text,
        text,
        tags,
        returnable,
        publication_date,
        publication_status,
        createdAt: createTime,
        updatedAt: updateTime,
        slug
      });
      if(!createProduct) throw new createHttpError.InternalServerError("خطای سروری");
      // ----------------------- file model ------------------ 
      const type_files = listOfImageFromRequest(req.files.image || [], requestBody.fileUploadPath);
      const orginalName = getFileOrginalname(req.files['image']);
      const fileEncoding = getFileEncoding(req.files['image']);
      const mimeType = getFileMimetype(req.files['image']);
      const fileName = getFileFilename(req.files['image']);
      const fileSize = getFileSize(req.files['image']);
      const fileDetailes = await FileModel.create({
        type_Id: createProduct._id, 
        file_refrence: type_files, 
        type: "product",
        originalnames: orginalName,
        encoding: fileEncoding,
        mimetype: mimeType,
        filename: fileName,
        size: fileSize,
        createdAt: createTime,
        updatedAt: updateTime
      });
      if(!fileDetailes) throw new createHttpError.InternalServerError("خطای سروری");
      //  ------------- count product categhory ------------------------
      await createCounterCategory(ProductCategoryModel, createProduct.product_category_Id);
      // ----------------- create brand ------------------------
      const productCategory = await ProductCategoryModel.findOne({_id: product_category_Id});
      const brand = await BrandModel.findOne({_id: brand_Id});
      const brandProductCategory = await BrandProductCategoryModel.findOne({productCategory_Id: createProduct.product_category_Id, brand_Id: createProduct.brand_Id});
      if(brandProductCategory){
        let count = brandProductCategory.count;
        await BrandProductCategoryModel.updateOne(
          {
            _id: brandProductCategory._id
          },
          {
            count: count + 1
          })
        await ProductModel.updateOne({_id: createProduct._id}, {brand_productCat_Id: brandProductCategory._id}); ////////
        await createCounterCategory(BrandModel, createProduct.brand_Id)
        
      } else {
        const brandProductCatTitle = productCategory.title + " " + brand.title;
        const brand_ProductCat = await BrandProductCategoryModel.create(
          {
            brand_Id, 
            productCategory_Id: product_category_Id, 
            title: brandProductCatTitle,
          })
        await createCounterCategory(BrandModel, createProduct.brand_Id)
        if(!brand_ProductCat) throw new createHttpError.InternalServerError("خطای سروری");
        await ProductModel.updateOne({_id: createProduct._id}, {brand_productCat_Id: brand_ProductCat._id});
        const find_Id = await ProductModel.findOne({_id: createProduct._id});
        await createCounterCategory(BrandProductCategoryModel, find_Id.brand_productCat_Id); 
      }
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
  async createProductGallery(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductModel);
      const requestData = copyObject(req.body);
      console.log(req.body);
      const fileId = await FileModel.findOne({type_Id: checkId._id});
      // if(requestData.fileUploadPath && requestData.filename){
        const files = listOfImageFromRequest(req.files.images || [], requestData.fileUploadPath);
        const orginalName = getFileOrginalname(req.files['images']);
        const fileEncoding = getFileEncoding(req.files['images']);
        const mimeType = getFileMimetype(req.files['images']);
        const fileName = getFileFilename(req.files['images']);
        const fileSize = getFileSize(req.files['images']);
        const updateTime = convertGregorianDateToPersionDateToToday();
        deleteFileInPathArray(fileId.files);
        const updateResault = await FileModel.updateOne(
          {
            _id: fileId._id
          }, 
          {
            files, 
            originalnames: orginalName, 
            encoding: fileEncoding,
            mimetype: mimeType,
            filename: fileName, 
            size: fileSize,
            updatedAt: updateTime
          });
      // }
      if(!updateResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "گالری تصاویر محصول با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
  async listOfProduct(req, res, next){
    try {
      const { search } = req.query;
      let products, numberOfResault = 0;
      if(search){
        products = await ProductModel.find(
          { 
            $text: {
              $search: new RegExp(search, "ig")
            }
          },
          {
            title: 1, 
            product_category_Id: 1, 
            price: 1, 
            stock: 1, 
            publication_status: 1,  
            brand_Id: 0, 
            brand_productCat_Id: 0,
          }).populate([
            {path: "product_category_Id", select: {title: 1}},
            {path: "brand_Id", select: {title: 1}},
            {path: "brand_productCat_Id", select: {title: 1}}
          ]);
        numberOfResault = await ProductModel.find(
          { 
            $text: {
              $search: new RegExp(search, "ig")
            }
          }).count();
      } else {
        products = await ProductModel.find(
          {

          },
          {
            title: 1, 
            product_category_Id: 1, 
            price: 1, 
            stock: 1, 
            publication_status: 1,  
            brand_Id: 0, 
            brand_productCat_Id: 0,
          }).populate([
          {path: "product_category_Id", select: {title: 1}},
          {path: "brand_Id", select: {title: 1}},
          {path: "brand_productCat_Id", select: {title: 1}}
        ]);
        numberOfResault = await ProductModel.find({}).count();
      }
      if(!products) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products,
          numberOfResault
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductByCategory(req, res, next){    
    try {
      const { categoryName } = req.query;
      const productCategory = await ProductCategoryModel.findOne({title: categoryName});
      const listOfProduct = await ProductModel.find(
        {
          product_category_Id: productCategory._id
        },
        {
          title: 1, 
          product_category_Id: 1, 
          price: 1, 
          stock: 1, 
          publication_status: 1, 
          brand_Id: 0, 
          brand_productCat_Id: 0
        }).populate([
        {path: "product_category_Id", select: {title: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
      ]);
      const numberOfresault = await ProductModel.find({product_category_Id: productCategory._id}).populate([
        {path: "product_category_Id", select: {title: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
      ]).count();
      if(!listOfProduct) throw new createHttpError.NotFound("محصولی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          products: listOfProduct,
          numberOfresault
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductById(req, res, next){
    try {
      const { id, slug } = req.params;
      const product = await checkExistOfModelById(id, ProductModel);
      const listOfProduct = await ProductModel.findOne({_id: product._id, slug}).populate([
        {path: "product_category_Id", select: {title: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
      ]);
      if(!listOfProduct) throw new createHttpError.NotFound("محصولی یافت نشد");
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
  async listOfProductByActive(req, res, next){
    try {
      const product = await ProductModel.find({publication_status: true}, {
        title: 1, 
        product_category_Id: 1, 
        price: 1, 
        stock: 1, 
        publication_status: 1,  
        brand_Id: 0, 
        brand_productCat_Id: 0,
      }).populate([
        {path: "product_category_Id", select: {title: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
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
      const product = await ProductModel.find({publication_status: false}, {
        title: 1, 
        product_category_Id: 1, 
        price: 1, 
        stock: 1, 
        publication_status: 1,  
        brand_Id: 0, 
        brand_productCat_Id: 0,
      }).populate([
        {path: "product_category_Id", select: {title: 1}},
        {path: "brand_Id", select: {title: 1}},
        {path: "brand_productCat_Id", select: {title: 1}}
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
      let updateTime = convertGregorianDateToPersionDateToToday();
      const dataBody = copyObject(req.body);
      const fileId = await FileModel.findOne({type_Id: product._id});
      if(dataBody.fileUploadPath && dataBody.filename){
        const file_refrence = listOfImageFromRequest(req.files.image || [], dataBody.fileUploadPath);
        const orginalName = getFileOrginalname(req.files['image']);
        const fileEncoding = getFileEncoding(req.files['image']);
        const mimeType = getFileMimetype(req.files['image']);
        const fileName = getFileFilename(req.files['image']);
        const fileSize = getFileSize(req.files['image']);
        let updatedTime = convertGregorianDateToPersionDateToToday();
        deleteFileInPathArray(fileId.files);
        await FileModel.updateOne(
          {
            _id: fileId._id 
          }, 
          {
            file_refrence, 
            originalnames: orginalName, 
            encoding: fileEncoding,
            mimetype: mimeType,
            filename: fileName, 
            size: fileSize,
            updatedAt: updatedTime
          });
      }
      let blackFeildList = Object.values(productBlackList);
      deleteInvalidPropertyObject(dataBody, blackFeildList);
      if(dataBody.product_category_Id){
        updateCounterCategory(ProductCategoryModel, product.product_category_Id, dataBody.product_category_Id);
      }
      const updateResault = await ProductModel.updateOne({_id: product._id}, {$set: dataBody, updatedAt: updateTime});
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
  async updateProductByGallery(req, res, next){
    try {
      const { id } = req.params;
      const product = await checkExistOfModelById(id, ProductModel);
      const dataBody = copyObject(req.body);
      const fileId = await FileModel.findOne({type_Id: product._id});
      const files = listOfImageFromRequest(req.files.images || [], dataBody.fileUploadPath);
      const orginalName = getFileOrginalname(req.files['images']);
      const fileEncoding = getFileEncoding(req.files['images']);
      const mimeType = getFileMimetype(req.files['images']);
      const fileName = getFileFilename(req.files['images']);
      const fileSize = getFileSize(req.files['images']);
      let updatedTime = convertGregorianDateToPersionDateToToday();
      deleteFileInPathArray(fileId.files);
      const updateResault = await FileModel.updateOne( 
        {
          _id: fileId._id 
        }, 
        {
          files, 
          originalnames: orginalName, 
          encoding: fileEncoding,
          mimetype: mimeType,
          filename: fileName, 
          size: fileSize,
          updatedAt: updatedTime
        });
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "به روز رسانی  گالری محصول با موفقیت انجام شد" 
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
      const file = await FileModel.findOne({type_Id: product._id});
      if(!file || !product) throw new createHttpError.NotFound("محصولی یافت نشد");
      deleteFolderInPath(file.files);
      const deleteResaultProduct = await ProductModel.deleteOne({_id: product._id});
      const deleteResaultFile = await FileModel.deleteOne({_id: file._id});
      if(deleteResaultProduct.deletedCount == 0 || deleteResaultFile.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      // const deleteProConfigration = await ProductConfigrationModel.deleteOne({product_Id: product._id});
      // if(deleteProConfigration.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "محصول با موفقیت حذف گردید"
        }
      })
    } catch (error) {
      next(error)
    }
  };
}

module.exports = {
  ProductController: new ProductController()
}