import React, { useEffect } from 'react'
import { FaSignOutAlt, FaUpload, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthFromSessionStorage, removeAuthFromSessionStorage } from './utils/ls.util'
import payment_method from './asset/Payment_Method.jpeg'
import { createDeposit, getMyPendingDeposits } from './helper/baseApiCalls'
import { RiLoader3Line, RiProgress1Fill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import logo from './asset/logo.png'
const DepositPage = () => {
    const [amount,setAmount] = React.useState('')
    const [receipt,setReceipt] = React.useState(null)
    const [isLoading,setIsLoading] = React.useState(false)
    const [pendingDeposits,setPendingDeposits] = React.useState([])
    const navigate = useNavigate()
    const auth = getAuthFromSessionStorage()
    
    const handleLogout = () => {
      // logout
      removeAuthFromSessionStorage()
  
      navigate('/admin/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
    
        if (!receipt) {
            toast("Please upload a receipt.");
            setIsLoading(false);
            return;
        }
    
        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("receipt", receipt); // Attach file
        formData.append("user", auth.user.id);
    
        try {
            const response = await createDeposit(formData);
    
            if (response.status === 200) {
                toast("Deposit request submitted successfully.");
                setAmount('');
                setReceipt(null);
                setIsLoading(false);
                return;
            }
    
            toast.error(response.data.message || response.response.data.message || response.data.data.message || "Failed to submit deposit request.");
            setIsLoading(false);
        } catch (error) {
            toast(error.data.message || error.response.data.message || error.data.data.message ||"An error occurred. Please try again later.");
            setIsLoading(false);
        }
    }

    const handleFileChange = (e) => {
        setReceipt(e.target.files[0]);
    };

    const handleCopy = () => {
        const input = document.querySelector("#usdt_address"); // targeting the input field by ID
        input.select(); // Select the content inside the input box
        document.execCommand("copy"); // Execute the copy command
        alert("Copied to clipboard!"); 
      };

    useEffect(()=>{
        if(!auth){
            navigate('/login')
        }

        (async () => { 
            const response = await getMyPendingDeposits(auth.user.id)
            
            if(response.status === 200){
                setPendingDeposits(response.data)
                return
            }

            return toast.error('Faild to get pending deposits')
        } )()
    },[])
  return (
    <div className='w-screen min-h-screen bg-gray-100'>
        <header className='w-full flex justify-between items-center h-16 bg-blue-500 text-white text-2xl p-4 fixed top-0 left-0 z-[1000]'>
            <Link to='/admin'>
            <div className="logo-section flex items-center justify-center sm:h-full py-2 sm:py-0">
                <img
                    src={logo}
                    alt="logo"
                    className="w-[5rem] h-[30px] bg-slate-100 rounded-3xl sm:w-[7rem] sm:h-[3rem] md:w-[9rem] md:h-[3.5rem] lg:w-[8rem] lg:h-[3rem]"
                />
            </div>
            </Link>

            <div className='flex items-center gap-8 cursor-pointer '>
                {/* <Link to='/admin/profile'>
                    <div className='flex flex-col justify-center items-center group'>
                        <FaUser className='text-[20px] cursor-pointer  group-hover:text-amber-300 mt-2' />
                        <p className='text-[14px] -mt-2 group-hover:text-amber-300'>Profile</p>
                    </div>
                </Link> */}
                <div className='flex flex-col justify-center items-center group' onClick={handleLogout}>
                    <FaSignOutAlt className='text-[20px] cursor-pointer group-hover:text-rose-300 mt-2' />
                    <p className='text-[14px] -mt-2 group-hover:text-rose-300'>Logout</p>
                </div>
            </div>
        </header>

        <div className='w-[100vw] p-4 mt-16 h-max flex flex-col md:flex-row items-start justify-center gap-10 sm:gap-32 select-none'>
            {/* <AdminUserTable /> */}

            <div className=' mx-auto sm:mx-0 w-max h-max flex flex-col items-center justify-center gap-4 z-0'>
                <img src={payment_method} alt="payment_scanner" className='w-[60vw] sm:w-auto sm:h-[calc(100vh_-_300px)] drop-shadow-lg rounded' />
                <h1 className='text-center font-bold text-emerald-500 w-full'>USDT (BP20) Address:<br /><textarea readOnly style={{boxShadow: "inset 0px 0px 10px #00000080"}} className='px-2 py-1 shadow-inner rounded mt-2 w-[90%] h-max overflow-clip text-wrap ' id='usdt_address' value="0xFa388258810F033c172385257393c8B75f7A2e7A"></textarea></h1>
                <div className='w-full h-max flex items-center justify-center gap-4'>
                    <a target='_blank' className='p-2 px-4 cursor-pointer rounded shadow-md bg-emerald-500 text-white font-bold' href='https://link.trustwallet.com/send?coin=20000714&address=0xFa388258810F033c172385257393c8B75f7A2e7A&token_id=0x55d398326f99059fF775485246999027B3197955'>Pay Now</a>
                    <div onClick={handleCopy} className='px-4 p-2 cursor-pointer rounded shadow-md bg-sky-500 text-white font-bold'>Copy Address</div>
                </div>
            </div>


            <form className='mx-auto sm:mx-0 flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg md:mr-4' onSubmit={handleSubmit}>
                <h1 className='text-sky-500 text-[22px] font-bold underline underline-offset-4 mr-10'>
                    Deposit Request Form
                </h1>

                {/* Amount Input */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor="amount" className='text-sky-400 font-bold'>Deposit Amount:</label>
                    <input 
                        type="text" 
                        name="amount" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        className='border-b-2 border-sky-500 indent-2 focus-visible:border-b focus-visible:border-emerald-500' 
                        placeholder='Enter amount' 
                    />
                </div>

                {/* Custom File Input */}
                <div className='flex flex-col gap-2'>
                    <label className='text-sky-400 font-bold'>Deposit Receipt:</label>
                    <label htmlFor="receipt" className='cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded flex items-center gap-2 w-fit'>
                        <FaUpload /> Upload Receipt
                    </label>
                    <input 
                        type="file" 
                        id="receipt" 
                        onChange={handleFileChange} 
                        className='hidden' 
                    />
                    {receipt && <span className='text-sm text-gray-500'>{receipt.name}</span>}
                </div>

                {/* Submit Button */}
                <button disabled={isLoading} type="submit" className='py-2 bg-sky-500 rounded shadow-sm text-white'>
                    {
                        isLoading ? ( <RiLoader3Line className='animate-spin text-center mx-auto'  /> ) : ( 'Submit Request' )
                    }
                </button>
            </form>
        </div>

        <div className='w-[95%] mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg mb-14'>
            <h1 className='font-bold underline underline-offset-4 text-orange-600 text-[18px]'>Pending Deposit Requests</h1>

            {
                pendingDeposits && pendingDeposits.length > 0 ? (
                    <table className='w-full mt-4'>
                        <thead className='bg-sky-500 text-white'>
                            <tr>
                                <th className='p-2'>Date</th>
                                <th className='p-2'>Amount</th>
                                <th className='p-2'>Receipt</th>
                                <th className='p-2'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                pendingDeposits.map((deposit,index) => (
                                    <tr key={deposit._id}>
                                        <td className='p-2'>{deposit.createdAt.split('T')[0]}</td>
                                        <td className='p-2'>${deposit.amount}</td>
                                        <td className='p-2 underline text-sky-500'><a href={deposit.receiptUrl} target="_blank">View</a></td>
                                        <td className='p-2 text-orange-500 font-bold'>{deposit.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-4 mt-10'>
                        {/* <RiProgress1Fill className='text-[50px] text-orange-400' /> */}
                        <h1 className='text-[20px] font-bold text-orange-400'>No Pending Deposits</h1>
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default DepositPage