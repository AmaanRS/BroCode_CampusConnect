const { login,
        signup,
        Verify_Otp_Create_User,
    } = require("../Controllers/Controller")

const {
    createUser,
    createEvent,
    createCommittee
    } = require("../Controllers/CreateController")

const {
    isAccountActive,
    getAllCommittees,
    fetchRequestOfUser
    } = require("../Controllers/UtilsController")

const express = require("express")
const { cookieChecker } = require("../Middlewares/CookieChecker")
const Router = express.Router()

Router.route("/login").post(login)
Router.route("/signup").post(signup)
Router.route("/isAccountActive").post(isAccountActive)
Router.route("/getAllCommittees").post(getAllCommittees)
Router.route("/fetchRequestOfUser").post(cookieChecker,fetchRequestOfUser)
Router.route("/Verify_Otp_Create_User").post(cookieChecker,Verify_Otp_Create_User)
Router.route("/createUser").post(createUser)
Router.route("/createCommittee").post(cookieChecker,createCommittee)
Router.route("/createEvent").post(cookieChecker,createEvent)


module.exports = Router