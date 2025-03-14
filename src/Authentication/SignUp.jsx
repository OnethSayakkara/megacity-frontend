import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import map2 from "../assets/images/map2.png";
import axios from "axios"; // Import axios for API calls

const SignUp = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    userName: "",
    password: "",
    confirmPassword: "",
    customerPhone: "",
    countryCode: "+94", // Default to Sri Lanka
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(true); // Track username availability
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); // Track if username check is in progress

  const countryCodes = [
    { code: "+94", name: "Sri Lanka" },
    { code: "+91", name: "India" },
    { code: "+44", name: "UK" },
    { code: "+39", name: "Italy" },
    { code: "+1", name: "USA" },
    { code: "+7", name: "Russia" },
  ];

  // Function to check username availability
  const checkUsernameAvailability = async (userName) => {
    if (!userName) {
      setUsernameAvailable(true); // Reset availability if the field is empty
      return;
    }

    setIsCheckingUsername(true); // Start checking
    try {
      const response = await axios.get("http://localhost:8080/auth/checkUsername", {
        params: { userName: userName },
      });
      setUsernameAvailable(!response.data.exists); // Set availability based on response
    } catch (error) {
      console.error("Error checking username availability:", error);
      setUsernameAvailable(false); // Assume username is not available if there's an error
    } finally {
      setIsCheckingUsername(false); // Stop checking
    }
  };

  // Check username availability whenever the username changes
  const handleUsernameChange = (e) => {
    const userName = e.target.value;
    setFormData({ ...formData, userName });
    checkUsernameAvailability(userName); // Trigger real-time check
  };

  const validateEmail = (customerEmail) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(customerEmail).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validatePhoneNumber = (customerPhone, countryCode) => {
    const phoneRegex = {
      "+94": /^(0|\+94)?\d{9}$/, // Sri Lanka (with or without +94 or 0)
      "+91": /^(0|\+91)?\d{10}$/, // India (with or without +91 or 0)
      "+44": /^(0|\+44)?\d{10}$/, // UK (with or without +44 or 0)
      "+39": /^(0|\+39)?\d{9,10}$/, // Italy (with or without +39 or 0)
      "+1": /^(0|\+1)?\d{10}$/, // USA (with or without +1 or 0)
      "+7": /^(0|\+7)?\d{10}$/, // Russia (with or without +7 or 0)
    };
    return phoneRegex[countryCode].test(customerPhone);
  };

  const normalizePhoneNumber = (customerPhone, countryCode) => {
    // Remove leading 0 and add the country code
    const normalizedNumber = customerPhone.replace(/^0+/, ""); // Remove leading 0
    return `${countryCode}${normalizedNumber}`; // Add country code
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email address";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!validatePhoneNumber(formData.customerPhone, formData.countryCode)) {
      newErrors.customerPhone = "Invalid phone number for selected country";
    }
    if (!usernameAvailable) {
      newErrors.userName = "Username is already taken. Please choose another one.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Normalize phone number before submission
    const normalizedPhoneNumber = normalizePhoneNumber(formData.customerPhone, formData.countryCode);

    // Prepare data for submission
    const submissionData = {
      ...formData,
      customerPhone: normalizedPhoneNumber, // Save normalized phone number
    };

    try {
      // Submit data to the backend
      const response = await axios.post("http://localhost:8080/auth/createCustomer", submissionData);
      console.log("Customer created successfully:", response.data);
      // Handle success (e.g., redirect to login page)
      alert("Account created successfully!"); // Show success message
    } catch (error) {
      console.error("Error creating customer:", error);
      if (error.response && error.response.data) {
        setErrors({ ...errors, backend: error.response.data });
        alert("Error creating account. Please try again."); // Show error message
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${map2})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden w-[750px] mt-6">
        {/* Header */}
        <div className="py-8 px-4 sm:px-10 ">
          <h2 className="text-center text-4xl font-bold tracking-tight text-black font-grotesk">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-md text-gray-500 font-grotesk">
            Join us for a better taxi experience
          </p>
        </div>
        {/* Form */}
        <div className="py-8 px-10 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Grid for two inputs per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 font-grotesk"
                >
                  Full Name
                </label>
                <div className="mt-1 relative shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="customerName"
                    id="customerName"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 font-grotesk focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="John Doe"
                    value={formData.customerName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="customerEmail"
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
                    name="customerEmail"
                    id="customerEmail"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 font-grotesk focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="you@example.com"
                    value={formData.customerEmail}
                    onChange={handleChange}
                  />
                </div>
                {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>}
              </div>
              {/* Phone Number */}
              <div>
                <label
                  htmlFor="customerPhone"
                  className="block text-sm font-medium text-gray-700 font-grotesk"
                >
                  Phone Number
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="inline-flex items-center px-3 border border-r-0 font-grotesk border-gray-300 bg-gray-50 text-gray-500 text-sm"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    </div>
                    <input
                      type="tel"
                      name="customerPhone"
                      id="customerPhone"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 font-grotesk focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      placeholder="1234567890"
                      value={formData.customerPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>}
              </div>
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
                    onChange={handleUsernameChange} // Use the new handler
                  />
                </div>
                {isCheckingUsername && (
                  <p className="text-gray-500 text-sm mt-1">Checking username availability...</p>
                )}
                {!isCheckingUsername && !usernameAvailable && (
                  <p className="text-red-500 text-sm mt-1">Username is already taken. Please choose another one.</p>
                )}
                {!isCheckingUsername && usernameAvailable && formData.userName && (
                  <p className="text-green-500 text-sm mt-1">Username is available!</p>
                )}
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 font-grotesk"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    className="block w-full font-grotesk pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center font-grotesk py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-Orangepeel hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Create Account
              </button>
            </div>
            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600 font-grotesk">Already have an account?</span>{" "}
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

export default SignUp;