"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, getSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserModal({ show, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const session = await getSession();
        const storedEmail = localStorage.getItem("loggedInUserEmail");
        
        if (session?.user?.email || storedEmail) {
          setLoggedInUser(session?.user?.email || storedEmail);
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (isLogin !== null && !formData.password) {
      setError("Password is required");
      return false;
    }
    if (isLogin === false) {
      if (!formData.fullName) {
        setError("Full name is required");
        return false;
      }
      if (!formData.phoneNumber) {
        setError("Phone number is required");
        return false;
      }
    }
    return true;
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoggingIn(true);
      setError("");
      const result = await signIn("google", { redirect: false });

      if (result?.ok) {
        const session = await getSession();
        if (session?.user?.email) {
          localStorage.setItem("loggedInUserEmail", session.user.email);
          setLoggedInUser(session.user.email);
          alert("Successfully logged in!");
          setTimeout(() => {
            router.refresh();
            onClose();
          }, 1500);
        } else {
          setError("Unable to retrieve email from Google login");
        }
      } else {
        setSuccessMessage("Veryfing");
      }
    } catch (error) {
      setError("An error occurred during Google sign-in");
      console.error("Google sign-in error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailCheck = async () => {
    if (!validateForm()) return;

    setIsCheckingUser(true);
    setError("");

    try {
      const response = await fetch("/api/auth/checkuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLogin(true);
      } else if (response.status === 404) {
        setIsLogin(false);
      } else {
        setError(data.message || "Error checking user status");
      }
    } catch (error) {
      setError("Network error. Please try again");
      console.error("Error checking user:", error);
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoggingIn(true);
    setError("");

    try {
      if (isLogin) {
        // Handle login
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
          setIsLoggingIn(false);
          return;
        }

        // Successfully logged in
        const session = await getSession();
        if (session?.user) {
          setLoggedInUser(formData.email);
          localStorage.setItem("loggedInUserEmail", formData.email);
          alert("Successfully logged in!");
          setTimeout(() => {
            router.refresh();
            onClose();
          }, 1500);
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        // Handle signup
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phoneNumber,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Auto-login after successful signup
          const loginResult = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });

          if (loginResult?.error) {
            setError("Account created but login failed. Please try logging in.");
            return;
          }

          setLoggedInUser(formData.email);
          localStorage.setItem("loggedInUserEmail", formData.email);
          alert("Successfully signed up and logged in!");
          setTimeout(() => {
            router.refresh();
            onClose();
          }, 1500);
        } else {
          setError(data.message || "Sign-up failed");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Form submission error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsConfirmingLogout(false);
      setLogoutMessage("Logging out...");
      
      await signOut({ redirect: false });
      localStorage.removeItem("loggedInUserEmail");
      setLoggedInUser(null);
      
      alert("Successfully logged out!");
      setTimeout(() => {
        setLogoutMessage("");
        router.refresh();
        onClose();
      }, 1500);
    } catch (error) {
      setError("Logout failed. Please try again");
      console.error("Logout error:", error);
      setLogoutMessage("");
    }
  };

  const handleBack = () => {
    setIsLogin(null);
    setError("");
    setFormData({
      email: formData.email,
      password: "",
      fullName: "",
      phoneNumber: "",
    });
  };

  if (!show) return null;

  const shouldShowHeader = () => {
    if (successMessage || loggedInUser || isLoggingIn) return false;
    return true;
  };

  const getHeaderText = () => {
    if (isCheckingUser) return "Verifying...";
    if (isLoggingIn) return "Processing...";
    if (isLogin === true) return "Login";
    if (isLogin === false) return "Sign Up";
    if (isLogin === null) return "Sign Up or Login";
    return "";
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-96 p-6 rounded-l-3xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-teal-500"
          aria-label="Close"
        >
          <span className="text-2xl">&times;</span>
        </button>

        {isLogin !== null && !successMessage && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-500 hover:text-teal-500"
            aria-label="Go back"
          >
            <span className="text-2xl">←</span>
          </button>
        )}

        {shouldShowHeader() && (
          <h2 className="text-2xl font-bold text-center mb-6">
            {getHeaderText()}
          </h2>
        )}

        {successMessage && (
          <div className="text-center mt-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
            <div className="text-gray-600">Redirecting...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {logoutMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {logoutMessage}
          </div>
        )}

        {!successMessage && (
          <>
            {loggedInUser ? (
              <div className="text-center mt-16">
                <h2 className="text-2xl font-semibold mb-6">
                  Welcome back!
                  <div className="text-sm text-gray-600 mt-1">{loggedInUser}</div>
                </h2>
                <Link href="/editdetails">
                  <button className="w-full bg-teal-700 text-white py-3 rounded-md mb-4 hover:bg-teal-800 transition-colors">
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={() => setIsConfirmingLogout(true)}
                  className="w-full bg-red-500 text-white py-3 rounded-md mb-4 hover:bg-red-600 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {isLogin === null && (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-3 text-gray-700"
                    disabled={isCheckingUser}
                  />
                )}

                {isLogin === false && (
                  <>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-3 text-gray-700"
                    />
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-3 text-gray-700"
                    />
                  </>
                )}

                {isLogin !== null && (
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-3 text-gray-700"
                  />
                )}

                <button
                  type="button"
                  onClick={isLogin === null ? handleEmailCheck : handleSubmit}
                  disabled={isCheckingUser || isLoggingIn}
                  className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition-colors disabled:bg-teal-300"
                >
                  {isCheckingUser ? "Checking..." :
                   isLoggingIn ? "Processing..." :
                   isLogin === null ? "Continue with Email" :
                   isLogin ? "Login" : "Sign Up"}
                </button>

                <div className="relative text-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative">
                    <span className="px-2 bg-white text-sm text-gray-500">OR</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoggingIn}
                  className="w-full border rounded-md py-3 flex items-center justify-center mb-2 hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 mr-2"
                  />
                  Continue with Google
                </button>
              </form>
            )}
          </>
        )}

        {isConfirmingLogout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsConfirmingLogout(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}