import React, { useState, useEffect } from 'react'
import Header from './Header'
import { getCreditsForUser, getReferralBenefits, getWithdrawalsForUser } from './helper/baseApiCalls';
import { getAuthFromSessionStorage } from './utils/ls.util';
import { toast } from 'react-toastify';

const ReferralBenefits = ({from = 'credits'}) => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const withdrawalsPerPage = 15;
    const auth = getAuthFromSessionStorage()

    const fetchWithdrawals = async () => {
        try {
            const response = await getReferralBenefits(auth.user.id);
            if (response.status === 200) {
                if (response.message) {
                    return toast.error(response.message);
                }
                setWithdrawals(response.data);
            }
        } catch (error) {
            console.log(error);
            return toast.error("Failed to fetch data");
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    // handle pagination
    // const indexOfLastWithdrawal = currentPage * withdrawalsPerPage;
    // const indexOfFirstWithdrawal = indexOfLastWithdrawal - withdrawalsPerPage;
    // const currentWithdrawals = withdrawals.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);

    // const totalPages = Math.ceil(withdrawals.length / withdrawalsPerPage);
    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

    // const handleNextPage = () => {
    //     if (currentPage < totalPages) {  
    //         setCurrentPage(currentPage + 1);
    //     }
    // };
    // const handlePrevPage = () => {
    //     if (currentPage > 1) {   
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    // const handlePageClick = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };
    // const handlePageNumbers = () => {
    //     const pageNumbers = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         pageNumbers.push(i);
    //     }
    //     return pageNumbers;
    // };

    // const pageNumbers = handlePageNumbers();

  return (
    <div>
        <Header />

        <div className='w-[95%] bg-sky-500 rounded mx-auto mt-[120px] min-h-10 h-max'>

            <h1 className='text-bold text-[22px] text-white w-full h-[70px] bg-sky-500 p-4 rounded-t'>Referral Benefit History</h1>
            <div className="w-full h-[400px] overflow-y-auto bg-white rounded-b p-4">
                <table className="w-full">
                    <thead className="bg-sky-500 text-white">
                    <tr className="text-center border">
                        <th className="p-4 border">SL NO</th>
                        <th className="p-4 border">Date</th>
                        <th className="p-4 border">Member Id</th>
                        <th className="p-4 border">Member Name</th>
                        <th className="p-4 border">Tokens</th>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            withdrawals.length > 0 ? (
                                withdrawals.map((withdrawal, index) => (
                                    <tr key={withdrawal._id} className="text-center border">
                                        <td className="p-1 border">{index + 1}</td>
                                        <td className="p-1 border">{withdrawal.date}</td>
                                        <td className="p-1 border">{withdrawal.member.code}</td>
                                        <td className={`p-1 border text-bold `}>{withdrawal.member.name}</td>
                                        <td className="p-1 border text-green-500">{withdrawal.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-center border">
                                    <td colSpan="5" className="p-4">No referral benefits found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default ReferralBenefits