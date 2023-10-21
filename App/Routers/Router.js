const { IndexApi } = require("./Api/Home.Routes");
const router = require("express").Router();
const redisClient = require("../Utills/Init.Redis");
const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");
const { AdminApiRoutes } = require("./Admin/Admin.Routes");
const { verifyAccessToken } = require("../Http/Middleware/VerifyAccessToken");
const { graphqlHTTP } = require("express-graphql");
const { graphqlConfig } = require("../Utills/graphql.Config");
(async () =>{
    await redisClient.set("key", "value");
    const value = redisClient.get("key");
    console.log(value); 
})();

router.use("/users", userApiAuthenticationRoutes);
router.use("/admin", verifyAccessToken, AdminApiRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/", IndexApi);

module.exports = {
    AllRoutes: router
}