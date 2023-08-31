const bcrypt = require("bcrypt");
const moment = require("moment-jalali");
const path = require("path");
const fs = require("fs");
const { BlogCategoryModel } = require("../Models/Blog_Category.Model");


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
module.exports = {
    hashString,
    persionDateGenerator,
    randomNumberFiveDigitsGenerator,
    deleteFileInPath,
    copyObject,
    deleteInvalidPropertyObjectWithOutBlackList,
    getEnTitle,
    uploadFileWithFolderName,
}