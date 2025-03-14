import { useState, useRef, useEffect } from "react";
import map2 from "../assets/images/map2.png";

const OTPForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Store OTP digits
  const inputRefs = useRef([]); // Refs for each input field
  const [errors, setErrors] = useState(""); // Track errors

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Clear errors when typing
    setErrors("");
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setErrors("Please enter a valid 4-digit OTP.");
      return;
    }
    console.log("OTP submitted:", enteredOtp);
    alert("OTP submitted successfully!"); // Replace with your logic
  };

  // Auto-focus the first input on mount
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center bg-center bg-cover"
     style={{
            backgroundImage: `url(${map2})`,
            backgroundRepeat: "no-repeat",
          }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 w-[450px] h-[380px]">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 font-grotesk">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600 mb-10 font-grotesk">
          We have sent a 4-digit OTP to your email
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref
                className="w-12 h-12 text-center text-2xl border font-grotesk border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Orangepeel focus:border-Orangepeel mb-6"
              />
            ))}
          </div>
          {/* Error Message */}
          {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 font-grotesk px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-Orangepeel hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Verify OTP
            </button>
          </div>
          {/* Resend OTP Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600 font-grotesk">Didn't receive the OTP?</span>{" "}
            <button
              type="button"
              className="font-medium text-Orangepeel hover:text-orange-60 font-grotesk"
              onClick={() => alert("Resend OTP logic here")} // Replace with your logic
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;