import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthFromSessionStorage, removeAuthFromSessionStorage } from './utils/ls.util';
import { CgHome } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { FaUser, FaWallet } from 'react-icons/fa6';
import { HiUserAdd } from 'react-icons/hi';
import { IoIosWallet } from 'react-icons/io';
import { GrTransaction } from 'react-icons/gr';
import { FcMoneyTransfer } from 'react-icons/fc';
import { IoLogOut } from 'react-icons/io5';

const Menu = ({setIsmenuOpen = f => f}) => {
    const [isExpandTransaction, expandTransactions] = useState(false)
    const navigate = useNavigate();
    const auth = getAuthFromSessionStorage()

      const handleLogout = () => {
        // logout
        removeAuthFromSessionStorage();
    
        navigate("/login");
      };
  return (
    <>
        <div onClick={e => setIsmenuOpen(false)} className="fixed top-0 left-0 z-0 bg-black w-full h-full opacity-50">

        </div>

        <div className="fixed top-0 left-0 w-[240px] h-full bg-[url(https://static.vecteezy.com/system/resources/thumbnails/006/292/430/small/sci-fi-style-background-with-glowing-effects-abstract-digital-technology-background-free-vector.jpg)] flex justify-center z-12">
        <div className="p-2 w-full text-left mt-14">
            <Link to="/dashboard">
                <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2 flex items-center gap-2"><GoHomeFill /> Home</button>
            </Link>
            <Link to="/profile">
                <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2 flex items-center gap-2"><FaUser /> Profile</button>
            </Link>
            <Link to={`/new-joining/${auth.user.code}`}>
                <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2 flex items-center gap-2"><HiUserAdd /> Add Joining</button>
            </Link>
            <Link to={`/downline/${auth.user.id}`}>
                <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2 flex items-center gap-2"><HiUserAdd /> My Team</button>
            </Link>
            <Link to="/fundwallet">
            <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2 flex items-center gap-2"><FaWallet /> Fund Wallet</button>
            </Link>
            {/* <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">AI</button> */}
            <Link to="/tokenwallet">
            <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2 flex items-center gap-2"><IoIosWallet /> Token Wallet</button>
            </Link>
            {/* <Link to="/profile">
            <button className="font-semibold relative top-0 w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">
                Profile
            </button>
            </Link> */}
            <button onClick={e => expandTransactions(!isExpandTransaction)} className={`font-semibold relative top-0 w-full  ${isExpandTransaction ? "h-max" : "h-[35px] overflow-hidden"} rounded bg-amber-300 mt-2 text-left px-2 group pb-2`}>
                {/* <GrTransaction /> */}
                Transactions

                <div className="bg-white text-black w-full rounded-lg shadow-lg relative p-2 mt-2">
                <div className="flex flex-col space-y-2">
                    <Link to="/credits">
                    <button className="w-full text-left text-sm font-semibold hover:bg-gray-200 px-2 py-1 rounded-lg">Credits</button>
                    </Link>
                    <Link to="/withdrawals">
                    <button className="w-full text-left text-sm font-semibold hover:bg-gray-200 px-2 py-1 rounded-lg">Withdrawals</button>
                    </Link>
                </div>
                </div>
            </button>

            <Link to="/transfer">
                <button className="font-semibold w-full min-h-[35px] h-max rounded bg-amber-300 mt-2 text-left px-2 flex items-center gap-2"><FcMoneyTransfer />ID to ID E-Wallet Transfer</button>
            </Link>

            <button onClick={handleLogout} className="font-semibold w-full text-white min-h-[45px] h-max rounded bg-rose-500 mt-6 text-left px-2 flex items-center gap-2"><IoLogOut /> Logout</button>
        </div>
        </div>
    </>
  )
}

export default Menu