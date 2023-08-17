const trezSmsClient = require("trez-sms-client");

async function smsClient(mobile, otpcode){
    const username = process.env.SMS_USERNAME;
    const password = process.env.SMS_PASSWORD;
    const sender = process.env.SMS_SENDER;
    const message =  ` شین کو \n کد تایید: ${otpcode}`;
    const client = new trezSmsClient(username, password);
    client.sendMessage(sender, mobile, message, otpcode)
    .then((receipt) => {
        console.log("Receipt:" + receipt);
    })
    .catch((error) => {
        console.log(error.isHttpException, error.code, error.message);
    })
}

module.exports = {
    smsClient
}