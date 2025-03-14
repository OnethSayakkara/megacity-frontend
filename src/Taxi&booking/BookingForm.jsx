import axios from "axios"; // Import Axios
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, User, Mail, Phone } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import map2 from "../assets/images/map2.png";

export const BookingForm = () => {
  const location = useLocation();
  const cab = location.state?.cab || {};
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    customerName: "",
    email: "",
    phone: "",
    distance: 0,
    price: 0,
  });
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [pickupLatitude, setPickupLatitude] = useState(null); // For pickup latitude
  const [pickupLongitude, setPickupLongitude] = useState(null); // For pickup longitude

  useEffect(() => {
    let script;

    const loadGoogleMapsAPI = () => {
      if (window.google?.maps) {
        initializeAutoComplete();
        initializeMap();
        setIsMapLoaded(true);
        return;
      }

      script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAe8qybKlyLJc7fAC3s-0NwUApOPYRILCs&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeAutoComplete();
        initializeMap();
        setIsMapLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Google Maps API");
        setIsMapLoaded(false);
      };
    };

    loadGoogleMapsAPI();

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isMapLoaded && formData.pickupLocation && formData.dropLocation) {
      calculateDistanceAndPrice();
    }
  }, [formData.pickupLocation, formData.dropLocation, isMapLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDateTime = new Date();
    const selectedDateTime = formData.pickupDate && formData.pickupTime 
      ? new Date(`${formData.pickupDate}T${formData.pickupTime}`) 
      : null;

    // Required fields
    if (!formData.pickupLocation) newErrors.pickupLocation = "Pickup location is required";
    if (!formData.dropLocation) newErrors.dropLocation = "Drop location is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.pickupTime) newErrors.pickupTime = "Pickup time is required";
    if (!formData.customerName) newErrors.customerName = "Customer name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";

    // Past date/time validation
    if (selectedDateTime && selectedDateTime < currentDateTime) {
      newErrors.pickupDate = "Cannot select a past date or time";
      newErrors.pickupTime = "Cannot select a past date or time";
    }

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation (exactly 10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Prepare the booking data
      const bookingData = {
        customerName: formData.customerName,
        pickupLocation: formData.pickupLocation,
        destination: formData.dropLocation,
        bookingDate: formData.pickupDate,
        bookingTime: formData.pickupTime,
        email: formData.email,
        phoneNumber: formData.phone,
        status: "Pending", // Default status
        cabId: cab.cabId, // Assuming cab object has an _id field
        totalPrice: formData.price,
        distance: formData.distance,
        bookingType: "Tour Ride", // Default booking type
        categoryId: "None", // Default category ID
        DriverId: "Pending", // Default driver ID
        pickupLatitude: pickupLatitude, // Latitude from Google Places
        pickupLongitude: pickupLongitude,
        customerId:userId
    // Longitude from Google Places
      };

      // Send the booking data to the backend
      const response = await axios.post("http://localhost:8080/auth/addbooking", bookingData);
      console.log("Booking created:", response.data);
      alert("Booking confirmed!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  const initializeMap = () => {
    if (!window.google?.maps) return;

    const mapOptions = {
      center: { lat: 7.8731, lng: 80.7718 },
      zoom: 8,
    };

    const newMap = new window.google.maps.Map(document.getElementById("map"), mapOptions);
    const renderer = new window.google.maps.DirectionsRenderer({
      map: newMap,
      suppressMarkers: false,
    });

    setMap(newMap);
    setDirectionsRenderer(renderer);
  };

  const initializeAutoComplete = () => {
    if (!window.google?.maps?.places) return;

    const options = {
      types: ["geocode"],
      componentRestrictions: { country: "lk" },
    };

    const pickupInput = document.getElementById("pickupLocation");
    const dropInput = document.getElementById("dropLocation");

    if (pickupInput && dropInput) {
      const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInput, options);
      const dropAutocomplete = new window.google.maps.places.Autocomplete(dropInput, options);

      pickupAutocomplete.addListener("place_changed", () => {
        const place = pickupAutocomplete.getPlace();
        if (place.geometry) {
          setPickupLatitude(place.geometry.location.lat()); // Set pickup latitude
          setPickupLongitude(place.geometry.location.lng()); // Set pickup longitude
        }
        setFormData((prev) => ({
          ...prev,
          pickupLocation: place.formatted_address || prev.pickupLocation,
        }));
      });

      dropAutocomplete.addListener("place_changed", () => {
        const place = dropAutocomplete.getPlace();
        setFormData((prev) => ({
          ...prev,
          dropLocation: place.formatted_address || prev.dropLocation,
        }));
      });
    }
  };

  const calculateDistanceAndPrice = async () => {
    if (!map || !directionsRenderer || !window.google?.maps) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const response = await directionsService.route({
        origin: formData.pickupLocation,
        destination: formData.dropLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      if (response.status === "OK") {
        directionsRenderer.setDirections(response);
        const route = response.routes[0].legs[0];
        const distanceInKm = route.distance.value / 1000;
        const price = distanceInKm * (cab.pricePerKm || 0);

        setFormData((prev) => ({
          ...prev,
          distance: distanceInKm.toFixed(2),
          price: price.toFixed(2),
        }));

        const pickupMarker = new window.google.maps.Marker({
          position: route.start_location,
          map: map,
          label: {
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: "bold",
          },
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
            labelOrigin: new window.google.maps.Point(20, 10),
          },
        });

        const dropMarker = new window.google.maps.Marker({
          position: route.end_location,
          map: map,
          label: {
            color: "#000000",
            fontSize: "14px",
            fontWeight: "bold",
          },
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
            labelOrigin: new window.google.maps.Point(20, 10),
          },
        });

        const midPoint = route.steps[Math.floor(route.steps.length / 2)].end_location;
        const infoWindow = new window.google.maps.InfoWindow({
          content: `Distance: ${distanceInKm.toFixed(2)} km`,
          position: midPoint,
        });
        infoWindow.open(map);
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      alert("Unable to calculate route. Please check the locations.");
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getMinTime = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate.toDateString() === today.toDateString()) {
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "00:00"; // Allow any time for future dates
  };

  return (
    <div>
      <Header />
      <div
        className="min-h-screen bg-zinc-100 py-16 px-6 font-grotesk bg-inherit"
        style={{
          backgroundImage: `url(${map2})`,
          backgroundPosition: "200px -100px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center mt-40">
            Book Your Taxi Ride
          </h2>

          <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Selected Cab: {cab.cabModel || "Taxi"}
            </h3>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={cab.categorypic}
                  alt={cab.categoryName || "Category"}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200"
                />
                <p className="text-gray-600 font-grotesk text-xl">
                  Category: <span className="font-medium">{cab.categoryName}</span>
                </p>
              </div>
              <p className="text-gray-600 text-xl font-grotesk">
                Location: <span className="font-medium font-grotesk">{cab.cabLocation}</span>
              </p>
              <p className="text-gray-600 text-lg font-grotesk">
                Number Plate: <span className="font-medium font-grotesk">{cab.Numberplate}</span>
              </p>
              <p className="text-gray-600 text-xl">
                Price per Km: <span className="font-medium text-orange-500 font-grotesk">Rs. {cab.pricePerKm || 0}</span>
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Trip Details</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2">Pickup Location</label>
                  <div className="flex items-center border border-gray-300 rounded-md focus-within:border-orange-500 transition-colors">
                    <MapPin className="ml-3 text-gray-400" size={20} />
                    <input
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-2 border-none focus:outline-none bg-transparent"
                      placeholder="Enter pickup location in Sri Lanka"
                    />
                  </div>
                  {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
                </div>

                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2">Drop Location</label>
                  <div className="flex items-center border border-gray-300 rounded-md focus-within:border-orange-500 transition-colors">
                    <MapPin className="ml-3 text-gray-400" size={20} />
                    <input
                      id="dropLocation"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-2 border-none focus:outline-none bg-transparent"
                      placeholder="Enter drop location in Sri Lanka"
                    />
                  </div>
                  {errors.dropLocation && <p className="text-red-500 text-sm mt-1">{errors.dropLocation}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Pickup Date</label>
                    <div className="flex items-center border border-gray-300 rounded-md focus-within:border-orange-500 transition-colors">
                      <Calendar className="ml-3 text-gray-400" size={20} />
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        min={getMinDate()}
                        className="w-full p-3 pl-2 border-none focus:outline-none bg-transparent"
                      />
                    </div>
                    {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Pickup Time</label>
                    <div className="flex items-center border border-gray-300 rounded-md focus-within:border-orange-500 transition-colors">
                      <Clock className="ml-3 text-gray-400" size={20} />
                      <input
                        type="time"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleInputChange}
                        min={formData.pickupDate ? getMinTime(formData.pickupDate) : undefined}
                        className="w-full p-3 pl-2 border-none focus:outline-none bg-transparent"
                      />
                    </div>
                    {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2">Customer Name</label>
                  <div className="flex items-center border border-gray-300 rounded-md focus-within:border-orange-500 transition-colors">
                    <User className="ml-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-2 border-none focus:outline-none bg-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <div className="flex items-center border border-gray-300 rounded-md focus-within:border-orange-500 transition-colors">
                      <Mail className="ml-3 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-2 border-none focus:outline-none bg-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <div className="flex items-center border border-gray-300 rounded-md focus-within:border-orange-500 transition-colors">
                      <Phone className="ml-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-2 border-none focus:outline-none bg-transparent"
                        placeholder="Enter your phone number"
                        maxLength={10} // Restrict input to 10 characters
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </form>
              <div className="text-center">
          </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Route Preview</h3>
              <div id="map" className="h-[500px] w-full rounded-md border border-gray-200"></div>
            </div>
            <button
              onClick={handleSubmit} // Changed from type="submit" to onClick since it's outside the form
              className="bg-Orangepeel font-grotesk text-white py-4 px-10 rounded-sm font-semibold text-lg transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-md"
            >
              Confirm Booking
            </button>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-6 mb-8 w-[560px] ml-[590px] -mt-[90px]">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Trip Summary</h3>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-lg text-gray-700 mb-2 sm:mb-0">
                Road Distance: <span className="font-semibold">{formData.distance} km</span>
              </p>
              <p className="text-lg text-gray-700">
                Total Price: <span className="font-semibold text-orange-500">Rs. {formData.price}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingForm;