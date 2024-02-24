const userModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(`${process.env.ENCRYPTION_KEY}`, {
  pbkdf2Iterations: 10,
  saltLength: 5,
});

var otp;
const Generate_Otp = () => {
  otp = Math.floor(Math.random() * 1000000);
};

const login = async (req, res) => {
  try {
    //Get the data from the request
    let { email, password } = req.body;

    //If email and password exist
    if (email && password) {
      //Try to get the email from the database
      let doesEmailExist = await userModel.findOne({ email: email });

      //If the database does not returns the data of the user
      if (!doesEmailExist) {
        return res.json({
          message: "Either email or password entered is wrong",
          success: false,
        });
      }

      //Check the user input password against the password from the database
      let matchPassword = await bcrypt.compare(
        password,
        doesEmailExist.password
      );

      //If the passwords do not match
      if (!matchPassword) {
        return res.json({
          message: "Either email or password entered is wrong",
          success: false,
        });
      }

      //Create a jwt token
      let token = jwt.sign({ email: email }, process.env.JWT_SECRET);

      if (!token) {
        return res.json({
          message: "The token could not be created",
          success: false,
        });
      }

      //Send the message to the frontend that the user is now logged in
      return res.json({
        message: "You have been logged in successfully",
        success: true,
        token: token,
      });
    }
    //If either email or password does not exist
    else {
      return res.json({
        message: "Either email or password is missing",
        success: false,
      });
    }
  } catch (e) {
    console.log("There is some error in login controller");

    //Logging the error
    console.log(e.message);

    //Send the message to the frontend that the user is not logged in
    return res.json({
      message: "There is some problem in logging in",
      success: false,
    });
  }
};

const Nodemailer_Message = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    Generate_Otp();
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL, // sender address
      to: `${email}`, // list of receivers
      subject: "OTP for CampusConnect Email", // Subject line
      text: `Here is Your OTP for Verifying your CampusConnect Email ${otp}`,
    });
    return { message: "OTP sent Successfully", success: true };
  } catch (error) {
    console.log(error);
    return { message: error.message, success: false };
  }
};

//Bug in this -- jwt payload is visible to everyone
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const response = await Nodemailer_Message(email);

      if (!response || !response.success) {
        return res.json({
          message: `OTP could'nt be sent please try again ${response.message}`,
          success: false,
        });
      }

      const encryptedEmail = cryptr.encrypt(email);
      const encryptedPassword = cryptr.encrypt(password);

      const token = jwt.sign(
        { email: encryptedEmail, password: encryptedPassword },
        process.env.JWT_SECRET
      );

      if (!token) {
        return res.json({
          message: "The token could not be created",
          success: false,
        });
      }

      return res.json({
        message: `${response.message}`,
        success: response.success,
        token: token,
      });
    } else {
      return res.json({
        message: "Enter both email and password",
        success: false,
      });
    }
  } catch (e) {
    //Logging the error
    console.log(e.message);

    //Send the message to the frontend that the user's account is not created
    return res.json({
      message: "There is some problem in signning up",
      success: false,
    });
  }
};

const Verify_Otp_Create_User = async (req, res) => {
  try {
    const UserEnteredOtp = req.body.otp;
    const { email, password } = req.middlewareRes.decodedToken;

    if (UserEnteredOtp == otp && email && password) {
      const decryptedEmail = cryptr.decrypt(email);
      const decryptedPassword = cryptr.decrypt(password);

      const hashedPassword = await bcrypt.hash(decryptedPassword, 8);

      const isUserCreated = await userModel.create({
        email: decryptedEmail,
        password: hashedPassword,
      });

      if (!isUserCreated) {
        return res.json({ message: "User not created", success: false });
      }

      return res.json({
        message: "Your account has been created now you can login",
        success: true,
      });
    } else {
      return res.json({ message: "Otp match unsuccessfull", success: false });
    }
  } catch (error) {
    console.log(error);

    if (e.code == 11000) {
      return res.json({
        message: "This email is already registered",
        success: false,
      });
    }

    return res.json({ message: error, success: false });
  }
};

module.exports = { login, signup, Verify_Otp_Create_User };
