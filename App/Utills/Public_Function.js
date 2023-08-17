const bcrypt = require("bcrypt");
const moment = require("moment-jalali");

function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
};
function persionDateGenerator(){ 
    return moment().format("jYYYYjMMjDDHHmmssSS");
}

module.exports = {
    hashString,
    persionDateGenerator
}