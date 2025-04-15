import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import flag from "./assets/usaFlag.png";
import { getUserDownline } from "./helper/baseApiCalls";
import { removeAuthFromSessionStorage } from "./utils/ls.util";

const DownlineView = () => {
  const [downline, setDownline] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleLogout = () => {
    removeAuthFromSessionStorage();
    navigate("/login");
  };

  useEffect(() => {
    getUserDownline(userId).then((response) => {
      console.log(response);
      
      if (response.status === 200) {
        setDownline(response.data);
      }
    });
  }, [userId]);

  // Calculate pagination
  const totalPages = Math.ceil(downline.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = downline.slice(startIndex, endIndex);

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
          <div className="flex flex-wrap space-x-4 w-full justify-between">
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
          <h2 className="text-zinc-100">My Team</h2>

          {/* Table for Downline */}
          <div className="overflow-x-auto">
            <table className="table-auto mt-4 w-full">
              <thead className="w-full bg-zinc-300 border">
                <tr>
                  <th className="border border-zinc-400 text-sm md:text-base">SL NO</th>
                  <th className="border border-zinc-400 text-sm md:text-base">Sponsor ID</th>
                  <th className="border border-zinc-400 text-sm md:text-base">User ID</th>
                  <th className="border border-zinc-400 text-sm md:text-base">Fullname</th>
                  <th className="border border-zinc-400 text-sm md:text-base">Registration Date</th>
                  <th className="border border-zinc-400 text-sm md:text-base">Business</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-200 w-full text-center text-sm md:text-base">
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item._id} className="border">
                      <td className="border border-zinc-400">
                        {startIndex + index + 1}
                      </td>
                      <td className="border border-zinc-400">
                        {item.sponsor?.code || "N/A"}
                      </td>
                      <td className="border border-zinc-400">{item.code}</td>
                      <td className="border border-zinc-400">
                        {item.fullname}
                      </td>
                      <td className="border border-zinc-400">
                        {item.createdAt.split("T")[0]}
                      </td>
                      <td className="border border-zinc-400">
                        {item.totalBusiness || 0}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-zinc-100 py-4">
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-2 bg-blue-600 text-white rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <span className="text-white mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-2 bg-blue-600 text-white rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DownlineView;
