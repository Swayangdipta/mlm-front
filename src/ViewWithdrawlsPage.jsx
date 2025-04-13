import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthFromSessionStorage, removeAuthFromSessionStorage } from './utils/ls.util'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import WithdrawalTable from './WithdrawalTable'

const ViewWithdrawlsPage = () => {
    const navigate = useNavigate()
    const auth = getAuthFromSessionStorage()

    const handleLogout = () => {
      // logout
      removeAuthFromSessionStorage()
  
      navigate('/admin/login')
    }

    useEffect(() => {
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
            <Link to='/admin/profile'>
                <div className='flex flex-col justify-center items-center group'>
                    <FaUser className='text-[20px] cursor-pointer  group-hover:text-amber-300 mt-2' />
                    <p className='text-[14px] -mt-2 group-hover:text-amber-300'>Profile</p>
                </div>
            </Link>
            <div className='flex flex-col justify-center items-center group' onClick={handleLogout}>
                <FaSignOutAlt className='text-[20px] cursor-pointer group-hover:text-rose-300 mt-2' />
                <p className='text-[14px] -mt-2 group-hover:text-rose-300'>Logout</p>
            </div>
        </div>
      </header>

      <div className='w-screen p-4 mt-16 min-h-10 h-max'>
            <WithdrawalTable />
      </div>
      </div>
  )
}

export default ViewWithdrawlsPage