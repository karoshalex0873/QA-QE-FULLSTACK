import { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  const [role, setRole] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);


  const fetchUserRole = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/user-role", {
        method: "GET",
        credentials: "include", // Needed for HTTP-only cookies
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user role");
      }

      const data = await response.json();
      setRole(data); // Since API returns role_id directly
    } catch (error) {
      console.error("Error fetching user role:", error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch user role from backend
  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-primary/30 backdrop-blur-md space-y-6">
      {/* Navigation */}
      <div className="fixed w-full my-3">
        <Navigation />
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-white">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {/* Render based on user role */}
          {role === 3 || role === 2 ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
