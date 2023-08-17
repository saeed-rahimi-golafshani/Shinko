const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");
const router = require("express").Router();
const redisCkient = require("../Utills/Init.Redis")
(async () =>{
    await redisCkient.set("key", "value");
    const value = redisCkient.get("key");
    console.log(value);
})();

router.use("/users", userApiAuthenticationRoutes)

module.exports = {
    AllRoutes: router
}