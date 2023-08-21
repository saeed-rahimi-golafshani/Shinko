const { IndexApi } = require("./Api/Home.Routes");
const router = require("express").Router();
const redisClient = require("../Utills/Init.Redis");
const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");
(async () =>{
    await redisClient.set("key", "value");
    const value = redisClient.get("key");
    console.log(value); 
})();

router.use("/", IndexApi);
router.use("/users", userApiAuthenticationRoutes)

module.exports = {
    AllRoutes: router
}