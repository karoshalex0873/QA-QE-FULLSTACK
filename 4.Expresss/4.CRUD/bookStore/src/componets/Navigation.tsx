import { FaBars, FaBook, FaBookOpen, FaRocket } from "react-icons/fa"
import { FaCircleInfo, FaHouseChimney } from "react-icons/fa6"

const Navigation = () => {
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
          <div className="bg-light-100/30 py-2  px-3 rounded-md">
            <button className="text-light-100 flex gap-3 cursor-pointer ">
              <FaRocket className="text-2xl" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-light-100 font-bold cursor-pointer bg-light-200/10 py-1 px-2 rounded-sm">
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>
    </>
  )
}

export default Navigation