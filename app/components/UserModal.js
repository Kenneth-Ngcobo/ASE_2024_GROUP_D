"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hook/useAuth";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function UserModal({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [isCheckingUser, setIsCheckingUser] = useState(false); 
  const [isLogin, setIsLogin] = useState(null);
  const [prevModal, setPrevModal] = useState(null);
  const { signup, login, logout, error } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
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
    setIsLoggingIn(true);

    try {
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
        if (!fullName || !phoneNumber || !password) {
          alert("Please fill in all fields.");
          return;
        }

        await signup(email, password, fullName, phoneNumber);
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
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsConfirmingLogout(true);
  };

  const confirmLogout = async () => {
    setIsConfirmingLogout(false);
    await logout();
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUserEmail");
    alert("Logged out successfully!");
    router.push("/");
  };

  const cancelLogout = () => {
    setIsConfirmingLogout(false);
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
          className="text-gray-600 hover:text-teal-500 font-medium uppercase text-sm"
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
              <button
                onClick={onClose}
                className="w-full bg-teal-700 text-white py-3 rounded-md mb-4"
              >
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
            ) : isLoggingIn ? (
              <h2 className="text-2xl font-bold text-center mb-4">
                Logging in...
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

            {isLogin === null && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-3 text-gray-700 mb-4"
              />
            )}

            {isLogin === false && (
              <>
                <input
                  type="text"
                  placeholder="full Name"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  className="w-full border rounded-md p-3 text-gray-700 mb-4"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md p-3 text-gray-700 mb-4"
                />
                <input
                  type="phone number"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border rounded-md p-3 text-gray-700 mb-4"
                />
              </>
            )}

            {isLogin !== null && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-3 text-gray-700 mb-4"
              />
            )}

            {isLogin === null && (
              <button
                onClick={handleContinueWithEmail}
                className="w-full bg-teal-700 text-white py-3 rounded-md mb-4"
              >
                Continue with Email
              </button>
            )}

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

        <form
          action={async () => {
            await signIn("google", {
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          <button
            type="submit"
            className="w-full border rounded-md py-3 flex items-center justify-center mb-2"
          >
            <Image
              src="/google.svg"
              alt="Google icon"
              width={20}
              height={20}
              className="w-5 mr-2"
            />
            Continue with Google
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-4">
          By continuing you agree to our{" "}
          <Link href="#" className="underline">
            Terms of Use
          </Link>
          . Learn how we collect, use, and share your data in our{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      {isConfirmingLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <button
              onClick={confirmLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
            >
              Yes
            </button>
            <button
              onClick={cancelLogout}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
