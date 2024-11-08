'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hook/useAuth";
import Link from "next/link";

export default function UserModal({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isLogin, setIsLogin] = useState(null); 
  const [prevModal, setPrevModal] = useState(null);
  const { signup, login, logout, error } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedInUserEmail");
    if (storedEmail) setLoggedInUser(storedEmail);
  }, []);

  const handleContinueWithEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    setIsCheckingUser(true);
    setPrevModal("email");

    try {
      const response = await fetch("/api/auth/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setIsLogin(true);
      } else if (response.status === 404) {
        setIsLogin(false);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleSubmit = async () => {
    if (isLogin) {
      await login(email, password);
      if (!error) {
        alert("Login successful!");
        setLoggedInUser(email);
        localStorage.setItem("loggedInUserEmail", email);
        router.push("/");
        onClose();
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } else {
      if (!firstName || !lastName || !password) {
        alert("Please fill in all fields.");
        return;
      }

      await signup(email, password, firstName, lastName); 
      if (!error) {
        alert("Sign-up successful!");
        setLoggedInUser(email);
        localStorage.setItem("loggedInUserEmail", email);
        router.push("/");
        onClose();
      } else {
        alert("Sign-up failed. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUserEmail");
    alert("Logged out successfully!");
    router.push("/");
  };

  const handleBack = () => {
    setIsLogin(null);
    setPrevModal(null);
    setEmail("");
  };

  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-96 p-6 rounded-l-3xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-2xl"
        >
          &times;
        </button>

        {isLogin !== null && prevModal && (
          <button
            onClick={handleBack}
            className="absolute top-3 left-3 text-gray-500 text-2xl"
          >
            &#8592;
          </button>
        )}

        {loggedInUser ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {loggedInUser}!
            </h2>
            <Link href="/editdetails">
              <button className="w-full bg-teal-700 text-white py-3 rounded-md mb-4">
                Edit Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 rounded-md mb-4"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            {isCheckingUser ? (
              <h2 className="text-2xl font-bold text-center mb-4">
                Verifying...
              </h2>
            ) : isLogin === null ? (
              <h2 className="text-2xl font-bold text-center mb-4">
                Sign Up or Login
              </h2>
            ) : isLogin ? (
              <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            ) : (
              <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            )}

            {/* Email Input */}
            {isLogin === null && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-3 text-gray-700 mb-4"
              />
            )}

            {/* Conditional Rendering for First Name, Lastname, and Password (only for Sign-Up) */}
            {isLogin === false && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border rounded-md p-3 text-gray-700 mb-4"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border rounded-md p-3 text-gray-700 mb-4"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md p-3 text-gray-700 mb-4"
                />
              </>
            )}

            {/* Password Input */}
            {isLogin !== null && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-3 text-gray-700 mb-4"
              />
            )}

            {/* Continue with Email Button */}
            {isLogin === null && (
              <button
                onClick={handleContinueWithEmail}
                className="w-full bg-teal-700 text-white py-3 rounded-md mb-4"
              >
                Continue with Email
              </button>
            )}

            {/* Login or Sign Up Button */}
            {isLogin !== null && (
              <button
                onClick={handleSubmit}
                className="w-full bg-teal-700 text-white py-3 rounded-md"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            )}
          </>
        )}

        <div className="text-center text-gray-500 mb-4">OR</div>

        {/* Social Login Buttons */}
        <button className="w-full border rounded-md py-3 flex items-center justify-center mb-2">
          <Image
            src="/google.svg"
            alt="Google icon"
            width={20}
            height={20}
            className="w-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="text-gray-500 text-xs text-center mt-4">
          By continuing you agree to our{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>
          . Learn how we collect, use, and share your data in our{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
