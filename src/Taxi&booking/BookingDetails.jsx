import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MapPin, CalendarDays, Clock, Car, User  } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import map2 from "../assets/images/map2.png";

export const BookingDetails = () => {
  const location = useLocation();
  const { booking } = location.state || {};
  const mapRef = useRef(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/auth/${categoryId}`);
      setCategoryDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch category details:", error);
    } finally {
      setLoading(false);
    }
  };

  const initMap = () => {
    if (!window.google || !booking) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 100,
      center: { lat: booking.pickupLatitude, lng: booking.pickupLongitude },
      // Default map colors (no custom styles)
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map,
      polylineOptions: { strokeColor: "#000000", strokeWeight: 4 }, // Optional: Keep or remove
    });

    directionsService.route(
      {
        origin: booking.pickupLocation,
        destination: booking.destination,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  useEffect(() => {
    if (!booking) return;

    fetchCategoryDetails(booking.categoryId);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3WC4ofY-qZw1skED-PgJthpJBj7IImyw&libraries=places`;
    script.async = true;
    script.onload = initMap;
    script.onerror = () => console.error("Failed to load Google Maps script");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [booking]);

  if (!booking) {
    return (
      <div className="text-center mt-10 font-grotesk text-gray-800">
        No booking data available.
      </div>
    );
  }

  const waitingJson = {
    status: "Waiting for Driver",
    bookingId: "Pending",
    message: "Please wait while we assign a driver to your booking.",
  };

  return (
    <div className="min-h-screen bg-gray-100 font-grotesk">
      <Header />

      {/* Hero Section with Map */}
      <div className="w-full h-[550px] relative">
        <div ref={mapRef} className="w-full h-full"></div>
        <div className="absolute top-6 left-6 p-6 rounded-sm">
          <h1 className="text-3xl font-bold mb-2">Your Booking Route</h1>
          <p className="flex items-center gap-2">
            <MapPin className="" size={20} />
            {booking.pickupLocation} → {booking.destination}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div
        className="container mx-auto py-16 px-6"
        style={{
          backgroundImage: `url(${map2})`,
          backgroundPosition: "-250px -290px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Booking Info */}
          <div className="ml-10">
            <h2 className="text-3xl font-bold text-[#ff9900] mb-6">Booking Details</h2>

            {/* Total Road Distance */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Road Distance</h3>
              <p className="text-gray-600">{booking.distance || "Not calculated"}</p>
            </div>

            {/* Vehicle Category */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Car className="text-[#ff9900]" size={24} /> Vehicle Category
              </h3>
              {loading ? (
                <p className="text-gray-600">Loading category details...</p>
              ) : categoryDetails ? (
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Name:</strong> {categoryDetails.categoryName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Price per KM:</strong> {categoryDetails.pricePerKm} LKR
                  </p>
                  {categoryDetails.categorypic && (
                    <img
                      src={categoryDetails.categorypic}
                      alt={categoryDetails.categoryName}
                      className="w-40 h-40 object-cover rounded-sm mt-2"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-600">Failed to load category details.</p>
              )}
            </div>

            {/* Submitted Data */}
            <div className="mb-8">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Submitted Data</h3>
  <div className=" p-6 rounded-lg shadow-lg text-white">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <User className="text-[#ff9900]" size={20} />
        <p><strong>Name:</strong> {booking.customerName}</p>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="text-[#ff9900]" size={20} />
        <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="text-[#ff9900]" size={20} />
        <p><strong>Destination:</strong> {booking.destination}</p>
      </div>
      <div className="flex items-center gap-3">
        <CalendarDays className="text-[#ff9900]" size={20} />
        <p><strong>Date:</strong> {booking.bookingDate}</p>
      </div>
      <div className="flex items-center gap-3">
        <Clock className="text-[#ff9900]" size={20} />
        <p><strong>Time:</strong> {booking.bookingTime}</p>
      </div>
    </div>
  </div>
</div>
          </div>

          {/* Right: Waiting Status */}
          <div className="mr-10">
            <h2 className="text-3xl font-bold text-[#ff9900] mb-6">Booking Status</h2>
            <div className="bg-black/85 p-6 rounded-sm text-white">
              <p className="text-[#ff9900] font-bold text-lg mb-4">Waiting for Driver</p>
              <pre className="bg-gray-900 p-4 rounded-sm text-sm">
                {JSON.stringify(waitingJson, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};