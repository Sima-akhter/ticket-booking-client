import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/heroimg1.png';
import bannerImg2 from '../../../assets/heroimg2.png';
import bannerImg4 from '../../../assets/heroimg3.png';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';

const Banner = () => {
  return (
    /* w-full এবং h-screen ব্যবহার করে পুরো স্ক্রিন কভার করা হয়েছে */
    <section className="w-full relative bg-base-100">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={1000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        swipeable
        emulateTouch
        className="w-full overflow-hidden"
        renderIndicator={(onClickHandler, isSelected, index) => {
          return (
            <span
              className={`inline-block mx-1 cursor-pointer transition-all duration-300 rounded-full h-2 ${
                isSelected ? "w-8 bg-primary shadow-[0_0_10px_rgba(37,99,235,0.8)]" : "w-2 bg-primary/30"
              }`}
              onClick={onClickHandler}
              key={index}
              role="button"
              tabIndex={0}
            />
          );
        }}
      >
        {/* Slide 1 */}
        <div className="relative w-full h-[70vh] md:h-[85vh]">
          <img
            src={bannerImg1}
            alt="Hero 1"
            className="w-full h-full object-cover brightness-[0.7] dark:brightness-[0.5]"
          />
          <div className="absolute inset-0 flex items-center justify-start px-8 md:px-20 bg-gradient-to-r from-black/60 via-transparent to-transparent">
            <div className="text-left max-w-2xl animate-fadeIn">
              <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                Explore <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 font-medium max-w-md">
                Safe, fast, and reliable ticketing service for your next journey.
              </p>
              <div className="mt-8">
                <Link
                  to="/allTickets"
                  className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-focus transition-all shadow-lg shadow-primary/30 uppercase tracking-widest inline-block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative w-full h-[70vh] md:h-[85vh]">
          <img
            src={bannerImg2}
            alt="Hero 2"
            className="w-full h-full object-cover brightness-[0.7] dark:brightness-[0.5]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-6">
            <div className="text-center max-w-3xl">
              <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
                Travel with <span className="text-primary">Confidence</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 font-medium">
                The most trusted platform for Bus, Train, and Flight bookings.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  to="/allTickets"
                  className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-focus transition-all shadow-lg uppercase tracking-widest"
                >
                  Explore All
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative w-full h-[70vh] md:h-[85vh]">
          <img
            src={bannerImg4}
            alt="Hero 3"
            className="w-full h-full object-cover brightness-[0.7] dark:brightness-[0.5]"
          />
          <div className="absolute inset-0 flex items-center justify-end px-8 md:px-20 bg-gradient-to-l from-black/60 via-transparent to-transparent">
            <div className="text-right max-w-2xl">
              <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
                Ticket<span className="text-primary">Bari</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 font-medium">
                Your one-stop solution for all your travel needs.
              </p>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="px-10 py-4 border-2 border-primary text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all uppercase tracking-widest inline-block"
                >
                  Join Us Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;