import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const [isAgreed, setIsAgreed] = useState(false); // State for checkbox
  const navigate = useNavigate(); // Hook for navigation

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked); // Update state based on checkbox
  };

  const handleContinue = () => {
    if (isAgreed) {
      navigate("/cabsignup"); // Navigate to cab registration form
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Last Updated: March 06, 2025
        </p>

        <section className="space-y-6 text-gray-700">
          {/* Introduction */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              1. Introduction
            </h2>
            <p className="mt-2">
              Welcome to [Your Taxi Service Name] ("we," "us," or "our"). We are
              committed to protecting your privacy and ensuring that your
              personal information is handled in a safe and responsible manner.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our website, mobile app,
              or services (collectively, the "Services").
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              2. Information We Collect
            </h2>
            <p className="mt-2">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, payment details, and account credentials when you
                register as a user or cab owner.
              </li>
              <li>
                <strong>Location Data:</strong> Real-time location when you
                book a ride or provide cab services, including cab latitude and
                longitude.
              </li>
              <li>
                <strong>Uploaded Files:</strong> Images such as license photos,
                driver photos, and car images submitted during registration.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact
                with our Services, including IP address, browser type, and
                pages visited.
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              3. How We Use Your Information
            </h2>
            <p className="mt-2">
              We use your information to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and improve our taxi booking and cab management services.</li>
              <li>Process payments and verify cab owner registrations.</li>
              <li>Match riders with available cabs based on location data.</li>
              <li>Communicate with you, including sending service updates and promotional offers.</li>
              <li>Ensure the safety and security of our platform.</li>
            </ul>
          </div>

          {/* Sharing Your Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              4. Sharing Your Information
            </h2>
            <p className="mt-2">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Cab Owners and Drivers:</strong> To facilitate ride bookings and communication.
              </li>
              <li>
                <strong>Service Providers:</strong> Third parties like Cloudinary (for image storage) and payment processors.
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to protect our rights.
              </li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information to third parties.
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              5. Data Security
            </h2>
            <p className="mt-2">
              We implement reasonable security measures to protect your data,
              such as encryption and secure servers. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              6. Your Rights
            </h2>
            <p className="mt-2">
              Depending on your location, you may have rights to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access, correct, or delete your personal information.</li>
              <li>Opt out of marketing communications.</li>
              <li>Request data portability.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at [support@email.com].
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              7. Cookies and Tracking
            </h2>
            <p className="mt-2">
              We use cookies to enhance your experience, analyze usage, and
              provide personalized content. You can manage cookie preferences
              through your browser settings.
            </p>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              8. Third-Party Services
            </h2>
            <p className="mt-2">
              Our Services integrate with third parties like Google Maps for
              location services and Cloudinary for image storage. These
              providers have their own privacy policies, which we encourage you
              to review.
            </p>
          </div>

          {/* Changes to Policy */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              9. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated "Last Updated" date.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              10. Contact Us
            </h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy, please contact
              us at:
            </p>
            <p className="mt-2">
              Email: [support@email.com] <br />
              Phone: [+94-123-456-7890] <br />
              Address: [Your Company Address]
            </p>
          </div>
        </section>

        {/* Agree Checkbox and Continue Button */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              I agree to the Privacy Policy
            </span>
          </label>
          <button
            onClick={handleContinue}
            disabled={!isAgreed}
            className={`px-6 py-2 text-white font-medium rounded-md transition-colors ${
              isAgreed
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;