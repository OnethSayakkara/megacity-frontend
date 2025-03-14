
import about1 from "../assets/images/about.png";
import round from "../assets/images/round.png";
import about2 from "../assets/images/about2.png";
import locationIcon from "../assets/images/location.png"; // Import your location icon

export const Hero = () => {
  return (
    <div className="relative w-full min-h-[600px] overflow-hidden mt-1">
      {/* Background shape */}
      <div
        className="absolute left-[280px] top-1/2 -translate-y-1/2 bg-Orangepeel"
        style={{
          width: "330px",
          height: "480px",
          clipPath: "polygon(45% 0, 100% 0, 55% 100%, 0 100%)",
        }}
      ></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-8 py-12 flex">
        {/* Left side with images */}
        <div className="w-1/2 flex flex-col gap-6">
          {/* about1 image */}
          <div className="flex justify-start ml-[83px]">
            <img
              src={about1}
              alt="Taxi at night"
              className="w-[295px] h-[400px] object-cover"
            />
          </div>

          {/* Round image with location icon */}
          <div className="flex justify-center z-20">
            <div className="bg-white rounded-full -mt-[370px] ml-[300px] w-48 h-48 flex items-center justify-center shadow-lg relative">
              <img
                src={round}
                alt="Taxi logo"
                className="w-full h-full object-cover animate-spin-slow"
              />
              <img
                src={locationIcon}
                alt="Location"
                className="absolute w-14 h-16"
              />
            </div>
          </div>

          {/* about2 image (behind the round image) */}
          <div className="flex justify-end z-10">
            <img
              src={about2}
              alt="Yellow taxi"
              className="w-[200px] h-[218px] object-cover -mt-[268px] mr-[100px]"
            />
          </div>
        </div>

        {/* Right side with text */}
        <div className="w-1/2 pt-16">
          <h3 className="text-Orangepeel font-normal font-pridi text-lg mb-4">
           / ABOUT OUR COMPANY
          </h3>
          <h2 className="text-4xl font-semibold mb-6 font-grotesk">
            Feel the difference and Relaxation with<br/> megacity Taxi Company!
          </h2>
          <p className="text-gray-600 mb-8 font-grotesk text-[18px]">
            We successfully cope with tasks of varying complexity, provide
            long-term <br/>guarantees and regularly master new technologies. Our
            portfolio includes<br/> dozens of successfully completed projects of
            houses of different storeys, with<br/> high-quality finishes and good
            repairs. Book your taxi from anywhere today!
          </p>
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80"
                alt="Founder"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-600 -mt-2 font-grotes font-semibold text-lg">Founder - CEO</p>
                <p className="text-4xl font-lavish mt-2">Sayakkara</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 -mt-3 font-grotes font-semibold text-lg">Call For Taxi</p>
              <p className="text-3xl font-semibold text-orange-500 font-oswald mt-2">+9477-673-2675</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;