import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import FormInput from "./FormInput";
import { bgImg } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // Ensures cookies are sent with requests
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="fixed top-0 z-10 w-full py-1">
        <Navigation />
      </div>
      <div className="container flex h-screen items-center justify-center p-6 bg-light-100/4 backdrop-blur-md">
        {/* Image Section */}
        <div className="hidden lg:block min-w-md rounded-2xl overflow-hidden">
          <img src={bgImg} alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full flex flex-col justify-center max-w-lg bg-white rounded-2xl shadow-xl p-8 mx-4 lg:mx-0 h-[500px]">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">Login to Your Account</h1>
            </div>

            {/* Show Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
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
                {loading ? "Logging in..." : <><FaArrowRight /> Login Now</>}
              </button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/auth/register")}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
