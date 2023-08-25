const bcrypt = require("bcrypt");
const moment = require("moment-jalali");
const path = require("path");
const fs = require("fs");


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
function deleteFileInPath(fileAddress){
    if(fileAddress){
        const filePath = path.join(__dirname, "..", "..", "Public", fileAddress)
        if(fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
}

module.exports = {
    hashString,
    persionDateGenerator,
    randomNumberFiveDigitsGenerator,
    deleteFileInPath
}