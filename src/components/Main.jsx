import React from "react";
import SignupForm from "./RegisterPage"; 
import  logo from '../assets/crax.png'
import { FaQuestionCircle } from "react-icons/fa";

const MainComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      {/* Full-width Header Section */}
      <header className="w-full flex justify-between items-center p-4 bg-white border-b shadow-md">
        <img src={logo} alt="Logo" className="h-6 md:h-8 ml-4" /> {/* Replace with your logo */}
        <button className="text-gray-500 hover:text-gray-700 text-lg mr-4"> <FaQuestionCircle size={24} color="black" /></button>
      </header>

      {/* Child Component (Can be changed later) */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg mt-6 p-6">
        <SignupForm />
      </div>
    </div>
  );
};

export default MainComponent;
