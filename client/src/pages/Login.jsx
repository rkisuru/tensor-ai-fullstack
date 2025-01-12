import React from "react";
import github from "../assets/github.png";
import google from "../assets/google.png";
import logo from "../assets/tensor-logo.png";

const Login = () => {
  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const githubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 w-[400px] h-[500px] mx-auto">
        <div className="p-4 sm:p-7">
          <img className="block w-16 mx-auto" src={logo} alt="logo" />
          <div className="text-center mt-5">
            <h1 className="text-gray-800 text-3xl font-bold dark:text-white">
              Welcome to <span className="text-blue-800">Tensor-AI</span>
            </h1>
          </div>
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white mt-10">
              Sign in
            </h1>
          </div>

          <div className="mt-5">
            <button
              onClick={googleLogin}
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <img
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
                src={google}
              />
              Sign in with Google
            </button>
          </div>
          <div className="mt-5">
            <button
              onClick={githubLogin}
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <img
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
                src={github}
              />
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
