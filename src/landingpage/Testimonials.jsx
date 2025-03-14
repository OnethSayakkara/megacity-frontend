import { useState } from "react";
import {  Timer } from "lucide-react";
import map from "../assets/images/map.png";
import { PiQuotesBold } from "react-icons/pi";
import { GrDiamond } from "react-icons/gr";
import { AiFillCar } from "react-icons/ai";

const testimonials = [
  {
    id: 1,
    quote:
      "I love how easy it is to find a ride with Megacity Taxi. The quick pickups and affordable rates make it my go to choice for daily commutes!",
    name: "Eredrik Johanson",
    position: "Financial INC",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
  {
    id: 2,
    quote:
      "Megacity Taxi provides the fastest and most reliable service in town! Booking a ride is effortless, and the drivers are always professional and courteous.",
    name: "Sarah Williams",
    position: "Tech Solutions",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
  {
    id: 3,
    quote:
      "Megacity Taxi made my travel stress-free! Their safe and comfortable rides ensure I reach my destination on time, every time.",
    name: "Michael Chen",
    position: "Global Ventures",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

export const TestimonialSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative w-full min-h-screen bg-gray-100 -mt-[55px]">
      <div className="absolute inset-0">
        <img
          src={map}
          alt="Background"
          className="w-[800px] h-full object-contain -mt-24"
        />
      </div>
      <div className="relative z-10 flex">
        <div className="flex-1 p-16 ml-10">
          <div className="max-w-xl">
            <div className="mb-16">
              <div className="flex items-center gap-2 text-[#ff9900] mb-4">
                <div className="h-px w-12 bg-[#ff9900]" />
                <h3 className="text-base font-medium tracking-wider font-grotesk">
                  CLIENTS TESTIMONIAL
                </h3>
              </div>
              <h2 className="text-[40px] font-bold text-gray-900 mb-4 font-grotesk w-[900px]">
                megacity Passenger Reviews...
              </h2>
              <p className="text-gray-600 font-grotesk text-lg -mt-3  w-[700px]">
                We successfully cope with tasks of varying complexity, provide long-term 
                guarantees and regularly master technologies.
              </p>
            </div>
            <div className="bg-white rounded-sm shadow-lg p-8 relative mb-8 -mt-7 h-[350px] w-[610px]">
              <div className="absolute right-24 -top-7 w-16 text-center h-12 bg-Orangepeel text-black"
                style={{
                    clipPath: "polygon(30% 0, 100% 0, 70% 100%, 0 100%)",
                  }}
              >
                <PiQuotesBold className="text-3xl ml-4 mt-3"/>
              </div>
              <div className="transition-opacity duration-300">
                <p className="text-gray-600 text-xl mb-8 font-grotesk font-semibold mt-5 leading-9 w-[530px]">
                  {testimonials[activeSlide].quote}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeSlide].image}
                    alt={testimonials[activeSlide].name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 font-grotesk text-xl">
                      {testimonials[activeSlide].name}
                    </h4>
                    <p className="text-gray-500 font-grotesk">
                      {testimonials[activeSlide].position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 transition-colors ${
                    index === activeSlide ? "bg-Orangepeel" : "bg-black"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative w-[595px] bg-[#ff9900] p-16 overflow-hidden">
  {/* Diagonal stripes */}
  <div
    className="absolute inset-0 opacity-20 pointer-events-none"
    style={{
      backgroundImage:
        "linear-gradient(45deg, rgba(255,255,255,0.2) 10%, transparent 3%, transparent 50%, rgba(255,255,255,0.6) 10%, rgba(255,255,255,0.2) 60%, transparent 60%, transparent)",
      backgroundSize: "10px 10px",
    }}
  />
  <div className="relative max-w-sm">
    <div className="mb-16">
      <div className="flex items-center gap-2 text-white mb-4 mt-12">
        <div className="h-px w-12 bg-white" />
        <h3 className="text-md font-medium tracking-wider font-grotesk">WHY CHOOSE US!</h3>
      </div>
      <h2 className="text-4xl font-bold text-white mb-4 font-grotesk w-[500px]">
        Why Ride with megacity?
      </h2>
      <p className="text-white text-md font-grotesk w-[800px]">
        We successfully cope with tasks of varying complexity, provide<br/>
        long-term guarantees and regularly master technologies.
      </p>
    </div>
    <div className="space-y-10">
      <div className="flex items-start gap-2">
        <div className=" p-4 rounded-lg">
          <GrDiamond className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 font-grotesk">
            Safe Guarantee
          </h3>
          <p className="text-white font-grotesk text-md">
            We successfully cope with tasks of<br/> varying complexity!
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className=" p-4 rounded-lg">
          <AiFillCar className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 font-grotesk">
            Fast Pickups
          </h3>
          <p className="text-white font-grotesk text-md">
            We successfully cope with tasks of varying complexity!
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className=" p-4 rounded-lg">
          <Timer className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 font-grotesk">
            Quick Ride
          </h3>
          <p className="text-white font-grotesk text-md">
            We successfully cope with tasks of varying complexity!
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

        <div className="w-32 bg-white"></div>
      </div>
    </div>
  );
};