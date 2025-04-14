import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthFromSessionStorage, removeAuthFromSessionStorage } from './utils/ls.util';

const Menu = ({setIsmenuOpen = f => f}) => {
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

        <div className="fixed top-0 left-0 w-[240px] h-full bg-sky-900 flex justify-center z-12">
        <div className="p-2 w-full text-left mt-14">
            <Link to="/dashboard">
                <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">Home</button>
            </Link>
            <Link to={`/new-joining/${auth.user.code}`}>
                <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">Add Joining</button>
            </Link>
            <Link to="/fundwallet">
            <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">Fund Wallet</button>
            </Link>
            <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">AI</button>
            <Link to="/tokenwallet">
            <button className="font-semibold w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">Token Wallet</button>
            </Link>
            {/* <Link to="/profile">
            <button className="font-semibold relative top-0 w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2">
                Profile
            </button>
            </Link> */}
            <button className="font-semibold relative top-0 w-full h-[35px] rounded bg-amber-300 mt-2 text-left px-2 group">
                Transactions

                <div className="hidden group-hover:block bg-white text-black w-full rounded-lg shadow-lg absolute top-0 left-0 p-2">
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
                <button className="font-semibold w-full min-h-[35px] h-max rounded bg-amber-300 mt-2 text-left px-2">Token Transfer</button>
            </Link>

            <button onClick={handleLogout} className="font-semibold w-full text-white min-h-[45px] h-max rounded bg-rose-500 mt-6 text-left px-2">Logout</button>
        </div>
        </div>
    </>
  )
}

export default Menu