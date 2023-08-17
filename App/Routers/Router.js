const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");

const router = require("express").Router();

router.use("/users", userApiAuthenticationRoutes)

module.exports = {
    AllRoutes: router
}