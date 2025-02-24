import React, { useState } from "react";

const FinancialInfo = ({ onNext }) => {
  const [formData, setFormData] = useState({
    employmentStatus: "",
    savingsInvestments: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required.";
    }
    if (!formData.savingsInvestments.trim()) {
      newErrors.savings = "Savings information is required.";
    }

    setErrors(newErrors); // ✅ Update errors state
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Financial Info Submitted:", formData); // ✅ Debugging output
      onNext(formData); // ✅ Ensure this function is properly passed from the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center mb-2">
        Financial Information
      </h2>
      <p className="text-gray-500 text-center text-sm mb-4">
        All your information is stored securely.
      </p>

      <div className="mb-3">
        <select
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">What is your current employment status?</option>
          <option value="Employed">Employed</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Student">Student</option>
        </select>
        {errors.employmentStatus && (
          <p className="text-red-500 text-sm">{errors.employmentStatus}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="savingsInvestments"
          placeholder="Additional savings/investments"
          value={formData.savingsInvestments}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.savings && <p className="text-red-500 text-sm">{errors.savings}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Save and Continue
      </button>
    </form>
  );
};

export default FinancialInfo;
