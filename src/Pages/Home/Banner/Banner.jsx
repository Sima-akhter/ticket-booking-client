import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/heroimg1.png';
import bannerImg2 from '../../../assets/heroimg2.png';
import bannerImg4 from '../../../assets/heroimg3.png';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-base-100">
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
        renderIndicator={(onClickHandler, isSelected, index) => {
          const defStyle = {
            marginLeft: 8,
            marginRight: 8,
            cursor: "pointer",
            width: isSelected ? "30px" : "12px", // Active indicator looks like a pill
            height: "12px",
            borderRadius: "10px",
            background: isSelected ? "#2563eb" : "rgba(37, 99, 235, 0.3)", // Primary Blue
            display: "inline-block",
            transition: "all 0.3s ease",
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
        <div className="relative h-[85vh] bg-base-100">
          <img
            src={bannerImg1}
            alt="Explore"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] md:brightness-[0.85] dark:brightness-[0.4]"
          />
          
          <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-24 bg-gradient-to-r from-base-100/60 to-transparent">
            <div className="max-w-3xl text-left space-y-6">
              <h1 className="text-4xl sm:text-6xl font-black leading-tight text-base-content italic uppercase tracking-tighter">
                Explore <span className="text-primary">Bangladesh</span>
                <br /> with Comfort
              </h1>
              <p className="text-lg sm:text-xl text-base-content/80 font-medium max-w-xl">
                Book bus, train, launch & flight tickets instantly — best prices, zero hassle.
              </p>
              <div className="pt-4">
                <Link
                  to="/allTickets"
                  className="inline-block w-[70%] py-4 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-focus transform hover:-translate-y-1 transition-all duration-300 text-center uppercase tracking-widest"
                >
                  Book Now →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - Right aligned */}
        <div className="relative h-[85vh] bg-base-100">
          <img
            src={bannerImg2}
            alt="Fast Travel"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] md:brightness-[0.85] dark:brightness-[0.4]"
          />
          
          <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 lg:px-24 bg-gradient-to-l from-base-100/60 to-transparent">
            <div className="max-w-3xl text-right space-y-6">
              <h1 className="text-4xl sm:text-6xl font-black leading-tight text-base-content italic uppercase tracking-tighter">
                Fast, Safe & <br /> <span className="text-primary">Affordable</span>
              </h1>
              <p className="text-lg sm:text-xl text-base-content/80 font-medium max-w-xl ml-auto">
                Thousands of routes across Bangladesh — find your perfect journey today.
              </p>
              <div className="pt-4 flex justify-end">
                <Link
                  to="/allTickets"
                  className="inline-block w-[70%] py-4 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-focus transform hover:-translate-y-1 transition-all duration-300 text-center uppercase tracking-widest"
                >
                  Explore Routes →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 - Center aligned */}
        <div className="relative h-[85vh] bg-base-100">
          <img
            src={bannerImg4}
            alt="TicketBari"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] md:brightness-[0.85] dark:brightness-[0.4]"
          />
          
          <div className="absolute inset-0 flex items-center justify-center px-6 bg-base-100/30">
            <div className="max-w-4xl text-center space-y-8">
              <h1 className="text-5xl sm:text-8xl font-black text-base-content italic uppercase tracking-tighter">
                Ticket<span className="text-primary">Bari</span>
              </h1>
              <p className="text-xl sm:text-2xl font-black text-base-content/90 uppercase tracking-[0.2em]">
                Your All-in-One Travel Partner
              </p>
              <div className="pt-4 flex flex-col items-center gap-4">
                <Link
                  to="/allTickets"
                  className="inline-block w-[70%] py-4 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-focus transform hover:-translate-y-1 transition-all duration-300 text-center uppercase tracking-widest"
                >
                  Browse All Tickets
                </Link>
                <Link
                  to="/register"
                  className="inline-block w-[70%] py-4 border-2 border-primary text-primary font-black text-lg rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 text-center uppercase tracking-widest"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;