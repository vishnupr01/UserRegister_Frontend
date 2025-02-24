import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findData } from "../api/user";

const SavedForm = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(email, "email...");
        const response = await findData(email);
        console.log("got response", response);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Saved Form Data</h1>

        {/* Grid Layout for Two Columns */}
        <div className="grid grid-cols-2 gap-6 border-b pb-6">
          <div className="space-y-4">
            <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {userData.phone}</p>
            <p className="text-gray-700"><strong>Full Name:</strong> {userData.personalInfo.name}</p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700"><strong>Date of Birth:</strong> {new Date(userData.personalInfo.dob).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Current Address:</strong> {userData.personalInfo.currentAddress}</p>
            <p className="text-gray-700"><strong>Employment Status:</strong> {userData.financialInfo.employmentStatus}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedForm;
