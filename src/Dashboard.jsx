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
import { getTotalTeamBusiness, getUserData, getUserDownline } from "./helper/baseApiCalls";
import { toast } from "react-toastify";
import { IoCopy } from "react-icons/io5";
import ActivatePack from "./ActivatePack";
function Dashboard() {
  const [currentUser, setCuerrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isMenuOpen, setIsmenuOpen] = useState(false);
  const [isActivatePAckOpen, setIsActivatePackOpen] = useState(false);
  const [lengths, setLengths] = useState({
    direct: 0,
    linked: 0,
    total: 0,
    referral_wallet: 0
  });

  const [teamBusiness, setTeamBusiness] = useState(0)
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
      navigate("/login");
    }
  }, [ navigate]);

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await getUserData(auth.user.id)
      
      if(res.status !== 200){
        toast.error(res.message || res.data.message)
        return
      } 

      setUserData(res.data)
    }

    const fetchDownline = async () =>{
      const res = await getUserDownline(auth.user.id)
      
      if(res.status !== 200){
        toast.error(res.message || res.data.message)
        return
      } 

      const data = res.data

      setLengths({total: data.length})
    }

    if(auth && auth.user){
      fetchUser()
      fetchDownline()
    }
  },[])

  useEffect(()=>{
    (async () => {
      const res = await getTotalTeamBusiness(auth.user.id)

      if(res.status !== 200){
        toast.error(res.message || res.data.message)
        return
      } 

      setTeamBusiness(res.data.totalBusiness)
    })()
  },[])

  useEffect(()=>{
    if(userData){

      if(userData.referrals){
        setLengths({...lengths, direct: userData.referrals.length})
      }   
      
      if(userData.referral_wallet){
        setLengths({...lengths, referral_wallet: userData.referral_wallet})
      }
    }
  },[userData])
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
              <button className="text-2xl text-rose-300" onClick={handleLogout}>
                <IoMdLogOut />
              </button>                                       
              <button className="text-2xl text-white" onClick={() => setIsmenuOpen(!isMenuOpen)}>
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
            {/* <button className="font-semibold  hidden sm:block">AI</button> */}
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
          <div className="relative w-full flex items-center mt-2 justify-between bg-green-300 rounded-lg p-2">
            {/* Input Box */}
            <input
              id="referral-input"
              className="border border-gray-300 bg-green-500 px-2 py-1 w-full rounded-lg h-14 text-white pr-12 text-sm md:text-base"
              value={`${
                import.meta.env.VITE_FRONTEND_URL
              }/ih/register/${currentUser?.code}`}
              readOnly
            />
            {/* Icon Container */}
            <div className="absolute flex items-center justify-center right-4 sm:space-x-4">
              {/* Copy Icon */}
              <IoCopy
                className="text-white cursor-pointer text-[24px]"
                onClick={handleCopy}
              />
              {/* WhatsApp Icon */}
              <a
                className="text-lg"
                href={`https://wa.me/?text=Check%20out%20this%20referral%20link:%20${encodeURIComponent(`${
                import.meta.env.VITE_FRONTEND_URL
              }/ih/register/${currentUser?.code}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareWhatsapp className="text-white text-[26px] cursor-pointer" />
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
                <p className="text-white">{currentUser?.code}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <h3 className="text-lg font-semibold text-white ml-4">
                {currentUser?.fullname || currentUser?.username}
              </h3>
              <p className="text-gray-100 flex flex-col items-end">{currentUser?.country || 'India'}

                <p className={`px-4 py-2 rounded mt-4 text-white font-bold ${currentUser?.status === 'active' ? 'bg-green-600' : 'bg-red-700'} `} >{currentUser?.status.toUpperCase()}</p>
              </p>
            </div>

            <div className="w-full self-stretch h-[45px] mt-[40px] flex items-center justify-between rounded">
              {
                auth.user.redeem_wallet && parseFloat(auth.user.redeem_wallet).toFixed(3) > 100 * 400 && (
                  <button onClick={e => setIsActivatePackOpen(true)} className="w-full h-full text-center rounded bg-white shadow-custom shadow-purple-700 hover:shadow-none duration-300 font-semibold group"><span className="animate-pulse group-hover:animate-none">Activate Pack Now.</span></button>
                )
              }
            </div>
          </div>

          {
            isActivatePAckOpen && (
              <ActivatePack data={auth.user} setIsActivatePackOpen={setIsActivatePackOpen} />
            )
          }
          {/* user section ends */}

          {/* Details Section starts */}
          <div className="flex flex-col gap-4 w-full sm:w-2/3 pr-5 pl-3">
            {/* 1st row of wallet */}
            <h1 className="text-xl text-yellow-400 font-semibold p-2 rounded bg-slate-800">
              Wallet Details
            </h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to='/fundwallet'>
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Fund Wallet
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    ${auth.user.wallet_balance || 0}
                  </p>
                </div>             
              </Link>

              <div className="bg-gradient-to-br from-rose-400 to-rose-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Staking Wallet
                </h3>
                <p className="text-2xl font-bold text-gray-100">{auth.user.staking_wallet} </p>
              </div>

              <Link to='/tokenwallet'>
                <div className="bg-gradient-to-br from-sky-400 to-sky-600 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Token Wallet
                  </h3>
                  <p className="text-2xl font-bold text-gray-100">{auth.user.token_wallet}</p>
                </div>              
              </Link>

              <Link to='/redeemwallet'>
                <div className="bg-gradient-to-br from-sky-400 to-sky-600 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Redeem Wallet
                  </h3>
                  <p className="text-2xl font-bold text-gray-100">{auth.user.redeem_wallet ? parseFloat(auth.user.redeem_wallet).toFixed(3) : 0}</p>
                </div>              
              </Link>

              <Link to={`/team-business/${auth.user.id}`}>
                <div className="bg-gradient-to-br from-sky-400 to-sky-600 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Team Business
                  </h3>
                  <p className="text-2xl font-bold text-gray-100">{parseFloat(teamBusiness).toFixed(3)}</p>
                </div>              
              </Link>

            </section>
            {/* Team Section Ends*/}

            {/* row1 */}
            <h1 className="text-xl text-yellow-400 font-semibold p-2 rounded bg-slate-800">
              Team Details
            </h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <Link to={`/downline/${auth.user.id}`}>
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    My Total Team
                  </h3>
                  <p className="text-2xl font-bold text-gray-100">{lengths.total}</p>
                </div>
              </Link>

              <Link to={`/downline/direct/${auth.user.id}`}>
                <div className="bg-gradient-to-br from-amber-400 to-amber-400 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    My Direct Team
                  </h3>
                  <p className="text-2xl font-bold text-gray-100">{userData && userData.referrals.length}</p>
                </div>              
              </Link>
            </section>

            {/* Bonus Section Starts */}
            <h1 className="text-xl text-yellow-400 font-semibold p-2 rounded bg-slate-800">
              Bonus Details
            </h1>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Link to='/referral-benefit'>
                <div className="bg-gradient-to-br from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Referral Benefit
                  </h3>
                  <p className="text-2xl font-bold text-gray-100">{userData && userData.referral_wallet}</p>
                </div>
              </Link>

              <Link to='/credits/team'>
              <div className="bg-gradient-to-tl from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Team Benefit
                </h3>
                <p className="text-2xl font-bold text-gray-100">{userData?.team_rewards.toFixed(2)}</p>
              </div>
              </Link>
              <Link to='/credits/daily'>
                <div className="bg-gradient-to-br from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Daily Reward
                  </h3>
                  <p className="text-2xl font-bold text-gray-100">{userData && userData.daily_rewards.toFixed(2)}</p>
                </div>
              </Link>
            </section>
            {/* Bonus Section Ends */}

            {/* row2 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Link to='/withdrawals'>
              <div className="bg-gradient-to-r from-rose-400 to-red-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Total Withdrawl
                </h3>
                <p className="text-2xl font-bold text-gray-100">
                  {parseFloat(userData?.withdrawals.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)).toFixed(2)}
                </p>
              </div>
              </Link>

              <div className="bg-gradient-to-br from-green-400 to-green-600 shadow-md p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Total Bonus
                </h3>
                <p className="text-2xl font-bold text-gray-100">
                  {
                    (parseFloat(userData?.daily_rewards) + parseFloat(userData?.monthly_rewards) + parseFloat(userData?.lifetime_rewards) + parseFloat(userData?.referral_wallet) + parseFloat(userData?.team_rewards)).toFixed(2)
                  }
                </p>
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
