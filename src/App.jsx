import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Scrollbar from "smooth-scrollbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import StickyHeader from "./common/StickyHeader";
import { Hero } from "./landingpage/Hero";
import AboutCompany from "./landingpage/AboutCompany";
import Services from "./landingpage/Services";
import { TaxiBooking } from "./landingpage/TaxiBooking";
import { TaxiAppLanding } from "./landingpage/TaxiAppLanding";
import { TestimonialSlider } from "./landingpage/Testimonials";
import BookTaxibanner from "./landingpage/BookTaxibanner";
import ContactSection from "./components/ContactSection";
import GPSTracker from "./components/GPSTracker";
import Footer from "./common/Footer";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";
import OTPForm from "./Authentication/OTPForm";
import NewPasswordForm from "./Authentication/NewPasswordForm";
import AdminReoutes from "./AdminPanel/AdminReoutes";
import CabOwnerSignup from "./Authentication/CabOwnerSignup";
import PrivacyPolicy from "./Authentication/PrivacyPolicy";
import { BookingDetails } from "./Taxi&booking/BookingDetails";
import { TaxiList } from "./landingpage/TaxiList";
import WrappedBookingForm from "./Taxi&booking/BookingForm";

function App() {
  const scrollContainerRef = useRef(null);
  const [isSticky, setSticky] = useState(false);
  const location = useLocation(); // Get current route

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollbar = Scrollbar.init(scrollContainerRef.current, {
        damping: 0.05,
        thumbMinSize: 20,
        renderByPixels: true,
        continuousScrolling: true,
        alwaysShowTracks: true,
      });

      // Listen to scroll events
      scrollbar.addListener((status) => {
        if (status.offset.y > 100) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      });

      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  // Reset scrollbar position when navigating
  useEffect(() => {
    const scrollbar = Scrollbar.get(scrollContainerRef.current);
    if (scrollbar) {
      scrollbar.scrollTo(0, 0, 600); // Smooth scroll to top on route change
    }
  }, [location]);

  return (
    <>
      {isSticky && <StickyHeader />}
      <div ref={scrollContainerRef} className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <AboutCompany />
                <Services />
                <TaxiBooking />
                <TaxiList/>
                <TaxiAppLanding />
                <TestimonialSlider />
                <BookTaxibanner />
                <Footer />
              </>
            }
          />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/gps" element={<GPSTracker />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cabsignup" element={<CabOwnerSignup />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otpform" element={<OTPForm />} />
          <Route path="/newpassword" element={<NewPasswordForm />} />
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/admin/*" element={<AdminReoutes />} />
          <Route path="/taxilist" element={<TaxiList />} />
          <Route path="/bookingform" element={<WrappedBookingForm />} />

          
        </Routes>
      </div>
    </>
  );
}

export default App;
