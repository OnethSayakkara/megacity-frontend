import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import hero from "../assets/images/hero.jpg";
import car from "../assets/images/car.png";
import { useState } from "react"; // Import useState for state management

export const Hero = () => {
  const [slideNumber, setSlideNumber] = useState(1); // State to manage slide number

  // Function to handle slide change
  const handleSlideChange = (direction) => {
    if (direction === "next") {
      setSlideNumber((prev) => (prev === 1 ? 2 : 1));
    } else if (direction === "prev") {
      setSlideNumber((prev) => (prev === 1 ? 2 : 1));
    }
  };

  return (
    <div className="relative w-full h-[800px] overflow-hidden z-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      />

      {/* Content Container */}
      <motion.div
      key={slideNumber}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative container mx-auto h-full px-4 ml-32 mb-52"
      >
        <div className="flex flex-col justify-center h-full max-w-xl pt-20">
          <span className="text-white mb-4 text-lg">Travel Securely With Us!</span>
          <h1 className="text-white text-6xl font-medium mb-6 font-pridi leading-none">
            Book your taxi from anywhere today!
          </h1>
          <p className="text-gray-200 mb-8 text-lg">
            Everything your taxi business needs is already here!<br/> megacity made for
            taxi service companies!
          </p>

          {/* Animated Button */}
          <motion.button
          key={slideNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative overflow-hidden bg-Orangepeel text-white px-4 py-2 rounded-sm w-fit text-lg font-medium border-2 border-yellow-500 transition-all duration-300 ease-in-out group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Book Now
            </span>
            <span className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out w-full h-full"></span>
          </motion.button>
        </div>
      </motion.div>

      {/* Diagonal Sections Container */}
      <motion.div className="absolute right-0 top-0 h-full">
        {/* Left Black Section */}
        <motion.div
             initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                 className="absolute h-[500px] w-[200px] bg-zinc-900 z-10 [clip-path:polygon(60%_0,100%_0,40%_100%,0_100%)]"
                    style={{
                    right: "385px",
                    bottom: 0,
                    }}
                    />


        {/* Center Orange Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-0 h-full w-[370px] bg-Orangepeel z-10"
          style={{
            right: "130px",
            clipPath: "polygon(50% 0, 100% 0, 50% 100%, 0 100%)",
          }}
        />

        {/* Right Black Section */}
        <motion.div
        initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
             className="absolute h-[450px] w-[167px] bg-zinc-900 z-10 [clip-path:polygon(60%_0,100%_0,40%_100%,0_100%)]"
             style={{
             right: "66px",
                top: 0,
                 }}
                />

      </motion.div>

      {/* Car Image */}
      <motion.img
        key={slideNumber}
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={car}
        alt="Taxi"
        className="absolute z-20"
        style={{
          right: "20px",
          top: "40%",
          transform: "translateY(-50%)",
          width: "700px",
          height: "400px",
        }}
      />

      {/* Slider Navigation */}
      <div className="absolute bottom-0 left-0 bg-white p-4 flex items-center gap-8">
        <div className="flex items-center gap-4">
          {/* Prev Button */}
          <button
            onClick={() => handleSlideChange("prev")}
            className="text-black hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <motion.span
              key={slideNumber} // Ensures animation on change
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Prev
            </motion.span>
          </button>

          {/* Next Button */}
          <button
            onClick={() => handleSlideChange("next")}
            className="text-black hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <motion.span
              key={slideNumber} // Ensures animation on change
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Next
            </motion.span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Number */}
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-4xl font-bold">{slideNumber}</span>
          <span className="text-black text-lg">/</span>
          <span className="text-black text-lg">2</span>
        </div>
      </div>
    </div>
  );
};
