"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/loadingSpinner";

export default function EditDetails() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "Not set",
    password: "****",
    phoneNumber: "",
  });
  const [initialDetails, setInitialDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
      setUserDetails((prev) => ({ ...prev, email: loggedInUserEmail }));

      const storedDetails = localStorage.getItem("userDetails");
      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);
        setInitialDetails(parsedDetails);
        setUserDetails(parsedDetails);
        setLoading(false);
      } else {
        fetchUserData(loggedInUserEmail);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`/api/auth/user/${email}/profile`);
      if (response.ok) {
        const data = await response.json();
        setInitialDetails(data);
        setUserDetails(data);
        localStorage.setItem("userDetails", JSON.stringify(data));
      } else {
        setError("Failed to fetch user details");
      }
    } catch (error) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
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

      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      setShowSuccessMessage(true);
    } catch (error) {
      setError("Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setUserDetails({ ...initialDetails });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("userDetails");

    setUserDetails({
      email: "",
      fullName: "Not set",
      password: "****",
      phoneNumber: "",
    });

    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-[var(--background)] text-[var(--text)]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-100 dark:bg-[#111] p-8">
        <button
          onClick={() => router.push("/")}
          className="w-full bg-gray-200 dark:bg-[var(--accent)] text-gray-700 dark:text-[var(--text)] py-2 px-4 rounded-lg mb-4 text-center"
        >
          BACK TO WEBSITE
        </button>
        <div className="mt-8">
          <h2 className="text-lg text-[#fc9d4f] dark:text-[var(--secondary)] font-semibold mb-2">ACCOUNT</h2>
          <p className="text-sm text-gray-700 dark:text-[var(--accent)] mb-1">
            Signed in as:{" "}
            <span className="font-medium">{userDetails.email}</span>
          </p>
          <button 
            onClick={handleLogout} 
            className="text-[#FF4F1A] dark:text-[var(--primary)] font-medium"
          >
            LOGOUT
          </button>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-[#fc9d4f] dark:text-[var(--secondary)] mb-6">ABOUT YOU</h1>
        
        {showSuccessMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
            <p className="text-green-700 dark:text-green-300 font-medium">
              Profile updated successfully!
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
            <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        )}
        
        {isSaving ? (
          <div className="flex justify-center items-center w-full h-[500px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="bg-white dark:bg-[#111] shadow-lg dark:shadow-xl rounded-lg p-8">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700 dark:text-[var(--accent)]"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userDetails.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border dark:border-[var(--accent)] rounded-lg shadow-sm dark:bg-[var(--background)] dark:text-[var(--text)]"
                />
              </div>
  
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700 dark:text-[var(--accent)]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border dark:border-[var(--accent)] rounded-lg shadow-sm dark:bg-[var(--background)] dark:text-[var(--text)] opacity-60"
                  disabled
                />
              </div>
  
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700 dark:text-[var(--accent)]"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border dark:border-[var(--accent)] rounded-lg shadow-sm dark:bg-[var(--background)] dark:text-[var(--text)]"
                />
              </div>
  
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700 dark:text-[var(--accent)]"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border dark:border-[var(--accent)] rounded-lg shadow-sm dark:bg-[var(--background)] dark:text-[var(--text)] opacity-60"
                  disabled
                />
              </div>
  
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#fc9d4f] dark:bg-[var(--secondary)] text-white py-2 px-4 rounded-lg"
                >
                  Save Preferences
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 dark:bg-[var(--accent)] text-gray-700 dark:text-[var(--text)] py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
