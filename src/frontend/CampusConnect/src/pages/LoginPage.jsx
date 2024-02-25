import { Link, useNavigate } from "react-router-dom";
import avatarsvg from "../assets/Signinpage/avatar.svg";
import unlocksvg from "../assets/Signinpage/unlock.svg";
import wavepng from "../assets/Signinpage/wave.png";
import { motion } from "framer-motion";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState();
  const [accmsg, setAccmsg] = useState();
  const [accstatus, setAccstatus] = useState();
  const navigate = useNavigate();

  async function isAccActive(cred) {
    const res = await fetch("http://localhost:8000/isAccountActive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });
    const data = await res.json();
    setAccmsg(data.message);
    setAccstatus(data.status);
    console.log(data);
    return data;
  }

  async function handleLogin(cred) {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });
    const { success, message, token } = await res.json();
    setMsg(message);
    console.log(message);
    if (success) {
      // console.log("success", email);
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      isAccActive({ email });
      // navigate("/admin");
    }
    return message;
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email, password });
  }
  return (
    <>
      <motion.img
        initial={{ x: -100, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        src={wavepng}
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: -1 }}
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <motion.img
          initial={{ x: -50, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.5, transition: { duration: 0.1 } }}
          src={unlocksvg}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
        <motion.form
          onSubmit={handleSubmit}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          initial={{ y: -50, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center w-1/2"
        >
          <img src={avatarsvg} className="w-32" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Welcome Back
          </h2>
          <div className="relative">
            <i className="fa fa-user absolute text-yellow-700 text-xl" />

            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor text-lg focus:bg-slate-100"
            />
          </div>
          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-yellow-700 text-xl" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="password"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor focus:bg-slate-100  text-lg"
            />
          </div>

          {/* <a href="#" className="self-end mt-4 text-gray-600 font-bold">
            Forgot password?
          </a> */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            className="py-3 px-20 bg-primarycolor bg-yellow-400 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500 hover:bg-yellow-500"
          >
            Login
          </motion.button>
          <br />
          <p className="text-sm text-slate-600">
            Dont have account ?
            <Link className="text-yellow-700" to={"/"}>
              SignUp
            </Link>
          </p>
          {msg && <p> {msg} </p>}
          {accmsg && (
            <p>
              {accmsg} {accstatus}
            </p>
          )}
        </motion.form>
      </div>
    </>
  );
}

export default LoginPage;
