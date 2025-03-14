import { useState, useEffect } from "react";
import { CalendarDays, Clock, MapPin, Mail, User, Car, Phone } from "lucide-react";
import car2 from "../assets/images/car2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TaxiBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDestination: "",
    endDestination: "",
    category: "",
    date: "",
    time: "",
    pickupLatitude: null,
    pickupLongitude: null,
    distance: "",
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // Format: HH:MM

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/getallcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrors({ categories: "Failed to load categories" });
    }
  };

  // Initialize Google Maps Autocomplete
  const initAutocomplete = () => {
    const startInput = document.getElementById("startDestination");
    const endInput = document.getElementById("endDestination");

    const autocompleteOptions = {
      types: ["geocode"],
      componentRestrictions: { country: "lk" },
    };

    const startAutocomplete = new window.google.maps.places.Autocomplete(startInput, autocompleteOptions);
    const endAutocomplete = new window.google.maps.places.Autocomplete(endInput, autocompleteOptions);

    startAutocomplete.addListener("place_changed", () => {
      const place = startAutocomplete.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          startDestination: place.formatted_address,
          pickupLatitude: place.geometry.location.lat(),
          pickupLongitude: place.geometry.location.lng(),
        }));
        setErrors((prev) => ({ ...prev, startDestination: "" }));
        if (formData.endDestination) {
          calculateDistance(place.formatted_address, formData.endDestination);
        }
      } else {
        setErrors((prev) => ({ ...prev, startDestination: "Please select a valid location" }));
      }
    });

    endAutocomplete.addListener("place_changed", () => {
      const place = endAutocomplete.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          endDestination: place.formatted_address,
        }));
        setErrors((prev) => ({ ...prev, endDestination: "" }));
        if (formData.startDestination) {
          calculateDistance(formData.startDestination, place.formatted_address);
        }
      } else {
        setErrors((prev) => ({ ...prev, endDestination: "Please select a valid location" }));
      }
    });
  };

  // Calculate road distance using Google Maps Distance Matrix API
  const calculateDistance = (origin, destination) => {
    if (!origin || !destination) {
      console.log("Missing origin or destination:", { origin, destination });
      return;
    }
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      setErrors((prev) => ({ ...prev, distance: "Google Maps API not available" }));
      return;
    }

    console.log("Calculating distance between:", origin, "and", destination);
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        console.log("Distance Matrix Response:", { status, response });
        if (status === "OK" && response.rows[0].elements[0].status === "OK") {
          const distance = response.rows[0].elements[0].distance.text; // e.g., "10.5 km"
          console.log("Distance calculated:", distance);
          setFormData((prev) => ({ ...prev, distance }));
          setErrors((prev) => ({ ...prev, distance: "" }));
        } else {
          const errorMsg = response?.rows[0]?.elements[0]?.status || status;
          console.error("Distance Matrix Error:", errorMsg);
          setErrors((prev) => ({ ...prev, distance: `Unable to calculate distance: ${errorMsg}` }));
        }
      }
    );
  };

  useEffect(() => {
    fetchCategories();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAe8qybKlyLJc7fAC3s-0NwUApOPYRILCs&libraries=places&callback=initAutocomplete`;
    script.async = true;
    script.onerror = () => console.error("Failed to load Google Maps script");
    window.initAutocomplete = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.initAutocomplete;
    };
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^(?:\+94|0)[0-9]{9}$/;
    return re.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate < currentDate) {
      alert("Please select a date in the future.");
      setFormData((prev) => ({ ...prev, date: currentDate }));
      return;
    }
    setFormData((prev) => ({ ...prev, date: selectedDate, time: "" }));
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const selectedDate = formData.date || currentDate;
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (selectedDateTime < now) {
      alert("Please select a time in the future.");
      setFormData((prev) => ({ ...prev, time: "" }));
      return;
    }
    setFormData((prev) => ({ ...prev, time: selectedTime }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    if (!validatePhone(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.startDestination.trim()) newErrors.startDestination = "Start destination is required";
    if (!formData.endDestination.trim()) newErrors.endDestination = "End destination is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (formData.date && formData.time && new Date(`${formData.date}T${formData.time}`) < now) {
      newErrors.time = "Cannot book a time in the past";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const bookingData = {
      customerName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      pickupLocation: formData.startDestination,
      destination: formData.endDestination,
      categoryId: formData.category,
      bookingDate: formData.date,
      bookingTime: formData.time,
      pickupLatitude: formData.pickupLatitude,
      pickupLongitude: formData.pickupLongitude,
      distance: formData.distance,
      status: "PENDING",
      bookingType: "city ride",
      totalPrice: null,
      cabId: null,
      driverId: null,
      customerId: null,
    };

    console.log("Booking submitted:", bookingData);

    try {
      const response = await axios.post("http://localhost:8080/auth/addbooking", bookingData, {
        headers: {
          "Content-Type": "application/json",
          // Uncomment and add token if authentication is required
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Backend response:", response.data);
      alert("Booking successfully submitted!");
      navigate("/bookingdetails", { state: { booking: bookingData } });
      setFormData({
        name: "",
        email: "",
        phone: "",
        startDestination: "",
        endDestination: "",
        category: "",
        date: "",
        time: "",
        pickupLatitude: null,
        pickupLongitude: null,
        distance: "",
      });
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      setErrors({ submit: "Failed to submit booking. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex w-full h-[550px] relative mt-16 bg-white"
      style={{
        clipPath: "polygon(0% 0%, 75% 0%, 80% 16%, 100% 16%, 100% 100%, 0% 100%)",
      }}
    >
      <div className="relative z-10 flex w-full">
        {/* Left Section with Taxi Image */}
        <div className="w-[300px] bg-[#ff9900] relative overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff9900]/20 to-[#ff9900]/0" />
        </div>
        <img
          src={car2}
          alt="Yellow Taxi"
          className="absolute z-20 mt-24 -ml-44 w-[600px] h-auto object-contain"
        />

        {/* Right Section with Form */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-black/85" />
          <div className="relative z-10 p-12 max-w-5xl mt-12 ml-36">
            <div className="flex items-center gap-2 text-[#ff9900] mb-4">
              <div className="h-px flex-1 max-w-[200px] bg-[#ff9900]" />
              <h3 className="text-sm font-medium tracking-wider">ONLINE BOOKING</h3>
            </div>
            <h2 className="text-4xl font-bold text-white mb-8">Book Your Taxi Ride</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 mb-6">
              {/* Row 1 */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-4 rounded-sm text-white placeholder-gray-400 border border-transparent focus:border-[#ff9900] transition-colors outline-none"
                  />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="relative">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-4 rounded-sm text-white placeholder-gray-400 border border-transparent focus:border-[#ff9900] transition-colors outline-none"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-4 rounded-sm text-white placeholder-gray-400 border border-transparent focus:border-[#ff9900] transition-colors outline-none"
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              {/* Row 2 */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    id="startDestination"
                    name="startDestination"
                    placeholder="Pick-up Location"
                    value={formData.startDestination}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-4 rounded-sm text-white placeholder-gray-400 border border-transparent focus:border-[#ff9900] transition-colors outline-none"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.startDestination && <p className="text-red-500 text-sm mt-1">{errors.startDestination}</p>}
              </div>
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    id="endDestination"
                    name="endDestination"
                    placeholder="Destination"
                    value={formData.endDestination}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-4 rounded-sm text-white placeholder-gray-400 border border-transparent focus:border-[#ff9900] transition-colors outline-none"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.endDestination && <p className="text-red-500 text-sm mt-1">{errors.endDestination}</p>}
              </div>
              <div className="relative">
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-4 rounded-sm text-white placeholder-gray-400 border border-transparent focus:border-[#ff9900] transition-colors outline-none appearance-none"
                  >
                    <option className="text-black font-grotesk p-7" value="">Select Category</option>
                    {categories.map((cat) => (
                      <option className="text-black font-grotesk p-7" key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                  <Car className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
              {/* Row 3 */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    min={currentDate}
                    className="w-full bg-white/10 p-4 rounded-sm text-white border border-transparent focus:border-[#ff9900] transition-colors outline-none"
                  />
                  <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              <div className="relative">
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleTimeChange}
                    min={formData.date === currentDate ? currentTime : "00:00"}
                    step="300"
                    className="w-full bg-white/10 p-4 rounded-sm text-white border border-transparent focus:border-[#ff9900] transition-colors outline-none"
                  />
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ff9900]" />
                </div>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-[60px] bg-[#ff9900] text-white py-4 px-8 rounded-sm hover:bg-[#e68a00] transition-colors text-lg font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Booking..." : "Book Your Taxi"}
              </button>
            </form>
            {formData.distance && <p className="text-white mt-4">Distance: {formData.distance}</p>}
            {errors.distance && <p className="text-red-500 text-sm mt-4">{errors.distance}</p>}
            {errors.submit && <p className="text-red-500 text-sm mt-4">{errors.submit}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};