export default function UserModal({ show, onClose }) {
  if (!show) return null;

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
            className="w-full border rounded-md p-3 text-gray-700 mb-4"
          />
          <button className="w-full bg-teal-700 text-white py-3 rounded-md mb-4">
            Continue with Email
          </button>
        </div>

        {/* Divider */}
        <div className="text-center text-gray-500 mb-4">OR</div>

        {/* Social Login Buttons */}
        <div>
          <button className="w-full border rounded-md py-3 flex items-center justify-center mb-2">
            <img
              src="/google-icon.png"
              alt="Google icon"
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
