const { Auth_UserProfile_Controller } = require("../../Http/Controller/User/Auth_With_UserProfile.Controller");
const router = require("express").Router();

router.post("/register", Auth_UserProfile_Controller.register);
router.post("/login", Auth_UserProfile_Controller.login);
router.post("/refresh_token", Auth_UserProfile_Controller.refreshToken);

module.exports = {
    userApiAuthenticationRoutes: router
}