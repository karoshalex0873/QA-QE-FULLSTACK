import { useState } from "react"
import { FaBars, FaBook, FaBookOpen, FaRocket } from "react-icons/fa"
import { FaCircleInfo, FaHouseChimney } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  // mobile responsive states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (

    <>
      <div className="bg-primary/30 backdrop-blur-md shadow-lg py-2">
        <div className=" container mx-auto flex items-center justify-around px-[8%] py-4 gap-4 ">
          {/* logo */}

          <div className="flex flex-col sm:flex-row items-center gap-3 text-light-100 text-2xl font-semibold">
            <FaBookOpen className="text-3xl" />
            <span>Books Vault</span>
          </div>

          {/* navigation links (Desktop)*/}
          <div className="hidden md:flex gap-10 text-lg">
            <a href="#" className="flex items-center space-x-2 text-light-100 hover:text-light-secondary transition">
              <FaHouseChimney className="text-2xl" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-light-100 hover:text-light-secondary transition">
              <FaBook className="text-2xl" />
              <span>Browse</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-light-100 hover:text-light-secondary transition">
              <FaCircleInfo className="text-2xl" />
              <span>About</span>
            </a>
          </div>

          {/* getstarted buttion */}
          <button
            onClick={() => navigate("/auth/login")}
            className="text-light-100 flex gap-3 cursor-pointer "
          >
            <FaRocket className="text-2xl" />
            <span>Get Started</span>
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-light-100 font-bold cursor-pointer bg-light-200/10 py-1 px-2 rounded-sm">
            <FaBars className="text-xl" />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-full right-5 bg-light-100/20 rounded-md backdrop-blur-md shadow-md px-8 py-6 space-y-4 text-lg">
            <a href="#" className="block text-light-100 hover:text-light-secondary">Home</a>
            <a href="#" className="block text-light-100 hover:text-light-secondary">Browse</a>
            <a href="#" className="block text-light-100 hover:text-light-secondary">About</a>
          </div>
        )}
      </div>
    </>
  )
}

export default Navigation