const bcrypt = require("bcrypt");
const moment = require("moment-jalali");
const path = require("path");
const fs = require("fs");
const { unlink } = require("fs/promises")
const { BlogCategoryModel } = require("../Models/Blog_Category.Model");
const { BlogModel } = require("../Models/Blog.Model");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");

function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
};
function persionDateGenerator(){ 
    return moment().format("jYYYYjMMjDDHHmmssSS");
};
function randomNumberFiveDigitsGenerator(){
    return (Math.floor(Math.random() * 90000) + 10000);
};
async function deleteFileInPath(fileAddress){
    if(fileAddress){
        const pathFile = path.join(__dirname, "..", "..", "Public", fileAddress);
        if(fs.existsSync(pathFile)) unlink(pathFile);
       }
};
async function deleteFolderInPath(fileAddress){
    if(fileAddress){
        const pathFile = fileAddress.map(item => path.join(__dirname, "..", "..", "Public", item))
        const deleteFiles = async (paths) => {
            try {
                const promises = paths.map((file) => unlink(file))
                await Promise.all(promises)
                console.log('All files deleted successfully')
            } catch (error) {
                console.error(error)
            }
        }
        deleteFiles(pathFile)
    }   
};
async function deleteFileInPathArray(fileAddress){
    if(fileAddress){
        const pathFile = fileAddress.map(item => path.join(__dirname, "..", "..", "Public", item))
        const deleteFiles = async (paths) => {
            try {
                const promises = paths.map((file) => unlink(file))
                await Promise.all(promises)
                console.log('All files deleted successfully')
            } catch (error) {
                console.error(error)
            }
        }
        deleteFiles(pathFile)
    }
};
function copyObject(obj){
    return JSON.parse(JSON.stringify(obj));
};
function deleteInvalidPropertyObjectWithOutBlackList(data = {}){
    const nullish = ["", " ", NaN, null, undefined, 0];
    Object.keys(data).forEach(key => {
        if(nullish.includes(data[key])) delete data[key]
    });
    return data
};
async function getEnTitle(req, model){
    const { id } = req;
    const getEn_title = await model.findOne({_id: id});
    const fileName = getEn_title.en_title;
    return fileName
};
async function uploadFileWithFolderName(req, folderName){
    let fileName;
    if(folderName == "BlogCategory"){
      fileName = await getEnTitle(req, BlogCategoryModel)
      return fileName
    }
    else if(folderName == "Blogs"){
        fileName = await getEnTitle(req, BlogModel)
        return fileName
    }
    
};
function listOfImageFromRequest(files, fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath, file.filename)).map(item => item.replace(/\\/g, "/")));
    } else {
        return []
    }
};
function getFileOrginalname(files) {
    return files.map(file => {return (file.originalname)});
    
};
function getFileEncoding(files) {
    return files.map(file => {return (file.encoding)});
};
function getFileMimetype(files) {
    return files.map(file => {return (file.mimetype)});
};
function getFileFilename(files) {
    return files.map(file => {return (file.filename)});
};
function getFileSize(files){
    let sum = 0;
    const fileSize = files.map(file => {return (file.size)});
    for (const i in fileSize){
        sum += fileSize[i];
    };
    sum = (sum / 1024);
    const total = Math.ceil(sum);
    return total; 
};
async function checkExistOfModelById(id, modelSchema){
    if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر یافت نشد");
    const model = await modelSchema.findById(id);
    if(!model) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
    return model
};
async function checkExistOfModelByTitle(title, modelSchema, fileAddress){
    const model = await modelSchema.findOne({title});
        if(model){
            deleteFileInPathArray(fileAddress)
            throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید")
        }
        return model;
};
async function createCounterCategory(model, modelDetaileCategory){

    const modelCategory = await model.findOne({_id: modelDetaileCategory});
    if(!modelCategory) throw new createHttpError.InternalServerError("خطای سروری");
    let count = modelCategory.count;
    let newCount = count + 1;
    count = newCount;
    return await model.updateOne({_id: modelCategory.id}, {count});
    // const blogCategory = await BlogCategoryModel.findOne({_id: blog.blog_category_Id});
    // if(!blogCategory) throw new createHttpError.InternalServerError("خطای سروری");
    // let count = blogCategory.count;
    // let newCount = count + 1;
    // count = newCount
    // await BlogCategoryModel.updateOne({_id: blogCategory.id}, {count});

};
async function updateCounterCategory(model, modelDetaileCategory, dataBodyDetailCategory){

    const subtractCategory = await model.findOne({_id: modelDetaileCategory});
    const sumCategory = await model.findOne({_id: dataBodyDetailCategory});
    if(!subtractCategory) throw new createHttpError.NotFound("دسته بندی مقاله ای یافت نشد");
    let subCount = subtractCategory.count;
    let SubtractCount = subCount - 1;
    subCount = SubtractCount;
    let sumCount = sumCategory.count;
    let newCount = sumCount + 1;
    sumCount = newCount;
    await model.updateOne({_id: subtractCategory.id}, {count: subCount});
    await model.updateOne({_id: sumCategory.id}, {count: sumCount});
    

    // const subtractBlog = await BlogCategoryModel.findOne({_id: blog.blog_category_Id});
    //             const sumBlog = await BlogCategoryModel.findOne({_id:  dataBody.blog_category_Id});
    //             if(!subtractBlog) throw new createHttpError.NotFound("دسته بندی مقاله ای یافت نشد");
    //             let subCount = subtractBlog.count;
    //             let SubtractCount = subCount - 1;
    //             subCount = SubtractCount;
    //             let sumCount = sumBlog.count;
    //             let newCount = sumCount + 1;
    //             sumCount = newCount;
    //             await BlogCategoryModel.updateOne({_id: subtractBlog.id}, {count: subCount});
    //             await BlogCategoryModel.updateOne({_id: sumBlog.id}, {count: sumCount});

};
async function deleteCounterCategory(model, modelDetaileCategory){
    const subtractCategory = await model.findOne({_id: modelDetaileCategory});
    let subCount = subtractCategory.count;
    let SubtractCount = subCount - 1;
    subCount = SubtractCount;  
    await model.updateOne({_id: subtractCategory.id}, {count: subCount});
}

module.exports = {
    hashString,
    persionDateGenerator,
    randomNumberFiveDigitsGenerator,
    deleteFileInPath,
    copyObject,
    deleteInvalidPropertyObjectWithOutBlackList,
    getEnTitle,
    uploadFileWithFolderName,
    listOfImageFromRequest,
    getFileOrginalname,
    getFileEncoding,
    getFileMimetype,
    getFileFilename,
    getFileSize,
    checkExistOfModelById,
    checkExistOfModelByTitle,
    deleteFileInPathArray,
    deleteFolderInPath,
    createCounterCategory,
    updateCounterCategory,
    deleteFolderInPath,
    deleteCounterCategory
}