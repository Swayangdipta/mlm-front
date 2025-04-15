import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import flag from "./assets/usaFlag.png";
import { getAllTransactions } from "./helper/baseApiCalls";
import { toast } from "react-toastify";
import { removeAuthFromSessionStorage } from "./utils/ls.util";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthFromSessionStorage();
    navigate("/login");
  };

  const fetchTransactions = async () => {
    try {
      const response = await getAllTransactions({ user: userId });
      console.log(response);

      if (response.status === 200) {
        setTransactions(response.data.transactions);
        return;
      }

      toast("Error fetching transactions");
    } catch (error) {
      console.log(error);
    }
  };

  const getSign = (type) => {
    if (type === "deposit" || type === "profit") return "+";
    return "-";
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactions();
    };

    fetchData();
  }, [userId]);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar1 */}
      <div className="Navbar">
        <header className="bg-blue-500 flex justify-between items-center p-2 pb-3 fixed top-0 w-full z-10">
          <h1 className="text-[24px] text-white">AIDAM</h1>
          <div className="flex space-x-6 mt-1">
            <img src={flag} alt="USA Flag" className="w-[2.6rem] h-[1.4rem]" />
            <button className="ml-10 text-2xl flex-col" onClick={handleLogout}>
              <IoMdLogOut />
            </button>
          </div>
        </header>
        {/* Navbar2 */}
        <nav className="bg-blue-900 text-white flex flex-col items-center p-3 m-0 fixed top-14 w-full z-10">
          <div className="flex space-x-4 w-full justify-between">
            <Link to="/dashboard">
              <button className="font-semibold">Home</button>
            </Link>

            <Link to="/profile">
              <button className="font-semibold relative top-0 group">
                Profile
              </button>
            </Link>
          </div>
        </nav>
      </div>

      <main className="pt-36 w-full min-h-screen bg-[url(https://ehsslibrary2.wordpress.com/wp-content/uploads/2014/04/blank-google-plus-background-navy-blue.jpg)]">
        <div className="w-[90%] min-h-[400px] h-max p-4 mx-auto rounded border-amber-500 border bg-[#00000080] shadow-inner">
          <h2 className="text-zinc-100 text-sm md:text-lg">My Transactions</h2>

          {/* Make the table scrollable on small screens */}
          <div className="overflow-x-auto">
            <table className="table-auto mt-4 w-full ">
              <thead className="w-full bg-zinc-300 border">
                <tr>
                  <th className="border border-zinc-400 text-xs md:text-base">SL NO</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Date</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Amount</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Type</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Status</th>
                  <th className="border border-zinc-400 text-xs md:text-base">Image</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-200 w-full text-center text-xs md:text-base">
                {transactions.length > 0 ? (
                  transactions.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border ${
                        getSign(item.type) === "+"
                          ? "bg-green-300"
                          : "bg-red-300"
                      }`}
                    >
                      <td className="border border-zinc-400 text-xs md:text-base">{index + 1}</td>
                      <td className="border border-zinc-400 text-xs md:text-base">
                        {item.createdAt.split("T")[0] || "00-00-0000"}
                      </td>
                      <td className="border border-zinc-400 text-xs md:text-base">
                        {getSign(item.type)}${item.amount}
                      </td>
                      <td className="border border-zinc-400 text-xs md:text-base">{item.type}</td>
                      <td className="border border-zinc-400 text-xs md:text-base">
                        {item.status.toUpperCase()}
                      </td>
                      {item.receiptUrl ? (
                        <td className="border border-zinc-400 underline text-xs md:text-base text-sky-500">
                          <a href={item.receiptUrl}>View</a>
                        </td>
                      ) : (
                        <td className="border text-xs md:text-base border-zinc-400">N/A</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-zinc-100 py-4 text-xs md:text-base">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
