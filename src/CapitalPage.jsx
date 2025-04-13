import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import flag from "./assets/usaFlag.png";
import logo from "./asset/logo.png";
import { IoMdLogOut } from "react-icons/io";
import {
  getAuthFromSessionStorage,
  removeAuthFromSessionStorage,
} from "./utils/ls.util";
import { getTotalInvestment } from "./helper/baseApiCalls";
import { toast } from "react-toastify";

const CapitalPage = () => {
  const [totalInvestment, setTotalInvestment] = React.useState(0);
  const auth = getAuthFromSessionStorage();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/dashboard");
  }

  const handleLogout = () => {
    // logout
    removeAuthFromSessionStorage();

    navigate("/login");
  };

  const fetchTotalInvestment = async () => {
    try {
      const response = await getTotalInvestment({ user: auth.user.id });

      if (response.status === 200) {
        setTotalInvestment(response.data.total);
        return;
      }

      toast("Error fetching capital");
    } catch (error) {
      toast("Error fetching capital");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }

    fetchTotalInvestment();
  }, [auth, navigate]);
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar1 */}
      <div className="Navbar">
        <header className="bg-blue-500 flex flex-row sm:flex-row justify-between items-center p-2 fixed top-0 w-full z-10 h-[3.5rem]">
          {/* Logo section */}
          <div className="logo-section flex items-center justify-center sm:h-full py-2 sm:py-0">
            <img
              src={logo}
              alt="logo"
              className="w-[5rem] h-[30px] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9rem] md:h-[3.5rem] lg:w-[8rem] lg:h-[3rem]"
              onClick={handleLogoClick}
            />
          </div>

          {/* Flag and logout button */}
          <div className="flex items-center sm:space-x-10 space-x-4 sm:h-full ml-auto mt-0 sm:flex-row flex-row">
            <img src={flag} alt="USA Flag" className="w-[2.6rem] h-[1.4rem]" />
            <button className="text-2xl" onClick={handleLogout}>
              <IoMdLogOut />
            </button>
          </div>
        </header>
        {/* Navbar2 */}
        <nav className="bg-blue-900 text-white flex flex-col items-center p-3 m-0 fixed top-14 w-full z-10">
          <div className="flex space-x-4 w-full justify-between">
            <Link to="/dashboard">
              <button className="font-semibold">Home</button>
            </Link>

            <Link to="/profile">
              <button className="font-semibold relative top-0 group">
                Profile
              </button>
            </Link>
          </div>
        </nav>
      </div>

      <main className="pt-36 w-full min-h-screen bg-[url(https://ehsslibrary2.wordpress.com/wp-content/uploads/2014/04/blank-google-plus-background-navy-blue.jpg)]">
        <div className="w-[300px] h-[150px] mx-auto rounded border-amber-500 border bg-[#00000080] shadow-inner flex  flex-col items-center justify-center gap-30 px-[40px]">
          <h1 className="text-white text-[20px]">Fund</h1>
          <h2 className="text-white text-[24px]">${totalInvestment}</h2>
        </div>
      </main>
    </div>
  );
};

export default CapitalPage;
