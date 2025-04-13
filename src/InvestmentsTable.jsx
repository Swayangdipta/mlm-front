import React, { useEffect, useState } from "react";
import { deleteUser, getAllInvestments, topupWallet } from "./helper/baseApiCalls"; // API call function

const InvestmentTable = () => {
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedInvestment, setSelectedInvestment] = useState(null); // For popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const investmentsPerPage = 15;

      const fetchInvestments = async () => {
          try {
              const response = await getAllInvestments()
              
              if (response.status === 200) {
                  if(response.message){
                      return toast.error(response.message)
                  }
                  
                  setInvestments(response.data)
              }
          } catch (error) {
              console.log(error);
              
              return toast.error('Failed to fetch data')
          }
      }

  useEffect(() => {
    fetchInvestments()
  }, []);

  // Search Function
  useEffect(() => {
    const filtered = investments.filter(
      (investment) =>
        investment.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investment.user.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInvestments(filtered);
    setCurrentPage(1);
  }, [searchQuery, investments]);

  // Sorting Function
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sortedInvestments = [...filteredInvestments].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredInvestments(sortedInvestments);
    setSortField(field);
    setSortOrder(order);
  };

  // Pagination Logic
  const indexOfLastInvestment = currentPage * investmentsPerPage;
  const indexOfFirstInvestment = indexOfLastInvestment - investmentsPerPage;
  const currentInvestments = filteredInvestments.slice(indexOfFirstInvestment, indexOfLastInvestment);

  const viewReceipt = (url) => {
    window.open(url, "_blank");
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-4">Investment Management</h2>
      
      <input
        type="text"
        placeholder="Search by username or code"
        className="border p-2 w-full mb-4 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">SL NO</th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort("user.username")}>Username</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Daily Profit</th>
              <th className="border p-2">Return</th>
            </tr>
          </thead>
          <tbody>
            {currentInvestments.length > 0 ? (
              currentInvestments.map((investment, index) => (
                <tr key={investment._id} className="text-center">
                  <td className="border p-2">{indexOfFirstInvestment + index + 1}</td>
                  <td className="border p-2">{investment.user.username}</td>
                  <td className="border p-2">{investment.user.code}</td>
                  <td className="border p-2">{investment.plan}</td>
                  <td className="border p-2">${investment.amount}</td>
                  <td className="border p-2">${investment.daily_profit}</td>
                  <td className="border p-2">${investment.daily_profit > investment?.plan?.split('$')[0] ? eval(investment?.plan?.split('$')[0] - investment.daily_profit) : investment.daily_profit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border p-4 text-center">No investments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredInvestments.length / investmentsPerPage)}
        </span>
        <button
          className={`px-4 py-2 border rounded ${currentPage === Math.ceil(filteredInvestments.length / investmentsPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredInvestments.length / investmentsPerPage)))}
          disabled={currentPage === Math.ceil(filteredInvestments.length / investmentsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvestmentTable;
