import { MapPin, Mail, Phone } from "lucide-react";
import Header from "../common/Header";
import map2 from "../assets/images/map2.png";
import Footer from "../common/Footer";

const ContactSection = () => {
  return (
    <div>
        <Header/>
      {/* Map Section */}
      <div className="w-full h-[550px] bg-gray-300"> {/* Replace with an actual map later */}
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450941!2d144.95373631531587!3d-37.8162799797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1633100971935!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      {/* Contact Section */}
      <div className="container mx-auto py-16 px-6 grid md:grid-cols-2 gap-10"
style={{
    backgroundImage: `url(${map2})`,
    backgroundPosition: "-250px -290px",
    backgroundRepeat: "no-repeat",
  }}
      >
        {/* Left: Contact Details */}
        <div className="ml-24 mt-10 font-grotesk" 
        >

          <h2 className="text-3xl font-bold mb-4 font-grotesk">Have Any Questions?</h2>
          <p className="text-gray-600 mb-6 text-lg font-grotesk">
            Get in touch to discuss your employee wellbeing needs today. Please<br/>
            give us a call, drop us an email or fill out the contact form.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-sm text-Orangepeel">
                <MapPin size={24} />
              </div>
              <p className="text-gray-800">962 Fifth Avenue,<br/> New York, NY 10022</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-sm text-Orangepeel">
                <Mail size={24} />
              </div>
              <p className="text-gray-800">hello@themeaster.net <br /> yourmail@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-sm text-Orangepeel">
                <Phone size={24} />
              </div>
              <p className="text-gray-800">(+123) 456 789 101 <br /> +1-302-123-4567</p>
            </div>
          </div>
        </div>
        
        {/* Right: Contact Form */}
        <form className="space-y-4 mt-10">
        <h2 className="text-3xl font-bold font-grotesk mb-9">Contact With Us!</h2>
  <div className="grid grid-cols-2">
    <input
      type="text"
      placeholder="First Name"
      className="w-[300px] p-3 border border-slate-300 font-grotesk focus:border-Orangepeel focus:outline-none"
    />
    <input
      type="text"
      placeholder="Last Name"
      className="w-[300px] p-3 border border-slate-300 -ml-11 font-grotesk focus:border-Orangepeel  focus:outline-none"
    />
  </div>
  <div className="grid grid-cols-2">
    <input
      type="email"
      placeholder="Email"
      className="w-[300px] p-3 border border-slate-300 font-grotesk focus:border-Orangepeel focus:outline-none"
    />
    <input
      type="tel"
      placeholder="Phone Number"
      className="w-[300px] p-3 border border-slate-300 -ml-11 font-grotesk focus:border-Orangepeel focus:outline-none"
    />
  </div>
  <textarea
    placeholder="Message"
    className="w-[615px] p-3 border border-slate-300 h-32 font-grotesk focus:border-Orangepeel focus:outline-none"
  ></textarea>
<button className="relative overflow-hidden bg-Orangepeel border-Orangepeel border-2 text-white py-3 px-6 rounded-sm font-semibold font-grotesk transition duration-300 ease-in-out hover:bg-orange-600 group">
  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
    Send Message
  </span>
  <span className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out"></span>
</button>
</form>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactSection;
