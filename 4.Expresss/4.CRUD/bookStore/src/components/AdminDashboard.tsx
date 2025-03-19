import { FaSignOutAlt } from "react-icons/fa";
import FetchBooks from "./BooksLogic/FetchBooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

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
        <div className="bg-gray-500/10 rounded-3xl shadow-xl">
          <header className="flex justify-between items-center py-2 px-3">
            <h3 className="suubheading">Admin Dashbord</h3>
            <p className="text-2xl text-gray-400 font-normal font-serif">👋 <span className="text-light-100 text-3xl space-x-3 px-2 font-extrabold capitalize"> {name.split(" ")[0].trim()}</span>  welcome back </p>
            <button
              onClick={logout}
              className="flex flex-col justify-center items-center px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </header>
          <FetchBooks />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
