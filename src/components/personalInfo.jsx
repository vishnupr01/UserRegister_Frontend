import React, { useState } from "react";

const PersonalInfo = ({ onNext }) => {
  const [formData, setFormData] = useState({
    title: "Mr",
    fullName: "",
    dob: "",
    currentAddress: "", // Changed from 'address' to 'currentAddress'
    addressDuration: "",
    aboutYourself: "",  // Changed from 'about' to 'aboutYourself'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validate = () => {
    const newErrors = {};
    const today = new Date();
    const dobDate = new Date(formData.dob);

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    else if (dobDate >= today) newErrors.dob = "Invalid Date of Birth";
    if (!formData.currentAddress.trim()) newErrors.address = "Address is required";
    if (!formData.addressDuration.trim()) newErrors.addressDuration = "Address duration is required";
    if (formData.aboutYourself.length > 200) newErrors.about = "About section should be under 200 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("form data from personalInfo",formData);
      
      onNext(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center mb-2">Personal Information</h2>
      <p className="text-gray-500 text-center text-sm mb-4">Please answer questions as accurately as possible.</p>

      {/* Title and Full Name in a single line */}
      <div className="flex gap-2 mb-3">
        <select
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-1/4 border p-2 rounded"
        >
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
          <option value="Dr">Dr</option>
        </select>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name as per your passport"
          value={formData.fullName}
          onChange={handleChange}
          className="w-3/4 border p-2 rounded"
        />
      </div>
      {errors.fullName && <p className="text-red-500 text-sm mb-2">{errors.fullName}</p>}

      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded mb-1" />
      {errors.dob && <p className="text-red-500 text-sm mb-2">{errors.dob}</p>}

      <input type="text" name="currentAddress" placeholder="Current address" value={formData.currentAddress} onChange={handleChange} className="w-full border p-2 rounded mb-1" />
      {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}

      <input type="text" name="addressDuration" placeholder="How long have you lived at this address?" value={formData.addressDuration} onChange={handleChange} className="w-full border p-2 rounded mb-1" />
      {errors.addressDuration && <p className="text-red-500 text-sm mb-2">{errors.addressDuration}</p>}

      <textarea name="aboutYourself" placeholder="Tell us a bit about yourself (hobbies, etc.)" value={formData.aboutYourself} onChange={handleChange} className="w-full border p-2 rounded mb-1"></textarea>
      {errors.about && <p className="text-red-500 text-sm mb-2">{errors.about}</p>}

      <p className="text-xs text-gray-500 mb-4">ℹ️ All information can be edited once you have created your account.</p>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Save and Continue</button>
    </form>
  );
};

export default PersonalInfo;
