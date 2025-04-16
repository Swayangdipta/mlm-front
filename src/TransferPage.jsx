import React, { useEffect } from 'react'
import Header from './Header'
import { getUserFullname } from './helper/baseApiCalls'
import { toast } from 'react-toastify'

const TransferPage = () => {
    const [isAllowed,setIsAllowed] = React.useState(false)
    const [amount, setAmount] = React.useState(0)
    const [userId, setUserId] = React.useState('')
    const [userFullname, setUserFullname] = React.useState(undefined)
    useEffect(() => {
        const date = new Date()
        const currentday = date.getDate()
        
        if(currentday > 5 && currentday < 11){
            setIsAllowed(true)
        }
    }
    ,[])

    const handleChange = (e) => {
        const { name, value } = e.target
        if(name === 'userId'){
            setUserId(value)
        }else if(name === 'amount'){
            setAmount(value)
        }
    }


    useEffect(()=>{
        setUserFullname({fullname: ''})

        if(userId.length > 4){
            (async () => {
                const res = await getUserFullname(userId)
                console.log(res);
                
                if(res.status !== 200){
                    return
                }

                setUserFullname(res.data)
            })()
        }
    },[userId])
  return (
    <div>
        <Header />
        <div className='w-[95%] bg-sky-500 rounded mx-auto mt-[120px] min-h-10 h-max'>
            <h1 className='text-bold text-[22px] text-white w-full h-[70px] bg-sky-500 p-4 rounded-t'>Transfer Tokens</h1>
            <div className="w-full h-[400px] overflow-y-auto bg-white rounded-b p-4">
                <form className="w-full">
                    <div className="flex flex-col space-y-4">
                        <input disabled value='My Balance - 40000' type="text" placeholder="Enter UserID" className="border p-2 rounded" />
                        <input name='userId' value={userId} onChange={handleChange} type="text" placeholder="Enter UserID" className="border p-2 rounded" />
                        <p className='w-full h-[20px] px-2 flex items-center'>{userFullname && userFullname.fullname}</p>
                        <input name='amount' value={amount} onChange={handleChange} type="number" placeholder="Enter Amount" className="border p-2 rounded" />
                        <button disabled={!isAllowed} type="submit" className="bg-blue-500 text-white p-2 rounded">Transfer</button>
                    </div>
                </form>

                <h1 className='text-bold text-[22px] mt-4 text-white w-full h-[70px] bg-red-500 p-4 rounded'>Transfer can only be done from 6th to 10th of each month.</h1>
            </div>
        </div>
    </div>
  )
}

export default TransferPage