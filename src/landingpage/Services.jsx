import PropTypes from "prop-types";
import hero from "../assets/images/hero.jpg";
import service1 from "../assets/images/service1.jpg";
import service2 from "../assets/images/service2.jpg";
import service3 from "../assets/images/service3.jpg";
import car from "../assets/images/car.png";

// ServiceCard Component
const ServiceCard = ({ title, description, image, taxiImage }) => {
  return (
    <div className="bg-white rounded-sm shadow-lg overflow-hidden w-full max-w-[500px] h-[500px]">
      <div className="relative h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover filter"
        />
        <img
          src={taxiImage}
          alt="Taxi"
          className="absolute bottom-0 -right-4 w-2/4 transform translate-y-1/4"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[23px] font-bold font-grotesk mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6 text-lg font-grotesk">{description}</p>
        <button className="relative overflow-hidden bg-Orangepeel text-white px-6 py-2 mt-5 rounded-sm w-fit text-lg font-medium border-2 border-yellow-500 transition-all duration-300 ease-in-out group">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
    Read More
  </span>
  <span className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out w-full h-full"></span>
</button>
      </div>
    </div>
  );
};

// Prop Validation for ServiceCard
ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  taxiImage: PropTypes.string.isRequired,
};

// Services Component
const Services = () => {
  const services = [
    {
      title: "Regular Transport",
      description:
        "Everything your taxi business needs is already here! Ridek made for taxi service companies!",
      image: service1,
      taxiImage: car,
    },
    {
      title: "Airport Transport",
      description:
        "Everything your taxi business needs is already here! Ridek made for taxi service companies!",
      image: service2,
      taxiImage: car,
    },
    {
      title: "Luggage Transport",
      description:
        "Everything your taxi business needs is already here! Ridek made for taxi service companies!",
      image: service3,
      taxiImage: car,
    },
  ];

  return (
    <div className="relative py-16">
      {/* Half Background with Hero Image */}
      <div 
        className="absolute inset-0 w-full h-[72%] bg-cover bg-center" 
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* Black Opacity Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* What We Offer Section */}
      <div className="relative max-w-5xl mx-auto text-center mb-12 px-4">
        <h2 className="text-xl font-bold text-Orangepeel mb-4 font-grotesk mt-8">WHAT WE OFFER</h2>
        <p className="text-5xl text-white mb-7 font-medium font-roboto">
          Start your journey with <br/><span className="font-medium">megacity Company!</span>
        </p>
        <p className="text-slate-300 text-lg font-grotesk ">
          We successfully cope with tasks of varying complexity, provide long-term<br/> guarantees, and regularly master new technologies.
        </p>
      </div>

      {/* Services Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
            taxiImage={service.taxiImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;