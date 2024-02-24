import { Link, useNavigate } from "react-router-dom";
import avatarsvg from "../assets/Signinpage/avatar.svg";
import unlocksvg from "../assets/Signinpage/unlock.svg";
import wavepng from "../assets/Signinpage/wave.png";
import { motion, spring } from "framer-motion";
import { useState } from "react";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [inputErrorEmail, setInputErrorEmail] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passErrMsg, setPassErrmsg] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  // const mutation = useMutation(async (cred) => {
  //   console.log("sent");
  //   const res = await fetch("http://localhost:8000/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cred),
  //   });
  //   const data = await res.json();
  //   return data;
  // });

  async function postData(cred) {
    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });
    const { message, success } = await res.json();
    if (success) {
      setIsOtp(true);
    }
    return message;
  }

  async function submitOtp(cred) {
    const res = await fetch("http://localhost:8000/Verify_Otp_Create_User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });
    // const { message, success } = await res.json();
    // if (success) {
    //   setIsOtp(true);
    // }
    const { success, message } = await res.json();
    console.log(success, message);
    if (success) {
      navigate("/login");
    }
    return success;
  }

  function handleOtpSubmit(e) {
    e.preventDefault();
    submitOtp({ email, password, otp });
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!email.includes("@vcet.edu.in")) {
      setInputErrorEmail(true);
    }
    if (password.length < 6 || confirmPass.length < 6) {
      setPassError(true);
      setPassErrmsg("password length must be greater than 6");
    }
    if (password !== confirmPass) {
      setPassError(true);
      setPassErrmsg("password does not match");
    }
    console.log(email, password, confirmPass);
    postData({ email, password });
  }
  return (
    <>
      <motion.img
        initial={{ x: -100, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: spring }}
        src={wavepng}
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: -1 }}
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <motion.img
          initial={{ x: -50, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={unlocksvg}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />

        <motion.form
          onSubmit={handleSignup}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          initial={{ y: -50, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, type: spring }}
          className="flex flex-col justify-center items-center w-1/2"
        >
          <img src={avatarsvg} className="w-32" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Sign up for Campus Connect
          </h2>
          {inputErrorEmail && (
            <p className="text-red-600">Please use institution email id only</p>
          )}
          {passError && <p className="text-red-600">{passErrMsg}</p>}
          {!isOtp && (
            <>
              <div className="relative">
                <i className="fa fa-user absolute text-yellow-700 text-xl" />

                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setInputErrorEmail(false);
                  }}
                  required
                  type="email"
                  placeholder="E-mail"
                  className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor text-lg focus:bg-slate-100"
                />
              </div>
              <div className="relative mt-8">
                <i className="fa fa-lock absolute text-yellow-700 text-xl" />
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPassError(false);
                  }}
                  required
                  type="password"
                  placeholder="password"
                  className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor focus:bg-slate-100  text-lg"
                />
              </div>
              <div className="relative mt-8">
                <i className=" fa fa-solid fa-key absolute text-yellow-700 text-xl" />

                <input
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                    setPassError(false);
                  }}
                  required
                  type="password"
                  placeholder="confirm password"
                  className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor focus:bg-slate-100  text-lg"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-20 bg-primarycolor bg-yellow-400 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500 hover:bg-yellow-500"
              >
                Register
              </button>
            </>
          )}

          {isOtp && (
            <>
              <input
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                required
                type="text"
                placeholder="enter otp"
                className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor focus:bg-slate-100  text-lg"
              />{" "}
              <button
                type="button"
                onClick={handleOtpSubmit}
                className="py-3 px-20 bg-primarycolor bg-yellow-400 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500 hover:bg-yellow-500"
              >
                Enter OTP
              </button>
            </>
          )}

          {/* <a href="#" className="self-end mt-4 text-gray-600 font-bold">
            Forgot password?
          </a> */}

          <br />
          <p className="text-sm text-slate-600">
            All ready a user ?
            <Link className="text-yellow-700" to={"/login"}>
              login
            </Link>
          </p>
        </motion.form>
      </div>
    </>
  );
}

export default SignupPage;
