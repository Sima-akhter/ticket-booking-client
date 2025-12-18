import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner6.png';
import bannerImg2 from '../../../assets/banner2.png';
import bannerImg4 from '../../../assets/banner4.png';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={5000}
                transitionTime={1000}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                swipeable={true}
                emulateTouch={true}
                className="h-full"
            >
                {/* Slide 1 */}
                <div className="relative h-screen">
                    <img 
                        src={bannerImg1} 
                        alt="Book Bus Tickets"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-transparent opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-start px-8 lg:px-24">
                        <div className="max-w-2xl text-left animate-fadeIn">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                                Explore Bangladesh <br /> with Comfort
                            </h1>
                            <p className="text-lg md:text-2xl text-purple-100 mt-6 font-medium">
                                Book bus, train, launch & flight tickets instantly at the best price
                            </p>
                            <div className="mt-10">
                                <Link 
                                    to="/allTickets" 
                                    className="btn bg-white text-purple-700 font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:bg-purple-100 transform hover:scale-105 transition-all duration-300"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative h-screen">
                    <img 
                        src={bannerImg2} 
                        alt="Train Journey"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-pink-900 via-purple-800 to-transparent opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-end px-8 lg:px-24">
                        <div className="max-w-2xl text-right animate-fadeIn">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                                Fast, Safe & <br /> Affordable Travel
                            </h1>
                            <p className="text-lg md:text-2xl text-pink-100 mt-6 font-medium">
                                Thousands of routes across the country – choose your perfect journey
                            </p>
                            <div className="mt-10">
                                <Link 
                                    to="/allTickets" 
                                    className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-purple-500 transform hover:scale-105 transition-all duration-300"
                                >
                                    Explore Tickets
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="relative h-screen">
                    <img 
                        src={bannerImg4} 
                        alt="Launch & Flight"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-pink-800 opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-center px-8">
                        <div className="max-w-4xl text-center animate-fadeIn">
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-white leading-tight drop-shadow-2xl">
                                TicketBari – Your Travel Partner
                            </h1>
                            <p className="text-xl md:text-3xl text-purple-100 mt-8 font-semibold">
                                One platform for all your travel needs
                            </p>
                            <div className="mt-12 flex gap-6 justify-center">
                                <Link 
                                    to="/allTickets" 
                                    className="btn bg-white text-purple-700 font-bold text-lg px-12 py-4 rounded-full shadow-2xl hover:bg-purple-100 transform hover:scale-110 transition-all duration-300"
                                >
                                    All Tickets
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="btn bg-transparent border-4 border-white text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-white hover:text-purple-700 transition-all duration-300"
                                >
                                    Sign Up Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>

            {/* Custom CSS for fade-in animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 1.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Banner;