import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers, topupWallet } from "./helper/baseApiCalls"; // API call function

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null); // For popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  const usersPerPage = 15;

  useEffect(() => {
    getAllUsers().then((response) => {
      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    });
  }, []);

  // Search Function
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

  // Sorting Function
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
    setSortField(field);
    setSortOrder(order);
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Open View Modal
  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close View Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  
  // Function to open delete confirmation modal
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };
  
  // Function to delete a user
  const handleDelete = async () => {
    if (!userToDelete) return;
  
    try {
      const response = await deleteUser(userToDelete);
        console.log(response);
        
      if (response.status === 200) {
        setFilteredUsers(filteredUsers.filter((user) => user._id !== userToDelete));
        setUsers(users.filter((user) => user._id !== userToDelete));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const openTopUpModal = () => {
    setIsTopUpModalOpen(true);
  };
  
  const closeTopUpModal = () => {
    setIsTopUpModalOpen(false);
    setTopUpAmount("");
  };
  
  // Function to handle wallet top-up
  const handleTopUp = async () => {
    if (!selectedUser || !topUpAmount || isNaN(topUpAmount) || topUpAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
  
    try {
      const response = await topupWallet(selectedUser._id, { amount: parseFloat(topUpAmount) });
  
      if (response.status === 200) {
        alert("Wallet topped up successfully!");
        closeTopUpModal();
      } else {
        alert("Failed to top up wallet.");
      }
    } catch (error) {
      console.error("Error topping up wallet:", error);
    }
  };
  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by username, email, or fullname"
        className="border p-2 w-full mb-4 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">SL NO</th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort("username")}>
                Username {sortField === "username" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort("fullname")}>
                Fullname {sortField === "fullname" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort("email")}>
                Email {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="border p-2 cursor-pointer" >
                Mobile
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort("totalBusiness")}>
                Business {sortField === "totalBusiness" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">{indexOfFirstUser + index + 1}</td>
                  <td className="border p-2">{user.fullname || '-'}</td>
                  <td className="border p-2">{user.code}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.mobile}</td>
                  <td className="border p-2">{user.totalBusiness || 0}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleView(user)}
                    >
                      View
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={e => openDeleteModal(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
        </span>
        <button
          className={`px-4 py-2 border rounded ${currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage)))}
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
        >
          Next
        </button>
      </div>

      {/* View User Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">User Details</h2>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Fullname:</strong> {selectedUser.fullname}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Level:</strong> {selectedUser.rank}</p>
            <p><strong>Code:</strong> {selectedUser.code}</p>
            <p><strong>Sponsor Code:</strong> {selectedUser?.sponsor?.code}</p>
            <p><strong>Business:</strong> {selectedUser.totalBusiness || 0}</p>

            {/* Top-Up Button */}
            <button 
                className="bg-green-500 text-white px-3 py-1 rounded mt-4"
                onClick={openTopUpModal}
            >
                Top Up Wallet
            </button>

            <div className="mt-4 flex justify-end">
                <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={closeModal}>
                Close
                </button>
            </div>
            </div>
        </div>
        )}

        {isTopUpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Top Up Wallet</h2>
            <input
                type="number"
                placeholder="Enter Amount"
                className="border p-2 w-full rounded"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
                <button 
                className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                onClick={closeTopUpModal}
                >
                Cancel
                </button>
                <button 
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleTopUp}
                >
                Confirm Top Up
                </button>
            </div>
            </div>
        </div>
        )}

        {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
                <button
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowDeleteModal(false)}
                >
                Cancel
                </button>
                <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
                >
                Confirm Delete
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default AdminUserTable;