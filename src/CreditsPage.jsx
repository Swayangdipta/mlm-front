import React from 'react'
import Header from './Header'

const CreditsPage = ({from = 'credits'}) => {
  return (
    <div>
        <Header />

        <div className='w-[95%] bg-sky-500 rounded mx-auto mt-[120px] min-h-10 h-max'>

            <h1 className='text-bold text-[22px] text-white w-full h-[70px] bg-sky-500 p-4 rounded-t'>{from === 'credits' ? 'Credit' : 'Withdrawal'} History</h1>
            <div className="w-full h-[400px] overflow-y-auto bg-white rounded-b p-4">
                <table className="w-full">
                    <thead className="bg-sky-500 text-white">
                    <tr className="text-center border">
                        <th className="p-4 border">SL NO</th>
                        <th className="p-4 border">Date</th>
                        <th className="p-4 border">Time</th>
                        <th className="p-4 border">Tokens</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr className="text-center border">
                        <td className="p-1 border">1</td>
                        <td className="p-1 border">2023-10-01</td>
                        <td className="p-1 border">12:00 PM</td>
                        <td className={`p-1 border text-bold ${from === 'credits' ? 'text-green-500' : 'text-rose-500'}`}>100.00</td>
                    </tr>
                    <tr className="text-center border">
                        <td className="p-1 border">2</td>
                        <td className="p-1 border">2023-10-02</td>
                        <td className="p-1 border">1:00 PM</td>
                        <td className="p-1 border">200</td>
                    </tr>
                    <tr className="text-center border">
                        <td className="p-1 border">3</td>
                        <td className="p-1 border">2023-10-03</td>
                        <td className="p-1 border">2:00 PM</td>
                        <td className="p-1 border">300</td>
                    </tr>
                    <tr className="text-center border">
                        <td className="p-1 border">4</td>
                        <td className="p-1 border">2023-10-04</td>
                        <td className="p-1 border">3:00 PM</td>
                        <td className="p-1 border">400</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default CreditsPage