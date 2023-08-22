const { Auth_UserProfile_Controller } = require("../../Http/Controller/User/Auth_With_UserProfile.Controller");
const { OtpAuthenticationController } = require("../../Http/Controller/User/Otp_Auth.Controller");
const router = require("express").Router();
// const passport = require("passport");

router.post("/register", Auth_UserProfile_Controller.register);
router.post("/login", Auth_UserProfile_Controller.login);
router.post("/refresh_token", Auth_UserProfile_Controller.refreshToken);
router.post("/otp_register", OtpAuthenticationController.otp_Register);
router.post("/otp_login", OtpAuthenticationController.otp_Login);
router.post("/otp-refreshtoken", OtpAuthenticationController.otp_refreshToken);

// router.get("/login/success", (req, res) => {
//     if(req.user) {
//         res.status(200).json({
//             error: false,
//             message: "Successfully Loged In",
//             user: req.user
//         });
//     } else {
//         res.status(403).json({error: true, message: "Not Authorized"});
//     }
// })
// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         error: true,
//         message: "Login in failed"
//     })
// });
// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: "/login/failed",
// }))
// router.get("/google", passport.authenticate("google", ["profile", "email"])); 
// router.get("logout", (req, res) => {
//     req.logOut();
//     res.redirect(process.env.CLIENT_URL)
// });
module.exports = {
    userApiAuthenticationRoutes: router
}