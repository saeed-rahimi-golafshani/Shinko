
// const GoogleStrategy = require("passport-oauth2").Strategy;
// const passport = require("passport"); 

// passport.use(
//     new GoogleStrategy(
//         {
//             clientId: process.env.CLIENT_ID,
//             clientSecret: process.env.CLIENT_SECRET,
//             callbackUrl: "/google/callback",
//             scope: ["profile", "email"],
//         },
//         function(accessToken, refreshToken, profile, callback){
//             callback(null, profile)
//         }
//     )
// );

// passport.serializeUser((user, done) => {
//     done(null, user)
// });
// passport.deserializeUser((user, done) => {
//     done(null, user)
// });