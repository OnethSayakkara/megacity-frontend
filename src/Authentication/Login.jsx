import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import map2 from "../assets/images/map2.png";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom"; // For navigation after login
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!formData.userName) {
      newErrors.userName = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Start loading
    try {
      // Submit login data to the backend
      const response = await axios.post("http://localhost:8080/auth/login", formData);
      console.log("Login successful:", response.data);

      // Handle success (e.g., save token, redirect to dashboard)
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      }); // Show success toast
      navigate("/"); // Redirect to dashboard or home page
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.data) {
        setErrors({ ...errors, backend: error.response.data });
        toast.error("Invalid username or password. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        }); // Show error toast
      } else {
        toast.error("Invalid username or password. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${map2})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden w-[500px] mt-6">
        {/* Header */}
        <div className="py-8 px-4 sm:px-10 ">
          <h2 className="text-center text-4xl font-bold tracking-tight text-black font-grotesk">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-md text-gray-500 font-grotesk">
            Sign in to continue to your account
          </p>
        </div>
        {/* Form */}
        <div className="py-8 px-10 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 font-grotesk"
              >
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  required
                  className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="johndoe123"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 font-grotesk"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {/* Forgot Password Link */}
            <div className="text-right text-sm">
              <a
                href="/forgotpassword"
                className="font-medium text-Orangepeel font-grotesk hover:text-orange-600"
              >
                Forgot Password?
              </a>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className="w-full flex justify-center font-grotesk py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-Orangepeel hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </div>
            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600 font-grotesk">Don't have an account?</span>{" "}
              <a
                href="/signup"
                className="font-medium text-Orangepeel font-grotesk hover:text-orange-600"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;