"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/loadingSpinner";

/**
 * EditDetails component allows users to view and update their profile details.
 * It provides a form to edit the full name, phone number, and view other details.
 * 
 * @component
 * @returns {JSX.Element} A form interface for editing user details or viewing them.
 */
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
  const [authState, setAuthState] = useState({
    isLoading: false,
    loggedInUser: null,
    isLoggingOut: false,
    isConfirmingLogout: false,
  });


  const router = useRouter();

  /**
   * Fetches the logged-in user's data from localStorage and an API endpoint.
   * Sets the user details to the state upon successful retrieval.
   * Handles errors and ensures the loading state is updated appropriately.
   */
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

  // Fetch user data from API
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

  /**
   * Handles the submission of updated user details to the server.
   * Displays a success message upon successful update.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
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

  /**
   * Handles changes to input fields in the form.
   * Updates the corresponding field in the userDetails state.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
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
    <div className="min-h-screen flex">
      <div className="w-1/4 bg-gray-100 p-8">
        <button
          onClick={() => router.push("/")}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mb-4 text-center"
        >
          BACK TO WEBSITE
        </button>
        <div className="mt-8">
          <h2 className="text-lg text-[#fc9d4f] font-semibold mb-2">ACCOUNT</h2>
          <p className="text-sm text-gray-700 mb-1">
            Signed in as:{" "}
            <span className="font-medium">{userDetails.email}</span>
          </p>
          <button onClick={handleLogout} className="text-[#FF4F1A] font-medium">
            LOGOUT
          </button>
        </div>
      </div>

      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold text-[#fc9d4f] mb-6">ABOUT YOU</h1>
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-700 font-medium">
              Profile updated successfully!
            </p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}
        {isSaving ? (
          <div className="flex justify-center items-center w-full h-[500px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
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
                  className="w-full px-4 py-3 border rounded-lg shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
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
                  className="w-full px-4 py-3 border rounded-lg shadow-sm"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
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
                  className="w-full px-4 py-3 border rounded-lg shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
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
                  className="w-full px-4 py-3 border rounded-lg shadow-sm"
                  disabled
                />
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#fc9d4f] text-white py-2 px-4 rounded-lg"
                >
                  Save Preferences
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
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
