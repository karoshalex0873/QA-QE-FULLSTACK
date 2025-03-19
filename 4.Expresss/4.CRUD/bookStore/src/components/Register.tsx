import { useState } from "react";
import { bgImg } from "../utils/constants";
import FormInput from "./FormInput";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role_id: 1 }), // Default to Borrower (change as needed)
        credentials:"include"
      });

      const data = await response.json();
      console.log(data.token)
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // alert("Registration successful!");
      navigate("/auth/login"); // Redirect user to login page
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="fixed top-0 z-10 w-full py-1">
        <Navigation />
      </div>

      <div className="container flex h-screen items-center justify-center p-6 bg-light-100/2 backdrop-blur-md">
        <div className="hidden lg:block min-w-md rounded-2xl overflow-hidden">
          <img src={bgImg} alt="Register" className="w-full h-full object-cover" />
        </div>

        <div className="w-full flex flex-col justify-center max-w-lg bg-white rounded-2xl shadow-xl p-8 mx-4 lg:mx-0 h-[500px]">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">Create Account</h1>
              <p className="text-gray-500 text-sm">Join our community today!</p>
            </div>

            {/* Show Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormInput
                label="Username"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your username"
              />

              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                disabled={loading}
              >
                {loading ? "Registering..." : <><FaArrowRight /> Register Now</>}
              </button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/auth/login")}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
