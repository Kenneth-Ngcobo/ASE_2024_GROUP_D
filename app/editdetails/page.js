"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";

export default function EditDetails() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "Not set",
    password: "********",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (loggedInUserEmail) {
        setUserDetails((prev) => ({ ...prev, email: loggedInUserEmail }));

        try {
          const response = await fetch(
            `/api/auth/user/${loggedInUserEmail}/profile`
          );
          if (response.ok) {
            const data = await response.json();
            setUserDetails({
              email: data.email,
              fullName: data.fullName || "Not set",
              password: "********",
              phoneNumber: data.phoneNumber || "",
            });
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (!loggedInUserEmail) throw new Error("User email not found");

      const response = await fetch(
        `/api/auth/user/${loggedInUserEmail}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userDetails.email,
            fullName: userDetails.fullName,
            phoneNumber: userDetails.phoneNumber,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to update user details");
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update");
    }
    handleToggleEdit();
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-xl p-6 w-96">
            <h1 className="text-3xl font-semibold text-teal-700 mb-4">
              KWAMAIMAI
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Logged in as:{" "}
              <span className="font-semibold">{userDetails.email}</span>
            </p>

            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

            {isEditing ? (
              <form className="space-y-6" onSubmit={handleUpdate}>
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700">
                    Full Name:
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700">
                    Email:
                  </span>
                  <input
                    type="text"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    disabled
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-700">
                    Phone Number:
                  </span>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userDetails.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Enter your phone number"
                  />
                </label>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-teal-700 text-white py-3 rounded-md font-semibold hover:bg-teal-800 transition duration-200 ease-in-out"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-400 transition duration-200 ease-in-out"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-gray-600">
                  Full Name: {userDetails.fullName}
                </p>
                <p className="text-lg text-gray-600">
                  Email: {userDetails.email}
                </p>
                <p className="text-lg text-gray-600">
                  Phone Number: {userDetails.phoneNumber || "Not set"}
                </p>
                <p className="text-lg text-gray-600">Password: ********</p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-teal-700 text-white py-3 rounded-md font-semibold hover:bg-teal-800 transition duration-200 ease-in-out"
                >
                  Edit Details
                </button>
              </div>
            )}

            <button
              onClick={handleClose}
              className="w-full mt-4 bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
