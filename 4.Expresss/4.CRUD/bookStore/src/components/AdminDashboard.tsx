import { FaSignOutAlt } from "react-icons/fa";
import FetchBooks from "./BooksLogic/FetchBooks";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

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

  return (
    <div className="w-full mt-24 bg-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 pt-3">
        {/* Main Content Area */}
        <div className="bg-gray-500/10 rounded-3xl shadow-xl">
          <header className="flex justify-between items-center py-2 px-3">
            <h1 className="text-3xl text-white font-bold">Admin</h1>
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
