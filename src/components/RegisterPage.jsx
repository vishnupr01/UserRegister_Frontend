import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRegisterInfo } from "../redux/slice";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerInfo = useSelector((state) => state.user.registerInfo);

  // State for error messages
  const [errors, setErrors] = useState({});

  // Regular expressions for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z\d])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setRegisterInfo({ [id]: value }));

    // Remove error message when user starts typing
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!registerInfo.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(registerInfo.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!registerInfo.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(registerInfo.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }



    if (!registerInfo.password) {
      newErrors.password = "Password is required";
    } else if (!passwordPattern.test(registerInfo.password)) {
      newErrors.password =
        "Password must be at least 6 characters, include one uppercase letter and one number.";
    }

    if (!registerInfo.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerInfo.password !== registerInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      navigate("/multiform"); // Navigate if validation passes
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <h1 className="text-xl font-bold">Create your account</h1>
      <p className="text-gray-600 text-sm">
        Set up your RentlyPass in as little as 2 minutes.
      </p>

      <form className="w-full max-w-sm mt-4" onSubmit={handleSubmit}>
        <h1 className="text-gray-500">Contact Details</h1>

        {/* Email Input */}
        <div className="relative mb-4">
          <input
            type="email"
            id="email"
            value={registerInfo.email || ""}
            onChange={handleChange}
            placeholder=" "
            className={`peer mt-4 w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-2 text-sm text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Email Address
          </label>
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Mobile Number Input */}
        <div className="relative mb-4">
          <input
            type="text"
            id="mobile"
            value={registerInfo.mobile || ""}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full px-3 py-2 border ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.mobile ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          <label
            htmlFor="mobile"
            className="absolute left-3 top-2 text-sm text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Mobile Number
          </label>
          {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
        </div>

        <h1 className="text-gray-500">Set a Password</h1>

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type="password"
            id="password"
            value={registerInfo.password || ""}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-2 text-sm text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Create a Password
          </label>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div className="relative mb-4">
          <input
            type="password"
            id="confirmPassword"
            value={registerInfo.confirmPassword || ""}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full px-3 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          <label
            htmlFor="confirmPassword"
            className="absolute left-3 top-2 text-sm text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Confirm Your Password
          </label>
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create your account
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By clicking 'Create your account', you are agreeing to our
          <a href="#" className="text-blue-600 hover:underline"> Terms & Conditions </a>
          and
          <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
