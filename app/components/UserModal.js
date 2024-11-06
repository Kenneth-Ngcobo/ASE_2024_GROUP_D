import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserModal({ show, onClose }) {
  if (!show) return null;

  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleContinueWithEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }
  
    try {
      const response = await fetch('/api/auth/checkuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.status === 200) {
        // User exists, redirect to login
        router.push('/login');
        onClose();
      } else if (response.status === 404) {
        // User not found, redirect to sign-up
        router.push('/signup');
        onClose();
      } else {
        // Handle unexpected status codes
        const errorData = await response.json();
        alert(errorData.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
          Sign In or Register
        </h2>

        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-3 text-gray-700 mb-4"
          />
          <button
            onClick={handleContinueWithEmail}
            className="w-full bg-teal-700 text-white py-3 rounded-md mb-4"
          >
            Continue with Email
          </button>
        </div>

        {/* Divider */}
        <div className="text-center text-gray-500 mb-4">OR</div>

        {/* Social Login Buttons */}
        <div>
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
        </div>

        {/* Terms and Privacy */}
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
