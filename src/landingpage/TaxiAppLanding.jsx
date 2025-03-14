import man from "../assets/images/man.png";
import taxi from "../assets/images/taxi.png";
import background from "../assets/images/background.png";
import mockup from "../assets/images/mockup.png";
import docs from "../assets/images/docs.svg";
import navigator from "../assets/images/navigator.svg";
import clock from "../assets/images/clock.svg";

export const TaxiAppLanding = () => {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* City Background */}
      <div className="absolute inset-0 ">
        <img
          src={background}
          alt="City Background"
          className="w-[920px] h-[550px] object-cover ml-[567px] mt-[115px]"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-3 ml-[96px]">
            <div className="flex items-center gap-2 text-[#ff9900]">
              <div className="h-px w-12 bg-[#ff9900]" />
              <h3 className="text-sm font-medium  font-groteskr">
                COMING SOON
              </h3>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 font-grotesk tracking-tight leading-tight">
             megacity is going Mobile<br/> Stay Tuned!
            </h1>
            <p className="text-gray-600 text-lg font-grotesk">
            Exciting news! megacity is expanding beyond the web our mobile app is<br/> on the way! Stay tuned for on-the-go booking experience.
            </p>
            {/* Features */}
            <div className="grid grid-cols-4 gap-1">
  <div className="text-left space-y-2 mt-2">
    <div className="w-12 h-12 flex items-start justify-start"> 
      <img src={navigator} alt="Navigator Icon" className="w-10 h-10" />
    </div>
    <h3 className="font-semibold font-grotesk text-base">Easy to Search<br /> Megacity Taxi!</h3>
  </div>

  <div className="text-left space-y-2 mt-2">
    <div className="w-12 h-12 flex items-start justify-start">
      <img src={clock} alt="Clock Icon" className="w-10 h-10" />
    </div>
    <h3 className="font-semibold font-grotesk text-base">Quick Pickups To<br /> Save Time!</h3>
  </div>

  <div className="text-left space-y-2 mt-2">
    <div className="w-12 h-12 flex items-start justify-start">
      <img src={docs} alt="Docs Icon" className="w-10 h-10" />
    </div>
    <h3 className="font-semibold font-grotesk text-base">Inclusive Rates To<br /> Enjoy Ride!</h3>
  </div>
</div>

            {/* App Store Buttons */}
            <div className="flex gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-[55px] mt-5"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="h-[55px] mt-5"
              />
            </div>
          </div>
          {/* Right Content - Images Stack */}
          <div className="relative h-[600px]">
            {/* Phone */}
            <div className="absolute right-[250px] top-[84px] w-[400px] ">
              <img
                src={mockup}
                alt="Taxi App Interface"
                className="w-[340px] h-auto"
              />
            </div>
            {/* Taxi */}
            <div className="absolute right-[90px] bottom-0 w-[600px] z-10">
              <img
                src={taxi}
                alt="Yellow Taxi"
                className="w-full h-[255px] "
              />
            </div>
            {/* Person */}
            <div className="absolute right-[23px] mt-[300px] w-[300px] z-30">
              <img
                src={man}
                alt="Person with phone"
                className="w-[186px] h-[340px] "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
