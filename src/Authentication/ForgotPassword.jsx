import { useState } from "react";
import { FiMail } from "react-icons/fi";
import map2 from "../assets/images/map2.png";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom"; // For navigation after submission

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Track loading state
  const [successMessage, setSuccessMessage] = useState(""); // Track success message
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Start loading
    try {
      // Submit email to the backend
      const response = await axios.post("http://localhost:8080/auth/forgot-password", { email });
      console.log("Password reset email sent:", response.data);

      // Handle success
      setSuccessMessage("Password reset email sent. Please check your inbox.");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after a delay
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error sending password reset email:", error);
      if (error.response && error.response.data) {
        setErrors({ ...errors, backend: error.response.data });
        alert("Error sending password reset email. Please try again."); // Show error message
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" }); // Clear email error when typing
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${map2})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden w-[500px] mt-24">
        {/* Header */}
        <div className="py-8 px-4 sm:px-10 ">
          <h2 className="text-center text-4xl font-bold tracking-tight text-black font-grotesk">
            Forgot Password?
          </h2>
          <p className="mt-2 text-center text-md text-gray-500 font-grotesk ">
            Enter your email to reset your password
          </p>
        </div>
        {/* Form */}
        <div className="py-8 px-10  -mt-7">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 font-grotesk"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className="w-full flex justify-center font-grotesk py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-Orangepeel hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                {loading ? "Sending..." : "Reset Password"}
              </button>
            </div>
            {/* Success Message */}
            {successMessage && (
              <div className="text-center text-sm text-green-500">
                {successMessage}
              </div>
            )}
            {/* Back to Login Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600 font-grotesk">Remember your password?</span>{" "}
              <a
                href="/login"
                className="font-medium text-Orangepeel font-grotesk hover:text-orange-600"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;