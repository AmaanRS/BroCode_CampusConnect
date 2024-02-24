import avatarsvg from "../assets/Signinpage/avatar.svg";
import unlocksvg from "../assets/Signinpage/unlock.svg";
import wavepng from "../assets/Signinpage/wave.png";

function SignupPage() {
  return (
    <>
      <img
        src={wavepng}
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: -1 }}
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src={unlocksvg}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
        <form className="flex flex-col justify-center items-center w-1/2">
          <img src={avatarsvg} className="w-32" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Sign up for Campus Connect
          </h2>
          <div className="relative">
            <i className="fa fa-user absolute text-yellow-700 text-xl" />

            <input
              type="email"
              placeholder="E-mail"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor text-lg focus:bg-slate-100"
            />
          </div>
          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-yellow-700 text-xl" />
            <input
              type="password"
              placeholder="password"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor focus:bg-slate-100  text-lg"
            />
          </div>
          <div className="relative mt-8">
            <i className=" fa fa-solid fa-key absolute text-yellow-700 text-xl" />

            <input
              type="password"
              placeholder="confirm password"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor focus:bg-slate-100  text-lg"
            />
          </div>

          {/* <a href="#" className="self-end mt-4 text-gray-600 font-bold">
            Forgot password?
          </a> */}
          <a
            href="#"
            className="py-3 px-20 bg-primarycolor bg-yellow-400 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500 hover:bg-yellow-500"
          >
            Register
          </a>
        </form>
      </div>
    </>
  );
}

export default SignupPage;
