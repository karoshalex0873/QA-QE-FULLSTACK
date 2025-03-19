// UserDashboard.tsx
import { useNavigate } from "react-router-dom";
import FetchBooks from "./BooksLogic/FetchBooks";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  
  //function to get user name
  const fetchUserName = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/user-name", {
        method: "GET",
        credentials: "include", // Needed for HTTP-only cookies
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user name");
      }
      const data = await response.json();
      setName(data); // API returns username directly
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };
  // Function to log out
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      // Redirect to login page after successful logout
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    fetchUserName();
  }, []);


  return (
    <div className="w-full mt-24 bg-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 pt-3">
        {/* Main Content Area */}
        <div className="bg-gray-500/10 rounded-3xl shadow-xl  ">
          <header className="flex justify-between items-center py-2 px-3  ">
          <p className="text-2xl text-gray-400 font-normal font-serif">👋 <span className="text-light-100 text-3xl space-x-3 px-2 font-extrabold capitalize"> {name.split(" ")[0].trim()}</span>  welcome back </p>
            <button
              onClick={logout}
              className=" flex flex-col justify-center items-center px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
            >
              {/* icon to logout */}
              <FaSignOutAlt />
              logout
            </button>
          </header>
          <FetchBooks />
        </div>

        {/* Sidebar from borrwers tabel */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Borrowed Books</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Borrow ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">User ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Copy ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Librarian ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Borrow Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Return Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                  {/* Sample data - replace with actual data */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">#B001</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">U123</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">C456</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">L789</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">2024-03-15</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">2024-04-15</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                        Borrowed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">#B002</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">U124</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">C457</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">L790</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">2024-03-10</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">2024-03-25</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200">
                        Overdue
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">#B003</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">U125</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">C458</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">L791</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">2024-03-20</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">2024-04-05</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                        Returned
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;