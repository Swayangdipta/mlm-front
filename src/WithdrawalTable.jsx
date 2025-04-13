import React, { useEffect, useState } from "react";
import { getAllWithdrawals, approveWithdrawal } from "./helper/baseApiCalls";
import { toast } from "react-toastify";

const WithdrawalTable = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");

  const withdrawalsPerPage = 15;

  const fetchWithdrawals = async () => {
    try {
      const response = await getAllWithdrawals();
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

  // Filter Function
  useEffect(() => {
    let filtered = withdrawals.filter((withdrawal) =>
      withdrawal.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterStatus !== "all") {
      filtered = filtered.filter((withdrawal) => withdrawal.status === filterStatus);
    }

    setFilteredWithdrawals(filtered);
    setCurrentPage(1);
  }, [searchQuery, withdrawals, filterStatus]);

  // Approve Function
  const handleApprove = async (id) => {
    try {
      const response = await approveWithdrawal(id);
      if (response.status === 200) {
        toast.success("Withdrawal approved successfully");
        fetchWithdrawals();
      } else {
        toast.error("Failed to approve withdrawal");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error approving withdrawal");
    }
  };

  // Pagination Logic
  const indexOfLastWithdrawal = currentPage * withdrawalsPerPage;
  const indexOfFirstWithdrawal = indexOfLastWithdrawal - withdrawalsPerPage;
  const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-4">Withdrawal Management</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by username"
          className="border p-2 rounded w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Withdrawals</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">SL NO</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Requested At</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentWithdrawals.length > 0 ? (
              currentWithdrawals.map((withdrawal, index) => (
                <tr key={withdrawal._id} className="text-center">
                  <td className="border p-2">{indexOfFirstWithdrawal + index + 1}</td>
                  <td className="border p-2">{withdrawal.user.username}</td>
                  <td className="border p-2">{withdrawal.user.email}</td>
                  <td className="border p-2">${withdrawal.amount}</td>
                  <td className="border p-2">{new Date(withdrawal.requestedAt).toLocaleString()}</td>
                  <td className="border p-2">{withdrawal.status}</td>
                  <td className="border p-2">
                    {withdrawal.status === "pending" ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleApprove(withdrawal._id)}
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-600">Approved</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border p-4 text-center">No withdrawals found.</td>
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
          Page {currentPage} of {Math.ceil(filteredWithdrawals.length / withdrawalsPerPage)}
        </span>
        <button
          className={`px-4 py-2 border rounded ${currentPage === Math.ceil(filteredWithdrawals.length / withdrawalsPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredWithdrawals.length / withdrawalsPerPage)))}
          disabled={currentPage === Math.ceil(filteredWithdrawals.length / withdrawalsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WithdrawalTable;