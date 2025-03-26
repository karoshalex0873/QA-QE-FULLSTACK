import { FaUserCircle } from "react-icons/fa";
import { RiPhoneFill } from "react-icons/ri";
import { MdOutlineHearing, MdOutlineMic, MdOutlineMicOff } from "react-icons/md";
import { useState } from "react";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6">
      {/* Header section */}
      <div className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-3xl font-bold text-light-100 mb-3">
          AI-Powered Mock Interviews
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Practice technical interviews with real-time voice analysis, instant feedback,
          and AI-generated questions tailored to your target role.
        </p>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 mb-2">
        {/* AI Voice Section */}
        <div className="flex-1 bg-dark-100/80 rounded-2xl p-8 flex flex-col items-center justify-between backdrop-blur-lg border border-gray-100/10 hover:border-blue-500/20 transition-all">
          <div className="space-y-4 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-light-100 mb-2">
              {isActive ? "Interview in Progress" : "AI Interviewer Ready"}
            </h2>
            <p className="text-gray-100 text-sm mb-6">
              {isActive
                ? "AI is analyzing your responses in real-time"
                : "Click below to start your practice session"}
            </p>

            <div className="relative flex justify-center items-center">
              <button className="w-24 h-24 rounded-full bg-light-100/20 hover:bg-light-100/30 flex items-center justify-center transition-all transform group-hover:scale-110 z-10">
                <MdOutlineHearing className="text-4xl text-light-100" />
              </button>

              {/* Wave effect for AI section */}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="absolute w-24 h-24 rounded-full thick-wave"
                      style={{
                        animation: `voice-wave 1.5s cubic-bezier(0.2, 0.4, 0.6, 1) infinite`,
                        animationDelay: `${index * 0.8}s`,
                        transform: `scale(${0.5 + index * 0.3})`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Mic controls */}
            <div className="flex justify-center gap-3 items-center">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full hover:bg-gray-100/10 transition-colors"
              >
                {!isMuted ? (
                  <MdOutlineMicOff className="text-2xl text-light-100" />
                ) : (
                  <MdOutlineMic className="text-2xl text-light-100" />
                )}
              </button>
              <p className="font-normal text-sm text-light-100">
                {!isMuted ? "Microphone Muted" : "Listening to audio"} 
                <span className="px-2 text-lg"><strong className="px-1">.</strong><strong className="px-1">.</strong><strong className="px-1">.</strong></span>
              </p>
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="flex-1 bg-dark-100/80 rounded-2xl p-8 flex flex-col items-center justify-center backdrop-blur-lg border border-gray-100/10 hover:border-purple-500/20 transition-all">
          <div className="relative group">
            <div className="relative w-32 h-32 rounded-full bg-purple-500/10 flex items-center justify-center hover:bg-purple-500/20 transition-all cursor-pointer">
              <FaUserCircle className="text-6xl text-purple-400/80" />
              <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-dark-100 ${isActive ? "bg-green-400" : "bg-gray-400"}`} />
            </div>
          </div>
          {isActive && (
            <p className=" absolute bottom-5 text-lg text-light-100">
              Active
              <span className="px-2 text-lg"><strong className="px-1">.</strong><strong className="px-1">.</strong><strong className="px-1">.</strong></span></p>
          )}
        </div>
      </div>

      {/* Call Control Section */}
      <div className="bg-dark-100 w-[60%] justify-center items-center flex flex-col py-4 rounded-2xl mt-6 relative">
        <div className="relative flex justify-center items-center w-16 h-16">
          <button
            onClick={() => {
              setIsActive(!isActive);
              setIsMuted(!isMuted);
            }
            }
            className={`w-full h-full rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 z-10  cursor-pointer ${isActive ? 'bg-red-500/70' : 'bg-green-400/70'}`}
          >
            <RiPhoneFill className="text-light-100 text-2xl" />
          </button>
          
          
        </div>

        <div className="mt-4 text-center px-2">
          <p className="text-lg text-light-100 font-extralight">
            {isActive ? "End Call" : "Practice Interview"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;