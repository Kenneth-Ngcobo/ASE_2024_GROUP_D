"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner"; // Importing the LoadingSpinner component

export default function EditDetails() {
  const { logout } = useAuth();
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "Not set",
    password: "********",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
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
              phoneNumber: data.phoneNumber || "", // Include phone number
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("loggedInUserEmail");
      alert("Logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-teal-700 text-white p-6 space-y-12">
        <h1 className="text-3xl font-semibold mb-8">KWAMAIMAI</h1>
        <div className="mb-12">
          <p className="text-2xl">Account:</p>
          <p className="text-lg opacity-75 mt-2">
            Logged in as {userDetails.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-md mb-8"
        >
          Log Out
        </button>
        <Link
          href="/"
          className="text-lg text-center block mt-8 hover:underline"
        >
          Back to Website
        </Link>
      </div>

      {/* Right Profile Edit Section */}
      <main className="w-3/4 p-8 space-y-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back!
          </h2>
          <p className="text-sm text-gray-500">{userDetails.email}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

          {isEditing ? (
            <div className="space-y-6">
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

              <label className="block">
                <span className="block text-sm font-medium text-gray-700">
                  Password:
                </span>
                <input
                  type="password"
                  name="password"
                  value={
                    userDetails.password === "********"
                      ? ""
                      : userDetails.password
                  }
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </label>

              <div className="flex space-x-4">
                <button
                  onClick={handleUpdate}
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
            </div>
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
                onClick={handleToggleEdit}
                className="w-full bg-teal-700 text-white py-3 rounded-md font-semibold hover:bg-teal-800 transition duration-200 ease-in-out"
              >
                Edit Details
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
