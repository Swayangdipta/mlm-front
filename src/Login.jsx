import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./asset/logo.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { login, loginAdmin } from "./helper/baseApiCalls";
import {
  getAuthFromSessionStorage,
  setAuthInSessionStorage,
} from "./utils/ls.util";
import PropTypes from "prop-types";

function Login({ isAdmin }) {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  }

  const handleSignUpButtonClick = () => {
    navigate("/signup");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuthFromSessionStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      let response;
      if (isAdmin) {
        response = await loginAdmin({ username, password });
      } else {
        response = await login({ username, password });
      }

      if (response.status === 200) {
        setAuthInSessionStorage(response.data);
        navigate(isAdmin ? "/admin" : "/Dashboard");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid ID or Password");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <div className="flex flex-col  min-h-screen bg-[rgba(0,0,0,0.75)]">

          <header className="flex justify-between items-center py-4 px-8 bg-[#013a63]">
            <div className="logo-section">
              <img
                src={logo}
                alt="logo"
                className="w-[6rem] h-[2.5rem] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9.5rem] md:h-[4rem] lg:w-[12rem] lg:h-[5rem]"
                onClick={handleLogoClick}
              />
            </div>
    
    
            {/* Sign In / Sign Up Buttons */}
            <div className="sign-buttons space-x-4 ml-4 flex items-center">
              <Link to="/login">
                <button
                  className="relative px-2 py-2 h-10 text-white sm:h-12 w-24 sm:w-32 md:w-40 text-[12px] sm:text-lg font-semibold bg-black border-4 border-t-blue-700 border-l-blue-700 border-b-blue-500 border-r-blue-500 rounded-3xl flex justify-center items-center transition-all duration-300
              before:absolute before:inset-0 before:rounded-3xl before:border-4 before:border-t-blue-500 before:border-l-blue-500 before:border-b-blue-700 before:border-r-blue-700 before:content-[''] hover:bg-blue-500"
                  onClick={handleLoginButtonClick}
                >
                  Sign In
                </button>
              </Link>
    
              <Link to="/register">
                <button
                  className="relative px-2 text-white py-2 h-10 sm:h-12 w-24 sm:w-32 md:w-40 text-[12px] sm:text-lg font-semibold bg-black border-4 border-t-green-700 border-l-green-700 border-b-green-500 border-r-green-500 rounded-3xl flex justify-center items-center transition-all duration-300
              before:absolute before:inset-0 before:rounded-3xl before:border-4 before:border-t-green-500 before:border-l-green-500 before:border-b-green-700 before:border-r-green-700 before:content-[''] hover:bg-green-500"
                  onClick={handleSignUpButtonClick}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </header>
      
      <div
        className="bg-zinc-800 p-6 mt-6 rounded-md relative z-20 w-[90%] sm:w-[70%] md:w-[34rem] max-w-md mx-auto"
        style={{
          boxShadow:
            "0px 10px 30px rgba(0, 0, 0, 0.7), " + // Darker bottom-right shadow for raised effect
            "0px -10px 30px rgba(255, 255, 255, 0.2), " + // Lighter top-left for raised effect
            "10px 0px 30px rgba(0, 0, 0, 0.3), " + // Darker left shadow for depth (similar to bottom-right)
            "0px 10px 30px rgba(0, 0, 0, 0.3), " + // Slight shadow on right/bottom
            "0px -10px 30px rgba(255, 255, 255, 0.2), " + // Slight light effect on top/left
            "-10px 0px 30px rgba(255, 255, 255, 0.2), " + // Lighter left side glow
            "10px 0px 30px rgba(0, 0, 0, 0.7)", // Darker right shadow (similar to bottom)
        }}
      >        
          <div className="logo-section rounded-3xl flex justify-center mb-6">
            <img
              src={logo}
              alt="logo"
              className="w-40 h-20 bg-slate-100 rounded-3xl"
            />
          </div>
        
        <br />
        <br />
        <h2 className="text-2xl font-strong mb-2 mt-0 text-center text-white">
          Sign In
        </h2>
        <p className="flex justify-center text-white">
          Enter your Login ID and password to access your account.
        </p>

        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 pt-6">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              style={{
                boxShadow:
                  "inset 0px 4px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on top (pressed effect)
                  "inset 0px -4px 8px rgba(255, 255, 255, 0.2), " + // Lighter bottom shadow (soft glow)
                  "inset 4px 0px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on the left (pressed effect)
                  "inset -4px 0px 8px rgba(255, 255, 255, 0.2)", // Lighter right shadow (soft glow)
              }}
              placeholder="Enter User Id"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              style={{
                boxShadow:
                  "inset 0px 4px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on top (pressed effect)
                  "inset 0px -4px 8px rgba(255, 255, 255, 0.2), " + // Lighter bottom shadow (soft glow)
                  "inset 4px 0px 8px rgba(0, 0, 0, 0.6), " + // Darker shadow on the left (pressed effect)
                  "inset -4px 0px 8px rgba(255, 255, 255, 0.2)", // Lighter right shadow (soft glow)
              }}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3"
            >
              {passwordVisible ? (
                <MdVisibilityOff className="text-xl" />
              ) : (
                <MdVisibility className="text-xl" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-52 h-12 bg-pink-600 text-white text-center py-2 rounded-e-3xl rounded-ss-3xl flex items-center justify-center mx-auto"
          >
            <TbLogin2 className="mr-1" /> Login
          </button>

          <div className="flex sm:flex-row justify-between pt-3 space-x-10">
            <div className="mt-4 text-center text-emerald-400">
              <Link to="/register" className="hover:underline font-normal">
                Join Here
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/forgot-pass"
                className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

Login.propTypes = {
  isAdmin: PropTypes.bool,
};

Login.defaultProps = {
  isAdmin: false,
};

export default Login;
