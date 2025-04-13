import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import flag from './assets/usaFlag.png';
import logo from "./asset/logo.png";
import { IoMdLogOut } from "react-icons/io";
import { getAuthFromSessionStorage, removeAuthFromSessionStorage } from './utils/ls.util';
import { toast } from 'react-toastify';
import { createInvestment } from './helper/baseApiCalls';

const Invest = () => {
    const [currentBalance, setCurrentBalance] = React.useState(0)
    const [amount, setAmount] = React.useState('10')
    const [userCode, setUserCode] = React.useState('')
    const auth = getAuthFromSessionStorage()
    const navigate = useNavigate()

    const handleLogoClick = () => {
      navigate("/dashboard");
    }

    const handleLogout = () => {
      // logout
      removeAuthFromSessionStorage()
  
      navigate('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(amount > auth.user.wallet_balance) {
            toast('Insufficient funds')
            return
        }
        
        try {
            // make api call
            const response = await createInvestment({
                amount,
                user: userCode
            })

            if (response.status === 200) {
                toast('Investment successful')
                // after success update the wallet_balance from the auth object in session storage
                auth.user.wallet_balance -= amount
                sessionStorage.setItem('auth', JSON.stringify(auth))
                setCurrentBalance(auth.user.wallet_balance -= amount)
                return
            }

            toast(response.response.data.message)
        } catch (error) {
            toast('An error occurred. Please try again later.')
        }
    }

    useEffect(() => {   
        if (!auth) {
            navigate('/login')
        }

        setUserCode(auth.user.code)
        setCurrentBalance(auth.user.wallet_balance)
    }, [auth, navigate])
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
            <Link to='/dashboard'><button className="font-semibold">Home</button></Link>

            <Link to='/profile'><button className="font-semibold relative top-0 group">
              Profile  
            </button>
            </Link>
          </div>
        </nav>
      </div>

      <main className="pt-36 w-full min-h-screen bg-[url(https://ehsslibrary2.wordpress.com/wp-content/uploads/2014/04/blank-google-plus-background-navy-blue.jpg)]">
            <div className='w-[300px] min-h-[150px] h-max mx-auto rounded border-amber-500 border bg-[#00000080] shadow-inner flex  flex-col items-left justify-center gap-30 p-[20px]'>
                <h1 className='text-white text-[24px]'>Tokens ( AIDAM )</h1>
                <h2 className='text-white text-[24px]'>{currentBalance} <span className='text-[18px]'>tokens</span></h2>
            </div>
      </main>
    </div>
  )
}

export default Invest