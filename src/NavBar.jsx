import { Link, useNavigate } from "react-router-dom";
import logo from "./asset/logo.png";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleSignUpButtonClick = () => {
    navigate("/signup");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="flex justify-between items-center py-4 px-8 bg-[#013a63]">
        <div className="logo-section">
          <img
            src={logo}
            alt="logo"
            className="w-[6rem] h-[2.5rem] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9.5rem] md:h-[4rem] lg:w-[12rem] lg:h-[5rem]"
            onClick={handleLogoClick}
          />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white text-2xl ml-4 order-last"
          onClick={handleMenuToggle}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? "X" : "☰"}
        </button>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home">
            <button className="border-4 rounded-3xl h-10 sm:h-12 w-20 sm:w-24 md:w-28 lg:w-32 hover:scale-110 hover:shadow-lg transition-all duration-300">
              Home
            </button>
          </a>
          <a href="#company">
            <button className="border-4 rounded-3xl h-10 sm:h-12 w-20 sm:w-24 md:w-28 lg:w-32 hover:scale-110 hover:shadow-lg transition-all duration-300">
              Company
            </button>
          </a>
          <a href="#features">
            <button className="border-4 rounded-3xl h-10 sm:h-12 w-20 sm:w-24 md:w-28 lg:w-32 hover:scale-110 hover:shadow-lg transition-all duration-300">
              Features
            </button>
          </a>
          <a href="#opportunities">
            <button className="border-4 rounded-3xl h-10 sm:h-12 w-20 sm:w-24 md:w-28 lg:w-32 hover:scale-110 hover:shadow-lg transition-all duration-300">
              Opportunities
            </button>
          </a>
        </nav>

        {/* Sign In / Sign Up Buttons */}
        <div className="sign-buttons space-x-4 ml-4 flex items-center">
          <Link to="/login">
            <button
              className="relative px-2 py-2 h-10 sm:h-12 w-24 sm:w-32 md:w-40 text-[12px] sm:text-lg font-semibold bg-black border-4 border-t-blue-700 border-l-blue-700 border-b-blue-500 border-r-blue-500 rounded-3xl flex justify-center items-center transition-all duration-300
        before:absolute before:inset-0 before:rounded-3xl before:border-4 before:border-t-blue-500 before:border-l-blue-500 before:border-b-blue-700 before:border-r-blue-700 before:content-[''] hover:bg-blue-500"
              onClick={handleLoginButtonClick}
            >
              Sign In
            </button>
          </Link>

          <Link to="/register">
            <button
              className="relative px-2 py-2 h-10 sm:h-12 w-24 sm:w-32 md:w-40 text-[12px] sm:text-lg font-semibold bg-black border-4 border-t-green-700 border-l-green-700 border-b-green-500 border-r-green-500 rounded-3xl flex justify-center items-center transition-all duration-300
        before:absolute before:inset-0 before:rounded-3xl before:border-4 before:border-t-green-500 before:border-l-green-500 before:border-b-green-700 before:border-r-green-700 before:content-[''] hover:bg-green-500"
              onClick={handleSignUpButtonClick}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Mobile Menu (Sidebar) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="menu p-4 w-56 min-h-full bg-[#013a63] text-white">
            <div className="flex justify-stretch items-center pb-5">
              <p className="text-xl font-bold">
                {" "}
                <span className=" text-blue-500">Menu</span>{" "}
                <span className="text-green-500">Bar</span>
              </p>
              <button
                onClick={handleMenuToggle}
                className="text-white text-right text-xl ml-20 "
                aria-label="Close Menu"
              >
                <RxCross2 />
              </button>
            </div>
            <hr />

            <ul className="menu flex flex-col space-y-6 mt-6 py-4">
              <li>
                <a href="#home">
                  <button className="border-4 rounded-3xl h-12 sm:h-14 w-32 sm:w-36 lg:w-40 hover:scale-110 hover:shadow-lg transition-all duration-300">
                    Home
                  </button>
                </a>
              </li>
              <li>
                <a href="#company">
                  <button className="border-4 rounded-3xl h-12 sm:h-14 w-32 sm:w-36 lg:w-40 hover:scale-110 hover:shadow-lg transition-all duration-300">
                    Company
                  </button>
                </a>
              </li>
              <li>
                <a href="#features">
                  <button className="border-4 rounded-3xl h-12 sm:h-14 w-32 sm:w-36 lg:w-40 hover:scale-110 hover:shadow-lg transition-all duration-300">
                    Features
                  </button>
                </a>
              </li>
              <li>
                <a href="#opportunities">
                  <button className="border-4 rounded-3xl h-12 sm:h-14 w-32 sm:w-36 lg:w-40 hover:scale-110 hover:shadow-lg transition-all duration-300">
                    Opportunities
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
