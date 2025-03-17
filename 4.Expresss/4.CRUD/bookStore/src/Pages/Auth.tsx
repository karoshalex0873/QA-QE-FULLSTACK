import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Routes>
        <Route path="login" element={<Login />} /> 
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Auth;
