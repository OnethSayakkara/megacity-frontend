import { useEffect,useState } from "react";
import city from "../assets/images/city.png";
import texture from "../assets/images/texture.png";
import truck1 from "../assets/images/truck1.png";
import truck2 from "../assets/images/truck2.png";
import truck3 from "../assets/images/truck3.png";
import { PhoneCall } from "lucide-react";
import logowhite from "../assets/images/logowhite.svg";


const Footer = () => {
  const [truck1Speed, setTruck1Speed] = useState(11);
  const [truck2Speed, setTruck2Speed] = useState(14);
  const [truck3Speed, setTruck3Speed] = useState(13);

  useEffect(() => {
    setTruck1Speed(Math.random() * 5 + 10);
    setTruck2Speed(Math.random() * 5 + 10);
    setTruck3Speed(Math.random() * 5 + 10);
  }, []);

  return (
    <div>
    <div className="relative overflow-hidden">
      <footer
        className="relative text-white py-10 h-[610px] bg-black/85 mb-14"
        style={{
          backgroundImage: `url(${city}), url(${texture})`,
          backgroundSize: "100%, cover",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundBlendMode: "normal, overlay",
          backgroundPosition: "bottom, center",
        }}
      >
        {/* Logo & Tagline */}
        <div className="absolute top-5 left-12 flex items-center space-x-3 z-10">
          <img src={logowhite} alt="Ridek" className="h-44 w-44 -mt-14 ml-9" />
          <p className="text-lg text-slate-300 max-w-7xl font-grotesk -mt-10">
            We successfully cope with tasks of varying complexity, provide long-<br />term guarantees, and regularly master new technologies.
          </p>
        </div>

        {/* Footer Content */}
        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mt-36">
          {/* Working Hours */}
          <div className="ml-24">
            <h3 className="font-bold text-xl text-white border-b border-Orangepeel inline-block font-grotesk">
              Working Hours
            </h3>
            <p className="mt-5 text-md font-grotesk">
              <span className="text-Orangepeel text-sm font-semibold">MONDAY - FRIDAY:</span>
              <br /> 7.00am To 12.00pm
            </p>
            <p className="mt-5 text-md font-grotesk">
              <span className="text-Orangepeel text-sm font-semibold">SATURDAY:</span>
              <br /> 8.00am To 11.30pm
            </p>
            <p className="mt-5 text-md font-grotesk">
              <span className="text-Orangepeel text-sm font-semibold">POYA DAY:</span>
              <br /> Closed
            </p>
          </div>

          {/* Useful Links */}
          <div className="ml-9">
            <h3 className="font-bold text-xl text-white border-b border-Orangepeel inline-block font-grotesk">
              Useful Links
            </h3>
            <ul className="mt-5 text-lg font-grotesk space-y-3 text-slate-300 cursor-pointer">
              <li className="hover:text-white mb-4">Taxi Booking</li>
              <a href="/privacypolicy" className="hover:text-white">Become Driver</a>
              <li className="hover:text-white">Privacy and Policy</li>
              <li className="hover:text-white">Terms of Use</li>
              <li className="hover:text-white">Contact Us</li>
            </ul>
          </div>

          {/* Head Office */}
          <div className="-ml-9">
            <h3 className="font-bold text-xl text-white border-b border-Orangepeel inline-block font-grotesk">
              Head Office
            </h3>
            <p className="mt-5 text-lg font-grotesk">
              <span className="text-Orangepeel text-sm font-semibold">LOCATION:</span>
              <br /> 153 Williamson Plaza, Maggieberg,<br /> MT 09514
            </p>
            <p className="mt-5 text-lg font-grotesk">
              <span className="text-Orangepeel text-sm font-semibold">JOIN US:</span>
              <br /> Info@YourGmail24.com
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="-ml-16">
          <h3 className="font-bold text-xl text-white border-b border-Orangepeel inline-block font-grotesk">
              Newsletter Signup
            </h3>
            <div className="mt-7">
              <input
                type="email"
                placeholder="Your Email"
                className="w-[300px] px-3 py-3 bg-white font-grotesk text-black border border-gray-700 focus:outline-none"
              />
             <button className="relative overflow-hidden bg-Orangepeel text-white px-6 py-2 mt-2 rounded-sm w-[181px] text-lg font-bold font-grotesk border-2 border-yellow-500 transition-all duration-300 ease-in-out group">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                   Subscribe Now
              </span>
              <span className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out w-full h-full"></span>
          </button>


            </div>
          </div>
        </div>

      {/* Black Bar with Trucks */}
      <div className="absolute left-0 w-full bg-black/85 h-14 flex items-center justify-center -bottom-[56px]"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}>
          {/* Truck Images with Animations */}
          <img src={truck1} alt="Truck 1" className="absolute bottom-14 w-[100px] h-12 z-10"
            style={{ animation: `truck1Move ${truck1Speed}s linear infinite` }} />
          <img src={truck2} alt="Truck 2" className="absolute bottom-14 w-28 h-12 z-10"
            style={{ animation: `truck2Move ${truck2Speed}s linear infinite` }} />
          <img src={truck3} alt="Truck 3" className="absolute bottom-14 w-24 h-14 z-10"
            style={{ animation: `truck3Move ${truck3Speed}s linear infinite` }} />
             <p className="text-white text-md font-grotesk z-20">© 2024 megacity. All Rights Reserved.</p>
        </div>

        <style>
          {`
            @keyframes truck1Move {
              from { transform: translateX(110vw); }
              to { transform: translateX(-110vw); }
            }
            @keyframes truck2Move {
              from { transform: translateX(110vw); }
              to { transform: translateX(-110vw); }
            }
            @keyframes truck3Move {
              from { transform: translateX(-110vw); }
              to { transform: translateX(110vw); }
            }
          `}
        </style>
                      

        </footer>
    </div>
    <div
          className="relative top-0 right-0 bg-Orangepeel px-8 py-4 text-black z-20 w-[1160px] h-[120px] -mt-[674px] ml-[366.5px]"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 53% 100%, 47% 6%, 47% 0%)",
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.2) 10%, transparent 3%, transparent 50%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.2) 60%, transparent 60%, transparent)",
            backgroundSize: "10px 10px",
          }}
        >
          <div className="flex gap-4 ml-[600px]">
            <PhoneCall className="w-10 h-10 mt-6 text-white" />
            <div className="grid mt-3">
              <p className="text-lg font-semibold text-white font-grotesk">Call For Taxi</p>
              <p className="text-3xl font-bold font-grotesk">+9477 673 2675</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Footer;
