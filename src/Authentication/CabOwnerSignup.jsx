import { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import map2 from "../assets/images/map2.png";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/images/loadingAnimation.json";
import { useNavigate } from "react-router-dom";

const CabOwnerSignup = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    contactNumber: "",
    cabModel: "",
    numberPlate: "",
    category: "",
    ownDrive: false,
    licenseImage: null,
    driverImage: null,
    cabLocation: "",
    cabLatitude: null,
    cabLongitude: null,
    carImage: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // New state for categories
  const navigate = useNavigate();

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/getallcategories");
      setCategories(response.data); // Assuming response.data is an array of Category objects
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrors({ categories: "Failed to load categories. Please try again." });
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^(?:\+94|0)[0-9]{9}$/;
    return re.test(phone);
  };

  const validateNumberPlate = (plate) => {
    const re = /^[A-Z]{3}-[0-9]{4}$/;
    return re.test(plate);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let processedValue = value;

    if (name === "numberPlate") {
      processedValue = value.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : processedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner Name is required";
    if (!validateEmail(formData.ownerEmail)) newErrors.ownerEmail = "Invalid email format";
    if (!validatePhone(formData.contactNumber)) newErrors.contactNumber = "Invalid phone number (+94 or 0 followed by 9 digits)";
    if (!formData.cabModel.trim()) newErrors.cabModel = "Cab Model is required";
    if (!validateNumberPlate(formData.numberPlate)) newErrors.numberPlate = "Invalid format (e.g., ABC-1234)";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.carImage) newErrors.carImage = "Car image is required";
    if (!formData.cabLocation || !formData.cabLatitude || !formData.cabLongitude) {
      newErrors.cabLocation = "Please select a valid location";
    }
    if (formData.ownDrive) {
      if (!formData.licenseImage) newErrors.licenseImage = "License image is required when driving yourself";
      if (!formData.driverImage) newErrors.driverImage = "Driver image is required when driving yourself";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      const userName = formData.ownerName.split(" ")[0];

      formDataToSend.append("imageUrl", formData.carImage);
      formDataToSend.append("cabModel", formData.cabModel);
      formDataToSend.append("Numberplate", formData.numberPlate);
      formDataToSend.append("companyStatus", "Pending");
      formDataToSend.append("availabilityStatus", "Unavailable");
      formDataToSend.append("ownDrive", formData.ownDrive.toString());
      formDataToSend.append("ownerName", formData.ownerName);
      formDataToSend.append("ownerEmail", formData.ownerEmail);
      formDataToSend.append("password", "1234");
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("userName", userName);
      formDataToSend.append("categoryId", formData.category); // Sending categoryId
      formDataToSend.append("cabLocation", formData.cabLocation);
      formDataToSend.append("cabLatitude", formData.cabLatitude.toString());
      formDataToSend.append("cabLongitude", formData.cabLongitude.toString());

      if (formData.ownDrive) {
        formDataToSend.append("licenseImage", formData.licenseImage);
        formDataToSend.append("driverImage", formData.driverImage);
      }

      const response = await axios.post(
        "http://localhost:8080/auth/registercab",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", response.data);

      setTimeout(() => {
        setLoading(false);
        alert("Registration successful! Redirecting to home page...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setFormData({
          ownerName: "",
          ownerEmail: "",
          contactNumber: "",
          cabModel: "",
          numberPlate: "",
          category: "",
          ownDrive: false,
          licenseImage: null,
          driverImage: null,
          cabLocation: "",
          cabLatitude: null,
          cabLongitude: null,
          carImage: null,
        });
      }, 5000);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setLoading(false);
      setErrors({ submit: "Registration failed: " + (error.response?.data?.message || "Please try again.") });
    }
  };

  const initAutocomplete = () => {
    const input = document.getElementById("cabLocation");
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ["geocode"],
      componentRestrictions: { country: "lk" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        setErrors((prev) => ({ ...prev, cabLocation: "Please select a valid location" }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        cabLocation: place.formatted_address,
        cabLatitude: place.geometry.location.lat(),
        cabLongitude: place.geometry.location.lng(),
      }));
      setErrors((prev) => ({ ...prev, cabLocation: "" }));
    });
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3WC4ofY-qZw1skED-PgJthpJBj7IImyw&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${map2})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden w-[1200px] mt-6">
        <div className="py-8 px-4 sm:px-10">
          <h2 className="text-center text-4xl font-bold tracking-tight text-black font-grotesk">
            Cab Owner Signup
          </h2>
          <p className="mt-2 text-center text-md text-gray-500 font-grotesk">
            Register your cab to start your journey with us
          </p>
        </div>

        <div className="py-8 px-10">
          {loading && (
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10 overflow-hidden">
              <Lottie
                animationData={loadingAnimation}
                loop={true}
                autoplay={true}
                style={{ height: 200, width: 200 }}
              />
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Owner Name */}
              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 font-grotesk">
                  Owner Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="ownerName"
                    id="ownerName"
                    required
                    className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="John Doe"
                    value={formData.ownerName}
                    onChange={handleChange}
                  />
                </div>
                {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
              </div>

              {/* Owner Email */}
              <div>
                <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 font-grotesk">
                  Owner Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="ownerEmail"
                    id="ownerEmail"
                    required
                    className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="johndoe@example.com"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                  />
                </div>
                {errors.ownerEmail && <p className="text-red-500 text-sm mt-1">{errors.ownerEmail}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 font-grotesk">
                  Contact Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    required
                    className="block w-full pl-10 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+1234567890"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
                {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
              </div>

              {/* Cab Model */}
              <div>
                <label htmlFor="cabModel" className="block text-sm font-medium text-gray-700 font-grotesk">
                  Cab Model
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="cabModel"
                    id="cabModel"
                    required
                    className="block w-full pl-3 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Toyota Camry"
                    value={formData.cabModel}
                    onChange={handleChange}
                  />
                </div>
                {errors.cabModel && <p className="text-red-500 text-sm mt-1">{errors.cabModel}</p>}
              </div>

              {/* Number Plate */}
              <div>
                <label htmlFor="numberPlate" className="block text-sm font-medium text-gray-700 font-grotesk">
                  Number Plate
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="numberPlate"
                    id="numberPlate"
                    required
                    className="block w-full pl-3 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="ABC-1234"
                    value={formData.numberPlate}
                    onChange={handleChange}
                  />
                </div>
                {errors.numberPlate && <p className="text-red-500 text-sm mt-1">{errors.numberPlate}</p>}
              </div>

              {/* Category Dropdown */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 font-grotesk">
                  Category
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    name="category"
                    id="category"
                    required
                    className="block w-full pl-3 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Cab Location */}
            <div>
              <label htmlFor="cabLocation" className="block text-sm font-medium text-gray-700 font-grotesk">
                Cab Location
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="cabLocation"
                  id="cabLocation"
                  required
                  className="block w-full pl-3 pr-3 py-2 border font-grotesk border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter location"
                  value={formData.cabLocation}
                  onChange={handleChange}
                />
              </div>
              {errors.cabLocation && <p className="text-red-500 text-sm mt-1">{errors.cabLocation}</p>}
            </div>

            {/* Own Drive Checkbox */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="ownDrive"
                  id="ownDrive"
                  className="form-checkbox h-4 w-4 text-orange-600"
                  checked={formData.ownDrive}
                  onChange={handleChange}
                />
                <span className="ml-2 text-sm text-gray-700 font-grotesk">
                  Select this option if you will be driving the vehicle yourself and need to upload the required documents.
                </span>
              </label>
            </div>

            {/* File Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="carImage" className="block text-sm font-medium text-gray-700 font-grotesk">
                  Car Image
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    name="carImage"
                    id="carImage"
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    onChange={handleChange}
                  />
                </div>
                {errors.carImage && <p className="text-red-500 text-sm mt-1">{errors.carImage}</p>}
              </div>

              {formData.ownDrive && (
                <>
                  <div>
                    <label htmlFor="licenseImage" className="block text-sm font-medium text-gray-700 font-grotesk">
                      License Image
                    </label>
                    <div className="mt-1">
                      <input
                        type="file"
                        name="licenseImage"
                        id="licenseImage"
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.licenseImage && <p className="text-red-500 text-sm mt-1">{errors.licenseImage}</p>}
                  </div>

                  <div>
                    <label htmlFor="driverImage" className="block text-sm font-medium text-gray-700 font-grotesk">
                      Driver Image
                    </label>
                    <div className="mt-1">
                      <input
                        type="file"
                        name="driverImage"
                        id="driverImage"
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.driverImage && <p className="text-red-500 text-sm mt-1">{errors.driverImage}</p>}
                  </div>
                </>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center font-grotesk py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-Orangepeel hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CabOwnerSignup;