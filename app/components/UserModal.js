'use client'
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserModal({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isLogin, setIsLogin] = useState(null); 
  const [prevModal, setPrevModal] = useState(null);
  const router = useRouter();


  const handleContinueWithEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    setIsCheckingUser(true); 
    setPrevModal("email");

    try {
      const response = await fetch('/api/auth/checkuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Login successful!");
        router.push("/");
        onClose();
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } else {

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Sign up successful!");
        router.push("/");
        onClose();
      } else {
        alert("Sign-up failed. Please try again.");
      }
    }
  };


  const handleBack = () => {
    setIsLogin(null); 
    setPrevModal(null);
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

        {/* Back Button for navigation */}
        {isLogin !== null && prevModal && (
          <button
            onClick={handleBack}
            className="absolute top-3 left-3 text-gray-500 text-2xl"
          >
            &#8592; {/* Left arrow symbol */}
          </button>
        )}

        {/* Conditional Rendering for Default, Login, and Sign Up Forms */}
        {isCheckingUser ? (
          <h2 className="text-2xl font-bold text-center mb-4">Verifying...</h2>
        ) : isLogin === null ? (
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up or Login</h2>
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

        {/* Conditional Rendering for Password Input (only for Login or Sign Up) */}
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

        {/* Divider */}
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

        {/* Terms and Privacy */}
        <p className="text-gray-500 text-xs text-center mt-4">
          By continuing you agree to our{" "}
          <a href="#" className="underline">Terms of Use</a>. Learn how we collect, use, and share your data in our{" "}
          <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

