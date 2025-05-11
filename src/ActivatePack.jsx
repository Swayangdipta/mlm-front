import React from 'react'
import { activatePack } from './helper/baseApiCalls'
import { toast } from 'react-toastify'

const ActivatePack = ({setIsActivatePackOpen = f=>f, data}) => {
    const [packAmount, setPackAmount] = React.useState(0)
    const [isValid, setIsValid] = React.useState(true)
    const [error, setError] = React.useState(null)

    const handleChange = (e) => {
        const value = e.target.value
        setPackAmount(value)
        if(value % 100 !== 0){
            setIsValid(false)
            setError('Invalid pack amount')
        }else if(value > parseFloat(data.redeem_wallet) / 400){
            setIsValid(false)
            setError('Insufficient funds')
        }
        else{
            setError(null)
            setIsValid(true)
        }
    }

    const handleSubmit = async () => {
        try {
        if(isValid) {
            // make api call to activate pack
            const response = await activatePack(data.id, {amount: packAmount})
            if (response.status === 200) {
                // console.log('Pack activated successfully')
                setError(null)
                setPackAmount(0)
                toast.success('Pack activated successfully')
                toast.success('Please re-login to see the changes')
                // update the wallet_balance from the auth object in session storage
                data.redeem_wallet -= packAmount * 400
                const auth = sessionStorage.getItem('auth')
                auth.user.redeem_wallet = data.redeem_wallet
                sessionStorage.setItem('auth', JSON.stringify(data))
                setIsValid(true)
                setIsActivatePackOpen(false)
                return
            }

            setIsValid(false)
            setError("Failed to activate pack")
        }}catch (error) {
            console.log(error)
            setIsValid(false)
            setError(error.response?.data?.message)
        }
    }
  return (
    <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#00000080]'>
        <div className='w-[280px] min-h-[280px] p-2 h-max bg-white rounded flex flex-col items-left justify-start relative top-0'>
            <h1 className='text-[20px] text-bold text-left'>Activate Pack</h1>
            <p className='text-[14px] text-left'>My Balance is: {parseFloat(data.redeem_wallet).toFixed(3)} ( ${(parseFloat(data.redeem_wallet).toPrecision(3) / 400).toPrecision(3)} )</p>
            <div className='w-full h-[1px] bg-slate-300 my-2'></div>
            <div className='flex flex-col justify-between relative top-0'>
                <p className='mt-4 font-bold text-sky-700'>Select Pack</p>
                <p className='absolute bottom-2 left-2 font-bold text-sky-500'>$</p>
                <input onChange={handleChange} className='mt-2 w-full h-[40px] bg-gray-300 border-b-2 text-sky-500 font-bold border-sky-500 outline-none indent-6' type="number" placeholder='Type pack..100, 200, 300, 400' />
            </div>    
            <p className='w-full min-h-[20px] h-max mt-1 text-red-700'>{ !isValid && error}</p>
            <div className='flex items-center justify-center space-x-4 mt-4'>
                <button className='bg-sky-500 text-white px-4 py-2 rounded w-full' onClick={() => handleSubmit()}>Activate</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={() => setIsActivatePackOpen(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ActivatePack