import { Link, useNavigate } from "react-router-dom";
import flag from "./assets/usaFlag.png";
import logo from "./asset/logo.png";
import { IoMdLogOut } from "react-icons/io";
import {
  getAuthFromSessionStorage,
  removeAuthFromSessionStorage,
} from "./utils/ls.util";
import { CgArrowRight, CgUserList } from "react-icons/cg";
import { BsBank } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const Profile = () => {
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
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar1 */}
      <div className="Navbar">
        <header className="bg-blue-500 flex flex-row sm:flex-row justify-between items-center p-2 fixed top-0 w-full z-10 h-[3.5rem]">
          {/* logo section */}
          <div className="logo-section flex items-center justify-center sm:h-full py-2 sm:py-0">
            <img
              src={logo}
              alt="logo"
              className="w-[5rem] h-[30px] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9rem] md:h-[3.5rem] lg:w-[8rem] lg:h-[3rem]"
              onClick={handleLogoClick}
            />
          </div>

          <div className="flex space-x-6 mt-1">
            <img src={flag} alt="USA Flag" className="w-[2.6rem] h-[1.4rem]" />
            <button className="ml-10 text-2xl flex-col" onClick={handleLogout}>
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
            <Link to="/capital">
              <button className="font-semibold">Capital</button>
            </Link>
            <button className="font-semibold">AI</button>
            <Link to="/invest">
              <button className="font-semibold">Invest</button>
            </Link>
            <Link to="/profile">
              <button className="font-semibold relative top-0 group">
                Profile
              </button>
            </Link>
          </div>
        </nav>
      </div>

      <main className="pt-36 w-full min-h-screen bg-[url(https://www.networkworld.com/wp-content/uploads/2025/01/3609889-0-66260200-1738008392-AI-networking-2-1.jpg?quality=50&strip=all)]">
        <div className="w-[90%] h-[150px] mx-auto rounded border-amber-500 border bg-[#00000080] shadow-inner flex items-center justify-between px-[40px]">
          <img
            src={`https://avatar.iran.liara.run/public?username=${auth.user.username}`}
            className="h-[100px]"
            alt="avatar"
          />
          <div>
            <h1 className="text-white text-[24px] text-sm md:text-base">
              Username: {auth.user.username}
            </h1>
            <h2 className="text-white text-[16px] text-sm md:text-base">
              Email: {auth.user.email}
            </h2>
            <h2 className="text-white text-[16px] text-sm md:text-base">
              Rank - Code: {auth.user.rank} - {auth.user.code}
            </h2>
          </div>
        </div>

        <div className="w-[90%] h-[150px] mx-auto">
          <Link to={`/downline/${auth.user.id}`}>
            <div className="w-full h-[50px] mt-[30px] px-4 group rounded border-amber-500 border bg-[#00000090] shadow-inner flex items-center justify-between">
              <CgUserList className="text-white text-[24px]" />
              <h3 className="text-white text-[24px] group-hover:text-amber-400">
                Team
              </h3>
              <CgArrowRight className="text-white text-[24px] cursor-pointer" />
            </div>
          </Link>

          <Link to={`/transactions/${auth.user.id}`}>
            <div className="w-full h-[50px] mt-[30px] px-4 group rounded border-amber-500 border bg-[#00000090] shadow-inner flex items-center justify-between">
              <BsBank className="text-white text-[24px]" />
              <h3 className="text-white text-[24px] group-hover:text-amber-400">
                Transactions
              </h3>
              <CgArrowRight className="text-white text-[24px] cursor-pointer" />
            </div>
          </Link>

          <Link to={`/profile/bank`}>
            <div className="w-full h-[50px] mt-[30px] px-4 group rounded border-amber-500 border bg-[#00000090] shadow-inner flex items-center justify-between">
              <BsBank className="text-white text-[24px]" />
              <h3 className="text-white text-[24px] group-hover:text-amber-400">
                Withdrawal Address
              </h3>
              <CgArrowRight className="text-white text-[24px] cursor-pointer" />
            </div>
          </Link>

          <div
            onClick={handleLogout}
            className="w-full h-[50px] mt-[30px] px-4 group cursor-pointer rounded border-amber-500 border bg-[#00000090] shadow-inner flex items-center justify-between"
          >
            <BiLogOut className="text-rose-600 text-[24px]" />
            <h3 className="text-white text-[24px] group-hover:text-rose-400">
              Signout
            </h3>
            {/* <CgArrowRight className='text-white text-[24px] cursor-pointer' /> */}
            <div className="w-1 h-1"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
