import { useEffect, useState } from "react";
import flag from "./assets/usaFlag.png";
import logo from "./asset/logo.png";
import { IoMdLogOut } from "react-icons/io";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  getAuthFromSessionStorage,
  removeAuthFromSessionStorage,
} from "./utils/ls.util";
import { Link, useNavigate } from "react-router-dom";
import WithdrawalPopup from "./WithdrawalPopup";
import { MdMenu } from "react-icons/md";
import Menu from "./Menu";
import bg from './asset/background.jpg'
function Dashboard() {
  const [currentUser, setCuerrentUser] = useState(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isMenuOpen, setIsmenuOpen] = useState(false);
  const auth = getAuthFromSessionStorage();
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout
    removeAuthFromSessionStorage();

    navigate("/login");
  };

  const handleCopy = () => {
    const input = document.querySelector("#referral-input"); // targeting the input field by ID
    input.select(); // Select the content inside the input box
    document.execCommand("copy"); // Execute the copy command
    alert("Copied to clipboard!"); 
  };

  useEffect(() => {
    if (auth) {
      setCuerrentUser(auth.user);
    } else {
      // redirect
      navigate("/login");
    }
  }, [ navigate]);
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar1 */}
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
          <div className="dep-wid grid grid-cols-2 gap-4 w-full mt-4 sm:grid-cols-2 md:grid-cols-2">
            <Link to="/deposit">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full font-semibold">
                Deposit
              </button>
            </Link>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg w-full font-semibold"
              onClick={() => setIsWithdrawOpen(true)}
            >
              Withdrawal
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="pt-36 bg-fixed bg-center bg-[url(https://cdn.pixabay.com/photo/2021/10/01/12/44/abstract-6672383_1280.jpg)]">
        {/* Referral Link section starts */}
        <div className="p-4 rounded-lg w-full md:w-[calc(100%-2rem)] mx-auto">

          {/* boxes */}
          <div className="relative w-full flex items-center mt-2 justify-between bg-white rounded-lg p-2">
            {/* Input Box */}
            <input
              id="referral-input"
              className="border border-gray-300 px-2 py-1 w-full rounded-lg h-14 text-gray-600 pr-12 text-sm md:text-base"
              value={`${
                import.meta.env.VITE_FRONTEND_URL
              }/ih/register?sponsorId=${currentUser?.code}`}
              readOnly
            />
            {/* Icon Container */}
            <div className="absolute flex items-center justify-center right-4 sm:space-x-4">
              {/* Copy Icon */}
              <FaRegCopy
                className="text-gray-600 text-lg cursor-pointer"
                onClick={handleCopy} 
              />
              {/* WhatsApp Icon */}
              <a
                className="bg-white text-lg"
                href="https://wa.me/917777777777"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareWhatsapp className="text-gray-600 text-xl cursor-pointer" />
              </a>
            </div>
          </div>
        </div>

        {/* below section */}
        <div className="flex gap-4 p-4 flex-col sm:flex-row">
          {/* User Details Section - on the left side */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-700 shadow-md p-4 rounded-lg flex-col items-center justify-between w-[90%] mx-auto sm:w-1/3 h-[250px] sm:h-[300px]">
            <div className="flex justify-between">
              <CgProfile className="text-3xl ml-4" />
              <div className="flex-col">
                <p className="font-bold text-white">USER ID</p>
                <p className="text-white">{currentUser?.rank + "-" + currentUser?.code}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <h3 className="text-lg font-semibold text-white ml-4">
                {currentUser?.fullname || currentUser?.username}
              </h3>
              <p className="text-gray-100 mr-8">India</p>
            </div>
          </div>
          {/* user section ends */}

          {/* Details Section starts */}
          <div className="flex flex-col gap-4 w-full sm:w-2/3 pr-5 pl-3">
            {/* 1st row of wallet */}
            <h1 className="text-xl text-yellow-400 font-semibold">
              Wallet Details
            </h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Fund Wallet
                </h3>
                <p className="text-2xl font-bold text-white">
                  ${ 100 || auth.user.wallet_balance}
                </p>
              </div>

              <div className="bg-gradient-to-br from-rose-400 to-rose-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Staking Wallet
                </h3>
                <p className="text-2xl font-bold text-gray-100">{auth.user.staking_wallet || 40000.00} </p>
              </div>

              <div className="bg-gradient-to-br from-sky-400 to-sky-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Token Wallet
                </h3>
                <p className="text-2xl font-bold text-gray-100">{auth.user.token_wallet || 40000.00}</p>
              </div>
            </section>
            {/* Team Section Ends*/}

            {/* row1 */}
            <h1 className="text-xl text-yellow-400 font-semibold">
              Team Details
            </h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  My Total Team
                </h3>
                <p className="text-2xl font-bold text-gray-100">131</p>
              </div>

              <div className="bg-gradient-to-br from-amber-400 to-amber-400 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  My Direct Team
                </h3>
                <p className="text-2xl font-bold text-gray-100">5</p>
              </div>

              <div className="bg-gradient-to-br from-amber-600 to-amber-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  My Linked Team
                </h3>
                <p className="text-2xl font-bold text-gray-100">126</p>
              </div>
            </section>

            {/* Bonus Section Starts */}
            <h1 className="text-xl text-yellow-400 font-semibold">
              Bonus Details
            </h1>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gradient-to-br from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Referral Benefit
                </h3>
                <p className="text-2xl font-bold text-gray-100">2000.00</p>
              </div>

              <div className="bg-gradient-to-tl from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Team Benefit
                </h3>
                <p className="text-2xl font-bold text-gray-100">00.00</p>
              </div>

              <div className="bg-gradient-to-br from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Daily Reward
                </h3>
                <p className="text-2xl font-bold text-gray-100">00.00</p>
              </div>
            </section>
            {/* Bonus Section Ends */}

            {/* row2 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gradient-to-r from-rose-400 to-red-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Total Withdrawl
                </h3>
                <p className="text-2xl font-bold text-gray-100">00.00</p>
              </div>

              <div className="bg-gradient-to-br from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Total Bonus
                </h3>
                <p className="text-2xl font-bold text-gray-100">00.00</p>
              </div>

            </section>
            {/* summary of trading ends*/}
          </div>
          {/* details section ends */}
        </div>
      </main>
      {isWithdrawOpen && (
        <WithdrawalPopup setIsWithdrawOpen={setIsWithdrawOpen} />
      )}
    </div>
  );
}

export default Dashboard;
