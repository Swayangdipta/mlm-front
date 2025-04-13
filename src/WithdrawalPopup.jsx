import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { getAuthFromSessionStorage, setAuthInSessionStorage } from './utils/ls.util'
import { requestWithdrawl } from './helper/baseApiCalls'

const WithdrawalPopup = ({setIsWithdrawOpen = f => f}) => {
    const [isLoading,setIsLoading] = useState(false)
    const [inputs,setInputs] = useState({
        amount: 0,
        wallet: ''
    })
    const [isActive, setIsActive] = useState(false)
    const auth = getAuthFromSessionStorage()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(inputs.amount > auth.user.wallet_balance){
            return alert('Invalid amount')
        }

        if(!isActive){
            return alert('Withdrawal can only be done from 6th to 10th of each month')
        }

        const data = {
            amount: inputs.amount,
            wallet: inputs.wallet || auth.user.id,
            user: auth.user.id
        }

        setIsLoading(true)

        try {
            const response = await requestWithdrawl(data)
            
            if (response.status === 200) {
                setIsWithdrawOpen(false)
                setIsLoading(false)
                setAuthInSessionStorage({...auth,user: {...auth.user, wallet_balance: auth.user.wallet_balance - inputs.amount}})
                return alert('Withdrawal Request Sent')
            }
        } catch (error) {
            console.log(error);
            
            return alert('Internal Server Error')
        }
    }

    useEffect(()=> {
      const date = new Date()
      const currentday = date.getDate()
      
      if(currentday > 5 && currentday < 11){
        setIsActive(true)
      }
    },[])
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white w-[400px] h-[300px] p-4 rounded-lg relative top-0">

        <CgClose className='absolute top-[-10px] -right-[10px] bg-rose-600 p-2 text-[36px] rounded-full cursor-pointer' onClick={e => setIsWithdrawOpen(false)}/>
        <h1 className="text-2xl font-semibold text-center">Withdrawal</h1>
        {
          !isActive ? (
            <p className='mt-4'>Withdrawal can be done from 6th to 10th of each month.</p>
          ) : (
            <form className="mt-4">
              <input type="text" placeholder="Enter Amount" value={inputs.amount} onChange={e => setInputs({...inputs, "amount": e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Enter Wallet Address" value={inputs.wallet} onChange={e => setInputs({...inputs, "wallet": e.target.value})} className="w-full p-2 mt-2 border border-gray-300 rounded-lg" />
              <button className="w-full p-2 mt-2 bg-blue-500 text-white rounded-lg" onClick={handleSubmit}>Make Withdraw Request</button>
            </form>
          )
        }
      </div>
        
    </div>
  )
}

export default WithdrawalPopup