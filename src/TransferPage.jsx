import React, { useEffect } from 'react'
import Header from './Header'
import { getUserFullname, transferAmount } from './helper/baseApiCalls'
import { toast } from 'react-toastify'
import { getAuthFromSessionStorage, setAuthInSessionStorage } from './utils/ls.util'

const TransferPage = () => {
    const [isAllowed,setIsAllowed] = React.useState(false)
    const [amount, setAmount] = React.useState(0)
    const [amountInDollar, setAmountInDollar] = React.useState(0)
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

    const auth = getAuthFromSessionStorage()

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

    useEffect(()=>{
        setAmountInDollar(amount / 400)
    },[amount])

    const handleTransfer = async e => {
        e.preventDefault()
        if(amount > auth.user.redeem_wallet || amount <= 0){
            return toast.error('Invalid Amount!')
        }

        try {
            const response = await transferAmount(auth.user.id, userId, amount)

            if(response.status !== 200){
                return toast.error('Faild to transfer amount')
            }

            toast.success('Amount transfered successfully!')
            setAmount(0)
            setUserId('')

            const userUpdatedData = {...auth.user, redeem_wallet: auth.user.redeem_wallet - amount}

            const newAuth = {...auth, user: userUpdatedData}

            setAuthInSessionStorage(newAuth)

            location.reload()
        } catch (error) {
            console.log(error);
            
            return toast.error(error.message)
        }
    }
  return (
    <div>
        <Header />
        <div className='w-[95%] bg-sky-500 rounded mx-auto mt-[120px] min-h-10 h-max'>
            <h1 className='text-bold text-[22px] text-white w-full h-[70px] bg-sky-500 p-4 rounded-t'>Transfer Tokens</h1>
            <div className="w-full h-[400px] overflow-y-auto bg-white rounded-b p-4">
                <form className="w-full" onSubmit={handleTransfer}>
                    <div className="flex flex-col space-y-4">
                        <input disabled value={'My Balance - ' + (auth.user.redeem_wallet ? auth.user.redeem_wallet : 0)} type="text" className="border p-2 rounded" />
                        <input name='userId' value={userId} onChange={handleChange} type="text" placeholder="Enter UserID" className="border p-2 rounded" />
                        <p className='w-full h-[20px] px-2 flex items-center'>{userFullname && userFullname.fullname}</p>
                        <input name='amount' value={amount} onChange={handleChange} type="number" placeholder="Enter Amount" className="border p-2 rounded" />
                        <p className='w-full h-[20px] px-2 flex items-center'>Equivalent Dollar: ${amountInDollar}</p>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Transfer</button>
                    </div>
                </form>

                {/* <h1 className='text-bold text-[22px] mt-4 text-white w-full h-[70px] bg-red-500 p-4 rounded'>Transfer can only be done from 6th to 10th of each month.</h1> */}
            </div>
        </div>
    </div>
  )
}

export default TransferPage