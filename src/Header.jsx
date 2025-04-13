import React, {useState, useEffect} from 'react'
import logo from "./asset/logo.png";
import { IoMdLogOut } from "react-icons/io";
import {
  getAuthFromSessionStorage,
  removeAuthFromSessionStorage,
} from "./utils/ls.util";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import Menu from "./Menu";


const Header = () => {
    const [isMenuOpen, setIsmenuOpen] = useState(false);
    const auth = getAuthFromSessionStorage();
    const navigate = useNavigate();

    const handleLogout = () => {
        // logout
        removeAuthFromSessionStorage();
    
        navigate("/login");
      };
  return (
    <div className="Navbar">
    <header className="bg-blue-500 flex flex-row sm:flex-row justify-between items-center p-2 fixed top-0 w-full z-10 h-[3.5rem]">
      {/* Logo section */}
      <div className="logo-section flex items-center justify-center sm:h-full py-2 sm:py-0">
        <img
          src={logo}
          alt="logo"
          className="w-[5rem] h-[30px] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9rem] md:h-[3.5rem] lg:w-[8rem] lg:h-[3rem]"
        />
      </div>

      {/* Flag and logout button */}
      <div className="flex items-center sm:space-x-10 space-x-4 sm:h-full ml-auto mt-0 sm:flex-row flex-row">
        {/* <img src={flag} alt="USA Flag" className="w-[2.6rem] h-[1.4rem]" /> */}
          <button className="text-2xl" onClick={handleLogout}>
            <IoMdLogOut />
          </button>                                       
          <button className="text-2xl" onClick={() => setIsmenuOpen(!isMenuOpen)}>
            <MdMenu />
          </button>                                       
        </div>

        {
          isMenuOpen && <Menu setIsmenuOpen={setIsmenuOpen} />
        }

      </header>

    {/* Navbar2 */}
    <nav className="bg-blue-900 text-white flex flex-grow flex-col items-center p-3 m-0 fixed top-14 w-full" style={{ zIndex: 5 }}>
      <div className="flex flex-wrap justify-between w-full">
        <button className="font-semibold">Home</button>
        <Link to="/fundwallet">
          <button className="font-semibold hidden sm:block">Fund Wallet</button>
        </Link>
        <button className="font-semibold  hidden sm:block">AI</button>
        <Link to="/tokenwallet">
          <button className="font-semibold  hidden sm:block">Token Wallet</button>
        </Link>
        <Link to="/profile">
          <button className="font-semibold relative top-0 group  hidden sm:block">
            Profile
          </button>
        </Link>
      </div>

    </nav>
  </div>
  )
}

export default Header