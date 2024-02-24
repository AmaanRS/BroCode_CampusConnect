const { login,
        signup,
        Verify_Otp_Create_User
} = require("../Controllers/Controller")
const express = require("express")
const { cookieChecker } = require("../Middlewares/CookieChecker")
const Router = express.Router()

Router.route("/login").post(login)
Router.route("/signup").post(signup)
Router.route("/Verify_Otp_Create_User").post(Verify_Otp_Create_User)


module.exports = Router