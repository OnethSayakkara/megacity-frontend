import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const TaxiList = () => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getRandomCabs = (arr, num = 3) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/getallCabs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch cabs: ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Expected an array of cabs, received: " + JSON.stringify(data));
        }
        const availableCabs = data.filter(
          (cab) => cab.availabilityStatus === "Available"
        );
        const randomCabs = getRandomCabs(availableCabs);
        setCabs(randomCabs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  const handleBookNow = (cab) => {
    navigate("/bookingform", {
      state: { cab },
    });
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg font-grotesk">
        Loading available taxis...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg font-grotesk">
        Error: {error}
      </div>
    );
  }

  if (cabs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg font-grotesk">
        No available taxis found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <p className="text-xl font-semibold text-Orangepeel font-grotesk mt-6">
          Let's go with us!
        </p>
        <h2 className="text-[40px] font-bold mb-3 text-gray-800 font-grotesk">
          Choose taxi to ride!
        </h2>
        <p className="font-grotesk text-lg mb-10 text-slate-500">
          We successfully cope with tasks of varying complexity, provide long-term
          <br />
          guarantees and regularly master new technologies.
        </p>
      </div>
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mb-20">
          {cabs.map((cab) => (
            <div
              key={cab.cabId || Math.random()}
              className="w-full max-w-[300px] bg-white rounded-sm shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={cab.imgUrl || "default-image.jpg"}
                  alt={cab.cabModel || "Unknown Model"}
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute top-3 font-grotesk right-0 bg-Orangepeel text-white py-1 px-3 text-sm font-semibold shadow-md">
                  Rs.{(cab.pricePerKm || 0).toFixed(2)} / km
                </div>
              </div>
              <div className="p-5">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 truncate font-grotesk">
                    {cab.cabModel || "N/A"}
                  </h3>
                  <div className="flex gap-2 items-center justify-center">
                    <FaLocationDot className="text-red-500" />
                    <p className="text-sm text-gray-500 uppercase tracking-wide mt-1 font-grotesk">
                      {cab.cabLocation || "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-grotesk text-base">Category:</span>
                    <span className="font-medium text-gray-800 font-grotesk text-lg">
                      {cab.categoryName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-grotesk">
                    <span className="text-gray-600 text-base">Status:</span>
                    <span className="font-medium text-gray-800 text-base">
                      {cab.availabilityStatus || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-grotesk">
                    <span className="text-gray-600 text-base font-grotesk">Ratings:</span>
                    <span className="font-medium text-gray-800">$1.50</span>
                  </div>
                </div>
                <button
                  onClick={() => handleBookNow(cab)}
                  className="w-full mt-6 bg-Orangepeel text-white font-grotesk py-2.5 px-4 font-semibold text-md hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Book Taxi Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};