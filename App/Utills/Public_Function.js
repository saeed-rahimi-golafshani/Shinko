const bcrypt = require("bcrypt");
const moment = require("moment-jalali");

function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
};
function persionDateGenerator(){ 
    return moment().format("jYYYYjMMjDDHHmmssSS");
};
function randomNumberFiveDigitsGenerator(){
    return (Math.floor(Math.random() * 90000) + 10000);
}

module.exports = {
    hashString,
    persionDateGenerator,
    randomNumberFiveDigitsGenerator
}