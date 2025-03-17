import { FaBook } from "react-icons/fa";
import { bgImg } from "../utils/constants";
import Navigation from "../components/Navigation";

const Landing = () => {
  return (
    <>
      {/* Landing Page */}
      <div className="relative min-h-screen flex flex-col text-light-100">

        {/* Background Image */}
        <div className="absolute inset-0  w-full flex justify-center items-center ">
          <img
            src={bgImg}
            className="w-auto object-cover object-center "
            alt="Background"
          />
        </div>

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <div className="relative flex flex-col items-center justify-center flex-grow px-6 text-center">
          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-bold flex items-center gap-3 mb-4 text-white drop-shadow-lg animate-fadeIn">
            BookVault <FaBook className="text-5xl text-amber-400" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-xl text-light-200 mb-6 max-w-lg">
            Discover, manage, and cherish your favorite books in one place.
          </p>

          {/* CTA Button */}
          <a
            href="#"
            className="px-6 py-3 bg-amber-400 text-gray-900 font-semibold text-lg rounded-full shadow-lg hover:bg-amber-500 transition duration-300"
          >
            Explore Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Landing;
