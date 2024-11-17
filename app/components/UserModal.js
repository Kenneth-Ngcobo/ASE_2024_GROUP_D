"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, getSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserModal({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isLogin, setIsLogin] = useState(null); 
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedInUserEmail");
    if (storedEmail) {
      setLoggedInUser(storedEmail);
    }

    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user?.email) {
        setLoggedInUser(session.user.email);
        localStorage.setItem("loggedInUserEmail", session.user.email);
      }
    };

    fetchSession();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });

      if (result?.ok) {
        const session = await getSession();
        if (session?.user?.email) {
          localStorage.setItem("loggedInUserEmail", session.user.email);
          setLoggedInUser(session.user.email);
          onClose();
        } else {
          alert("Error: Unable to retrieve email.");
        }
      } else {
        alert("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      alert("Google sign-in failed. Please try again.");
      console.error("Google sign-in error:", error);
    }
  };

  const handleEmailCheck = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    setIsCheckingUser(true);
    try {
      const response = await fetch("/api/auth/checkuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setIsLogin(true); 
      } else if (response.status === 404) {
        setIsLogin(false); 
      } else {
        alert("Error checking user. Please try again.");
      }
    } catch (error) {
      alert("Error checking user. Please try again.");
      console.error("Error checking user:", error);
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoggingIn(true);
    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false, 
        });

        if (result?.error) {
          alert("Login failed. Please check your credentials.");
        } else {
          setLoggedInUser(email);
          localStorage.setItem("loggedInUserEmail", email);
          router.push("/");
          onClose();
        }
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, phone: phoneNumber, password }),
        });

        const result = await response.json();

        if (response.ok) {
          setLoggedInUser(email);
          localStorage.setItem("loggedInUserEmail", email);
          router.push("/");
          onClose();
        } else {
          alert(result.message || "Sign-up failed. Please try again.");
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
    localStorage.removeItem("loggedInUserEmail");
    setLoggedInUser(null);
    await signOut();
    alert("Logged out successfully!");
    router.push("/");
  };

  const cancelLogout = () => {
    setIsConfirmingLogout(false);
  };

  const handleBack = () => {
    setIsLogin(null); 
    setFullName("");
    setPhoneNumber("");
  };

  const getModalTitle = () => {
    if (isCheckingUser) return "Verifying...";
    if (isLoggingIn) return "Logging in...";
    if (isLogin === null) return "Sign Up or Login";
    return isLogin ? "Login" : "Sign Up";
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

        {isLogin !== null && (
          <button
            onClick={handleBack}
            className="absolute top-3 left-3 text-gray-500 text-2xl"
          >
            &#8592;
          </button>
        )}

        <h2 className="text-2xl font-bold text-center mb-4">{getModalTitle()}</h2>

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
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border rounded-md p-3 text-gray-700 mb-4"
                />
                <input
                  type="tel"
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
                onClick={handleEmailCheck}
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

        <button
          onClick={handleGoogleSignIn}
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

        {isConfirmingLogout && (
          <div className="text-center mt-4">
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={confirmLogout} className="bg-teal-700 text-white px-4 py-2 rounded-md">
                Yes
              </button>
              <button onClick={cancelLogout} className="bg-gray-400 text-white px-4 py-2 rounded-md">
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


