import { Link, useNavigate } from 'react-router-dom';
import flag from './assets/usaFlag.png';
import { IoMdLogOut } from "react-icons/io";
import { getAuthFromSessionStorage, removeAuthFromSessionStorage, setAuthInSessionStorage } from './utils/ls.util';
import logo from './asset/logo.png'
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { updateUser } from './helper/baseApiCalls';
const BankData = () => {
  const [updateOpen, setIsUpdateOpen] = useState(false)
  const auth = getAuthFromSessionStorage();
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    wallet_address: auth.user.wallet_address || '',
  })

  const {wallet_address} = inputs

  const handleLogout = () => {
    removeAuthFromSessionStorage();
    navigate('/login');
  };

  const handleChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // if(accountNumber.length < 5 || accountNumber !== confirmAccountNumber){
    //   return toast.error('Account numbers do not match.')
    // }

    // if(ifscCode.length < 11){
    //   return toast.error('Invalid IFSC Code')
    // }

    if(wallet_address.length < 5){
      return toast.error('Invalid Wallet Address')
    }

    try {
      const res = await updateUser(auth.user.id, {wallet_address})

      if(res.status !== 200){
        return toast.error("Updation Faild")
      }

      let newUser = {...auth.user, wallet_address}
      let newAuth = {...auth, user: newUser}
      setAuthInSessionStorage(newAuth)

      toast.success('Data Updated Successfully')
      setIsUpdateOpen(false)
      location.reload();
    } catch (error) {
      return toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar1 */}
      <div className="Navbar">
        <header className="bg-blue-500 flex justify-between items-center p-2 pb-3 fixed top-0 w-full z-10">
          <div className="logo-section flex items-center justify-center sm:h-full py-2 sm:py-0">
            <img
              src={logo}
              alt="logo"
              className="w-[5rem] h-[30px] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9rem] md:h-[3.5rem] lg:w-[8rem] lg:h-[3rem]"
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

            <Link to="/profile">
              <button className="font-semibold relative top-0 group">
                Profile
              </button>
            </Link>
          </div>
        </nav>
      </div>

      <main className="pt-36 w-full min-h-screen bg-[url(https://ehsslibrary2.wordpress.com/wp-content/uploads/2014/04/blank-google-plus-background-navy-blue.jpg)]">
        <div className="w-[90%] min-h-[400px] h-max p-4 mx-auto rounded border-amber-500 border bg-[#00000080] shadow-inner">
          <h2 className="text-zinc-100">Bank Details</h2>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full">
              <thead className="w-full bg-zinc-300 border">
                <tr>
                  <th className="border border-zinc-400 text-xs md:text-base">Account Holder Name</th>
                  <th className="border border-zinc-400 text-xs md:text-base">UserId</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Mobile</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Wallet Address</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Action</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-200 w-full text-center text-xs md:text-base">
                <tr className="border">
                  <td className="border border-zinc-400">{auth.user.fullname || '-'}</td>
                  <td className="border border-zinc-400">{auth.user.code || '-'}</td>
                  <td className="border border-zinc-400">{auth.user.mobile || '-'}</td>
                  <td className="border border-zinc-400">{auth.user.wallet_address || '-'}</td>
                  <td className="border border-zinc-400">
                    <h4 onClick={e => setIsUpdateOpen(true)} className="px-1 py-1 rounded bg-amber-700 text-zinc-100 hover:text-zinc-300 cursor-pointer">
                      Update
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
            {
              updateOpen && (
                <div className='w-full h-full fixed top-[60px] left-0 bg-[#00000080] flex items-center justify-center'>
                  <div className='w-[300px] h-max rounded bg-white relative top-0 p-2'>
                    <h1 className='underline font-semibold text-[18px]'>Update Wallet Address</h1>
                    <div onClick={e => setIsUpdateOpen(false)} className='cursor-pointer w-[40px] h-[40px] absolute right-[-15px] top-[-15px] rounded-full bg-rose-500 flex justify-center items-center'> 
                      <CgClose className='text-white text-[20px]' />
                    </div>
                    <form className='mt-4' onSubmit={handleSubmit}>
                      <div className='mt-2'>
                        <label className='w-full' htmlFor="wallet_address">USDT (BP20) Address</label>
                        <input onChange={handleChange} value={wallet_address} name='wallet_address' className='w-full h-[30px] p-2 bg-slate-300 rounded mt-2 outline-none' type="text" placeholder='Type here...' />
                      </div>
                      <button type="submit" className='mt-2 w-full h-[30px] bg-green-600 rounded text-white'>Update Walllet</button>
                    </form>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default BankData;
