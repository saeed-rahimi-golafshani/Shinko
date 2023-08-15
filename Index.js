require("dotenv").config();
const Application = require("./App/Server");
const prot = process.env.APPLICATION_PORT;
const dbUrl = process.env.MONODB_URL;
new Application(prot, dbUrl)    
