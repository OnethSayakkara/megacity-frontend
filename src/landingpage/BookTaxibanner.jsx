import { PhoneCall } from "lucide-react";
import men from "../assets/images/men.png";
import texture from "../assets/images/texture.png"; // Import your texture image

const BookTaxibanner = () => {
  return (
    <div
      className="bg-zinc-800 text-white py-16 px-6 md:px-16 flex z-20 flex-col md:flex-row items-center justify-between h-[470px] relative mb-24"
      style={{
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 45%, 80% 100%, 80% 100%, 70% 100%, 60% 100%, 50% 100%, 40% 100%, 30% 100%, 1% 100%, 0% 100%)",
        backgroundImage: `url(${texture})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        }}
    >
      {/* Left Content */}
      <div className="max-w-lg text-center md:text-left relative z-10 ml-11">
        <h2 className="text-5xl font-bold mb-4 font-grotesk w-[700px]">
          Call Us Now <span className="text-Orangepeel">Book Your Taxi</span><br/> For Your Next Ride!
        </h2>
        <p className="text-gray-300 mb-6 mt-5 text-lg font-grotesk w-[600px]">
          Experience a safe, reliable, and comfortable ride with our top-rated
          taxi service. Book your next trip in seconds!
        </p>

        {/* Call Button */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="bg-Orangepeel/20 p-3 rounded-sm text-Orangepeel">
            <PhoneCall className="w-10 h-10" />
          </div>
          <div>
            <p className="text-lg font-grotesk text-gray-200">Call for a Taxi</p>
            <p className="text-3xl font-bold text-Orangepeel font-grotesk">+9477 673 2675</p>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="mt-8 md:mt-0 relative z-10">
        <img
          src={men}
          alt="Book Taxi"
          className="w-[500px] h-auto rounded-lg shadow-lg mt-10 z-40 mr-20"
        />
      </div>
    </div>
  );
};

export default BookTaxibanner;