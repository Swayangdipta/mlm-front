import React, { useEffect, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthFromSessionStorage, removeAuthFromSessionStorage } from './utils/ls.util'
import { getTotalBusiness } from './helper/baseApiCalls'
import { CgUserList } from 'react-icons/cg'
import { BiSolidBank } from 'react-icons/bi'

const AdminDashboard = () => {
    const [totalBusiness,setTotalBusiness] = useState(0)
    const navigate = useNavigate()
    const auth = getAuthFromSessionStorage()

    const handleLogout = () => {
      // logout
      removeAuthFromSessionStorage()
  
      navigate('/admin/login')
    }

    const fetchTotals = async () => {
        try {
            const response = await getTotalBusiness()
            
            if (response.status === 200) {
                setTotalBusiness(response.data.totalBusiness)
            }
        } catch (error) {
            console.log(error);
            
            return alert('Failed to fetch data')
        }
    }

    useEffect(() => {
        fetchTotals()

        if(!auth){
            navigate('/admin/login')
        }

        if(auth.user){
            navigate('/admin/login')
        }
    }, [])

  return (
    <div className='w-screen min-h-screen bg-gray-100'>
      <header className='w-full flex justify-between items-center h-16 bg-blue-500 text-white text-2xl p-4 fixed top-0 left-0'>
        <h1>Admin Dashboard</h1>

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

      <div className='w-screen p-4 mt-16 min-h-10 h-max'>
        <div className='w-[250px] h-[180px] bg-white rounded-md shadow-md shadow-emerald-300 text-center p-4 flex flex-col justify-center items-center'>
            <h1 className='text-[32px] font-bold text-emerald-500'>${totalBusiness}</h1>
            <h1 className='text-[24px] font-bold text-emerald-500'>Total Business</h1>
        </div>
      </div>

      <div className='w-screen p-4 mt-10 min-h-10 h-max flex justify-start items-center gap-4 flex-wrap'>
        <Link to='/admin/manage-users'>
            <div className='w-[250px] h-[180px] bg-white rounded-md shadow-md shadow-amber-300 text-center p-4 flex flex-col justify-center items-center'>
                <CgUserList className='text-[32px] text-amber-500'  />
                <h1 className='text-[26px] font-bold text-amber-500'>Manage Users</h1>
            </div>
        </Link>
        {/* <Link to='/admin/investments'>
            <div className='w-[250px] h-[180px] bg-white rounded-md shadow-md shadow-purple-300 text-center p-4 flex flex-col justify-center items-center'>
                <BiSolidBank className='text-[32px] text-purple-500'  />
                <h1 className='text-[26px] font-bold text-purple-500'>View Deposits</h1>
            </div>
        </Link> */}

        <Link to='/admin/request/withdrawal'>
            <div className='w-[250px] h-[180px] bg-white rounded-md shadow-md shadow-sky-300 text-center p-4 flex flex-col justify-center items-center'>
                <BiSolidBank className='text-[32px] text-sky-500'  />
                <h1 className='text-[18px] font-bold text-sky-500'>Withdrawal Requests</h1>
            </div>
        </Link>

        <Link to='/admin/request/deposit'>
            <div className='w-[250px] h-[180px] bg-white rounded-md shadow-md shadow-emerald-300 text-center p-4 flex flex-col justify-center items-center'>
                <BiSolidBank className='text-[32px] text-emerald-500'  />
                <h1 className='text-[18px] font-bold text-emerald-500'>Deposit Requests</h1>
            </div>
        </Link>
      </div>
        
    </div>
  )
}

export default AdminDashboard