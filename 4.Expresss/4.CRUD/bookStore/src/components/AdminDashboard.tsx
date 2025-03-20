import { FaSignOutAlt, FaPlus } from "react-icons/fa";
import FetchBooks from "./BooksLogic/FetchBooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddBookModal from "./modals/addBookModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to Handle Book Submission
  const handleAddBook = async (bookData: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/books/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      alert("Book added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

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
        {/* sidde bar menues adding books */}
        <div>
          {/* Add Book */}
          <div className="p-2">
            {/* Add Book Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition"
            >
              <FaPlus /> Add Book
            </button>
        

            {/* Add Book Modal */}
            <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddBook} />
          </div>
          {/* Manage users */}
          <div>
            {/* show users name, email and role_id  this is where all users crud opartion willbe perfoemd  by calling a compnoent called Manage users.tsx  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
