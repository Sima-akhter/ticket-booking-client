
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/heroimg1.png';
import bannerImg2 from '../../../assets/heroimg2.png';
import bannerImg4 from '../../../assets/heroimg3.png';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden bg-white">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5500}
        transitionTime={800}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        swipeable
        emulateTouch
        className="h-full"
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = {
            marginLeft: 8,
            marginRight: 8,
            cursor: "pointer",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: isSelected ? "#6b21a8" : "rgba(107, 33, 168, 0.3)", // purple theme
            display: "inline-block",
            transition: "all 0.3s ease",
            boxShadow: isSelected ? "0 0 0 3px rgba(107, 33, 168, 0.2)" : "none",
          };
          return (
            <span
              style={defStyle}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
            />
          );
        }}
      >
        {/* Slide 1 - Left aligned */}
        <div className="relative h-screen bg-white">
          <img
            src={bannerImg1}
            alt="Explore Bangladesh with Comfort"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.92] opacity-90"
          />
          
          <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-24">
            <div className="max-w-3xl text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-gray-900">
                Explore Bangladesh
                <br className="hidden sm:block" /> with Comfort
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-light max-w-2xl">
                Book bus, train, launch & flight tickets instantly — best prices, zero hassle
              </p>
              <div className="pt-6">
                <Link
                  to="/allTickets"
                  className="inline-block px-10 py-4 bg-purple-700 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-purple-800 transform hover:scale-105 transition-all duration-300"
                >
                  Book Now →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - Right aligned */}
        <div className="relative h-screen bg-white">
          <img
            src={bannerImg2}
            alt="Fast Safe Affordable Travel"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.90] opacity-90"
          />
          
          <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-24">
            <div className="max-w-3xl text-right space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-gray-900">
                Fast, Safe & Affordable
                <br className="hidden sm:block" /> Travel
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-light max-w-2xl ml-auto">
                Thousands of routes across Bangladesh — find your perfect journey today
              </p>
              <div className="pt-6 flex justify-end">
                <Link
                  to="/allTickets"
                  className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
                >
                  Explore Routes →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 - Center aligned */}
        <div className="relative h-screen bg-white">
          <img
            src={bannerImg4}
            alt="TicketBari Your Travel Partner"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.92] opacity-88"
          />
          
          <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12">
            <div className="max-w-4xl text-center space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tight text-gray-900">
                TicketBari
              </h1>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-800">
                Your All-in-One Travel Partner
              </p>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                One platform for buses, trains, launches & flights — simple, fast, reliable
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/allTickets"
                  className="px-12 py-5 bg-purple-700 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-purple-800 transform hover:scale-105 transition-all duration-300"
                >
                  Browse All Tickets
                </Link>
                <Link
                  to="/register"
                  className="px-12 py-5 border-2 border-purple-700 text-purple-700 font-semibold text-lg rounded-full hover:bg-purple-700 hover:text-white transition-all duration-300"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Banner;