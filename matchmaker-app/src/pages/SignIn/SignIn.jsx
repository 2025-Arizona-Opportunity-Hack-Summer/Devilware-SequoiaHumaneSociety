import React, { useState } from "react";
import googleLogo from "../../assets/images/GOOGLE.png";
import cat from "./sittingcat.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const mobileStyle = {
    borderRadius: "24px",
    boxShadow: "0px 4px 20px 15px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div className="sign-in relative">
      {/* MOBILE VIEW */}
      <div className="md:hidden fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm" style={mobileStyle}>
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 tracking-wider mb-2">WELCOME!</h1>
              <div className="w-full h-px bg-gray-300 mb-2"></div>
              <p className="text-gray-500 text-sm">Log in with email</p>
            </div>
            {/* Form elements for mobile */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 rounded"
                />
                <span className="text-sm text-gray-700">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-[#7c0f0f] hover:text-[#4F1818]">
                Forgot password?
              </a>
            </div>
            <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 font-medium mb-4">
              Continue
            </button>
            <p className="text-center text-sm text-gray-700 mb-4">
              Don't have an account?{" "}
              <a href="#" className="text-[#7c0f0f] hover:text-[#4F1818]">
                Sign up here.
              </a>
            </p>
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200 font-medium flex items-center justify-center">
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}

      <div className="hidden md:flex mt-20 justify-end">
        <div className="relative w-[75vw] h-[75vh] max-w-screen-lg max-h-[54rem] min-h-[600px] bg-white rounded-tl-2xl shadow-2xl flex items-center justify-center p-8 z-30">
          {/* Cat Image positioned absolutely to the left of the form */}
          <img
            src={cat}
            alt="Decorative Cat"
            className="absolute top-2/3 left-0 -translate-1/2 w-xl h-xl object-cover z-50"
          />

          {/* Inner container for the form content (unchanged) */}
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 tracking-wider mb-2">WELCOME!</h1>
              <div className="w-full h-px bg-gray-300 mb-2"></div>
              <p className="text-gray-500 text-base">Log in with email</p>
            </div>

            {/* Form Inputs (unchanged) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Controls and Links (unchanged) */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 rounded"
                />
                <span className="text-sm text-gray-700">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-[#7c0f0f] hover:text-[#4F1818]">
                Forgot password?
              </a>
            </div>
            <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 font-medium mb-4">
              Continue
            </button>
            <p className="text-center text-sm text-gray-700 mb-4">
              Don't have an account?{" "}
              <a href="" className="text-[#7c0f0f] hover:text-[#4F1818]">
                Sign up here.
              </a>
            </p>
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200 font-medium flex items-center justify-center">
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
