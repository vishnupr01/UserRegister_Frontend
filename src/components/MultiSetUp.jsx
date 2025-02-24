import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFinancialInfo, setPersonalInfo } from "../redux/slice";

import FinancialInfo from "./FinancialInfo";
import PersonalInfo from "./personalInfo";
import { FaQuestionCircle } from "react-icons/fa";
import logo from "../assets/crax.png";
import register from "../api/user";
import { toast } from "react-hot-toast";


const MultiStepForm = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.user.personalInfo);
  const financialInfo = useSelector((state) => state.user.financialInfo);
  const registerInfo = useSelector((state) => state.user.registerInfo);
  const [step, setStep] = useState(1);

  const transformData = (personalInfo, financialInfo, registerInfo) => {
    return {
      email: registerInfo.email || "", // Mapping from registerInfo
      phone: registerInfo.mobile || "", // Mapping from registerInfo
      password: registerInfo.password || "",
      confirmPassword:registerInfo.confirmPassword||"", // Mapping from registerInfo
      dob: personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth) : new Date(), // Ensure valid Date
      name: personalInfo.fullName || "",
      currentAddress: personalInfo.currentAddress || "", // Prioritizing currentAddress if present
      durationAtAddress: personalInfo.addressDuration || "",
      aboutYourself: personalInfo.aboutYourself || "",
      employmentStatus: financialInfo.employmentStatus || "",
      savingsInvestments: financialInfo.savingsInvestments || "",
    };
  };

  const handleNext = async (data) => {
    if (step === 1) {
      dispatch(setPersonalInfo(data));
      setStep(2);
    } else if (step === 2) {
      dispatch(setFinancialInfo(data));

      try {
        const structuredData = transformData(personalInfo, financialInfo, registerInfo);
        console.log(structuredData);
        
        const response = await register(structuredData)
        console.log("hey got response", response);
      } catch (err) {
        console.log(err.response.data.message,"heyyyy");
        if(err.response.data.message==="Invalid data"){
          toast.error("Invalid Data");
        }else if(err.response.data.message==="Email is already registered"){
          toast.error("Email is already registered")
        }else if(err.response.data.message==="phone number is already taken"){
          toast.error("phone number is already taken")
        }
      }
    }
  };

  return (
    <>
      <header className="w-full flex justify-between items-center p-4 bg-white border-b shadow-md">
        <img src={logo} alt="Logo" className="h-6 md:h-8 ml-4" />
        <button className="text-gray-500 hover:text-gray-700 text-lg mr-4">
          <FaQuestionCircle size={24} color="black" />
        </button>
      </header>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold ${step === 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
            >
              1
            </div>
            <div className="w-10 h-1 bg-gray-300 mx-1" />
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold ${step === 2 ? "bg-blue-600" : "bg-gray-300"
                }`}
            >
              2
            </div>
          </div>
          {step === 1 && <PersonalInfo onNext={handleNext} />}
          {step === 2 && <FinancialInfo onNext={handleNext} />}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
