import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import map2 from "../assets/images/map2.png";

const NewPasswordForm = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Password validation
    if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission (e.g., send to backend)
    console.log("New Password:", formData.newPassword);
    alert("Password updated successfully!"); // Replace with your logic
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center bg-center bg-cover"
    style={{
        backgroundImage: `url(${map2})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 w-[400px] h-[400px]">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-10 font-grotesk">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 font-grotesk"
            >
              New Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-grotesk">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                required
                className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showNewPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 font-grotesk focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 font-grotesk border border-transparent mt-5 shadow-sm text-sm font-medium text-white bg-Orangepeel hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordForm;