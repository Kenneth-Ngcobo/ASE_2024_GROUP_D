"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, getSession, signOut } from "next-auth/react";
import Link from "next/link";

/**
* UserModal is a component that handles user authentication and registration.
* It provides a modal interface for users to log in, sign up, or log out.
*
* @param {Object} props - The component's props.
* @param {boolean} props.show - A boolean indicating whether the modal should be displayed.
* @param {function} props.onClose - A function to be called when the modal should be closed.
*
* @returns {JSX.Element} - The UserModal component.
*/
export default function UserModal({ show, onClose }) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });
  const [authMode, setAuthMode] = useState("signup");
  const [authState, setAuthState] = useState({
    isLoading: false,
    loggedInUser: null,
    isVerifyingGoogle: false,
    isLoggingOut: false,
    isConfirmingLogout: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedEmail = localStorage.getItem("loggedInUserEmail");
      if (storedEmail) {
        setAuthState((prev) => ({ ...prev, loggedInUser: storedEmail }));
      }

      const session = await getSession();
      if (session?.user?.email) {
        localStorage.setItem("loggedInUserEmail", session.user.email);
        setAuthState((prev) => ({ ...prev, loggedInUser: session.user.email }));
      }
    };

    initializeAuth();
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isVerifyingGoogle: true }));
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.ok) {
        const session = await getSession();
        if (session?.user?.email) {
          const response = await fetch("/api/auth/google-signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: session.user.email,
              fullName: session.user.name,
              image: session.user.image,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to process Google sign-in");
          }

          localStorage.setItem("loggedInUserEmail", session.user.email);
          setAuthState((prev) => ({
            ...prev,
            loggedInUser: session.user.email,
            isVerifyingGoogle: false,
          }));
          alert("Signed in successfully!");
          onClose();
        } else {
          alert("Error: Unable to retrieve email.");
        }
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Error signing in with Google");
    } finally {
      setAuthState((prev) => ({ ...prev, isVerifyingGoogle: false }));
    }
  }, [onClose]);

  const handleSubmit = useCallback(async () => {
    const fieldsToCheck =
      authMode === "signup"
        ? ["fullName", "email", "phoneNumber", "password"]
        : ["email", "password"];

    const emptyFields = fieldsToCheck.filter(
      (field) => !formState[field] || formState[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      alert("All fields are required");
      return;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (authMode === "login") {
        const result = await signIn("credentials", {
          email: formState.email,
          password: formState.password,
          redirect: false,
        });

        if (result?.error) {
          alert("Login failed. Please check your credentials.");
          return;
        }
        alert("Logged in successfully!");
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formState.fullName,
            email: formState.email,
            phoneNumber: formState.phoneNumber,
            password: formState.password,
          }),
        });

        if (!response.ok) {
          const result = await response.json();
          alert(result.message || "Sign-up failed. Please try again.");
          return;
        }
        alert("Signed up successfully!");
      }

      localStorage.setItem("loggedInUserEmail", formState.email);
      setAuthState((prev) => ({ ...prev, loggedInUser: formState.email }));
      router.push("/");
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [authMode, formState, router, onClose]);
  const handleLogout = () =>
    setAuthState((prev) => ({ ...prev, isConfirmingLogout: true }));

  const confirmLogout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoggingOut: true }));
    try {
      localStorage.removeItem("loggedInUserEmail");

      await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      setAuthState({
        isLoading: false,
        loggedInUser: null,
        isVerifyingGoogle: false,
        isLoggingOut: false,
        isConfirmingLogout: false,
      });

      alert("Logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error logging out. Please try again.");
    } finally {
      setAuthState((prev) => ({ ...prev, isLoggingOut: false }));
    }
  }, [router]);

  const cancelLogout = () =>
    setAuthState((prev) => ({ ...prev, isConfirmingLogout: false }));

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");

    setFormState({
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
    });
  };

  if (!show) return null;

return (

    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex justify-end z-50">
      <div className="bg-white dark:bg-[var(--background)] text-[var(--text)] w-96 p-6 rounded-l-3xl shadow-lg relative">
        <button
          onClick={onClose}
          className="text-gray-600 dark:text-[var(--accent)] hover:text-teal-500 dark:hover:text-teal-300 font-medium uppercase text-sm"
        >
          &times;
        </button>
  
        {authState.loggedInUser ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {authState.loggedInUser}!
            </h2>
            <Link href="/editdetails">
              <button
                onClick={onClose}
                className="w-full bg-[var(--secondary)] dark:bg-[var(--secondary)] text-white py-3 rounded-md mb-4"
              >
                Go to Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-[var(--primary)] dark:bg-[var(--primary)] text-white py-3 rounded-md mb-4"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="w-full border dark:border-[var(--accent)] rounded-md py-3 flex items-center justify-center mb-4"
              disabled={authState.isVerifyingGoogle}
            >
              {authState.isVerifyingGoogle ? (
                "Verifying..."
              ) : (
                <>
                  <Image
                    src="/google.svg"
                    alt="Google icon"
                    width={20}
                    height={20}
                    className="w-5 mr-2"
                  />
                  Continue with Google
                </>
              )}
            </button>
  
            <div className="text-center text-gray-500 dark:text-[var(--accent)] mb-4">OR</div>
  
            <h2 className="text-2xl text-[var(--secondary)] dark:text-[var(--secondary)] font-bold text-center mb-4">
              {authMode === "login" ? "Login" : "Sign Up"}
            </h2>
  
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
              className="w-full border dark:border-[var(--accent)] rounded-md p-3 text-gray-700 dark:text-[var(--text)] dark:bg-[var(--background)] mb-4"
            />
  
            {authMode === "signup" && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formState.fullName}
                  onChange={handleInputChange}
                  className="w-full border dark:border-[var(--accent)] rounded-md p-3 text-gray-700 dark:text-[var(--text)] dark:bg-[var(--background)] mb-4"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formState.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border dark:border-[var(--accent)] rounded-md p-3 text-gray-700 dark:text-[var(--text)] dark:bg-[var(--background)] mb-4"
                />
              </>
            )}
  
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleInputChange}
              className="w-full border dark:border-[var(--accent)] rounded-md p-3 text-gray-700 dark:text-[var(--text)] dark:bg-[var(--background)] mb-4"
            />
  
            <button
              onClick={handleSubmit}
              className="w-full bg-[var(--secondary)] hover:bg-[var(--accent)] dark:bg-[var(--secondary)] text-white py-3 rounded-md mb-4"
              disabled={authState.isLoading}
            >
              {authState.isLoading
                ? authMode === "login"
                  ? "Logging in..."
                  : "Signing up..."
                : authMode === "login"
                  ? "Login"
                  : "Sign Up"}
            </button>
  
            <div className="text-center mb-4">
              <span className="text-gray-600 dark:text-[var(--accent)]">
                {authMode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </span>
              <button
                onClick={toggleAuthMode}
                className="text-[var(--secondary)] dark:text-[var(--secondary)] hover:underline ml-1"
              >
                {authMode === "login" ? "Sign Up" : "Login"}
              </button>
            </div>
          </>
        )}
  
        {authState.isConfirmingLogout && (
          <div className="text-center mt-4">
            {authState.isLoggingOut ? (
              <p className="dark:text-[var(--text)]">Logging out...</p>
            ) : (
              <>
                <p className="dark:text-[var(--text)]">Are you sure you want to log out?</p>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={confirmLogout}
                    className="bg-teal-700 dark:bg-teal-900 text-white px-4 py-2 rounded-md"
                  >
                    Yes
                  </button>
                  <button
                    onClick={cancelLogout}
                    className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};