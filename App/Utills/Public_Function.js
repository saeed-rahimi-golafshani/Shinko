const bcrypt = require("bcrypt");
const moment = require("moment-jalali");
const path = require("path");
const fs = require("fs");
const { BlogCategoryModel } = require("../Models/Blog_Category.Model");
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
        const filePath = path.join(__dirname, "..", "..", "Public", fileAddress)
        if(fs.existsSync(filePath)){
            fs.re
            fs.unlinkSync(filePath);
        }
        
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
    };
    return fileName
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
async function checkExistOfModelByTitle(title, modelSchema){
    const model = await modelSchema.findOne({title});
        if(model) throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
        return model;
};

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
    checkExistOfModelByTitle
    
}