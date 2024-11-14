"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditDetails() {
  const { logout } = useAuth();
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "Not set",
    password: "********",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (loggedInUserEmail) {
        setUserDetails((prev) => ({ ...prev, email: loggedInUserEmail }));

        try {
          const response = await fetch(
            `/api/user/login?email=${loggedInUserEmail}`
          );
          if (response.ok) {
            const data = await response.json();
            setUserDetails({
              email: data.email,
              fullName: data.fullName || "Not set",
              password: "********",
            });
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

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
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/"); 
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {/* Left Sidebar */}
            <div className="flex">
              <div className="w-1/3 bg-teal-700 text-white p-6">
                <h1 className="text-2xl font-semibold mb-4">KWAMAIMAI</h1>
                <div className="mb-8">
                  <p className="text-lg">Account:</p>
                  <p className="opacity-75 mt-1">Logged In As {userDetails.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 py-2 rounded-md"
                >
                  Log Out
                </button>
                <Link href="/" className="block text-center mt-6 underline">
                  Back to Website
                </Link>
              </div>

              {/* Right Profile Edit Section */}
              <div className="w-2/3 p-6">
                <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
                <p className="text-gray-500 mb-6">{userDetails.email}</p>

                <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      value={userDetails.fullName}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                      placeholder="Full Name"
                    />
                    <input
                      type="password"
                      name="password"
                      value={
                        userDetails.password === "********"
                          ? ""
                          : userDetails.password
                      }
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                      placeholder="Enter new password"
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={handleToggleEdit}
                        className="w-full bg-teal-700 text-white py-2 rounded"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="w-full bg-gray-300 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>Full Name: {userDetails.fullName}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Password: ********</p>
                    <button
                      onClick={handleToggleEdit}
                      className="w-full bg-teal-700 text-white py-2 rounded"
                    >
                      Edit Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
