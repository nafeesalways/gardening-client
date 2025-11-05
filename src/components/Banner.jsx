import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTypewriter } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: ["Green Life", "Green Living", "Grow with Us"],
    loop: 0,
    delaySpeed: 2000,
  });
  const [activeContent, setActiveContent] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    fade: true,
    speed: 1000,
    cssEase: "ease-in-out",
    lazyLoad: "ondemand",
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          autoplaySpeed: 4000,
          fade: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          autoplaySpeed: 3500,
          fade: false,
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      title: text,
      description:
        "Learn how to start your own community garden and grow organic produce.",
      buttonText: "Learn More",
      contentType: "workshop",
      image:
        "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1920",
      content: (
        <div className="mt-4 bg-white text-gray-800 p-4 sm:p-5 rounded-lg shadow-xl animate-fadeIn">
          <h3 className="text-base sm:text-lg font-bold text-green-700 mb-2">
            Workshop Details
          </h3>
          <div className="space-y-1 text-sm sm:text-base">
            <p>
              <span className="font-semibold">Date:</span> June 15, 2025
            </p>
            <p>
              <span className="font-semibold">Location:</span> GardenHub Center
            </p>
            <p>
              <span className="font-semibold">Time:</span> 10AM - 2PM
            </p>
            <p className="mt-2 text-gray-600">
              Join us to learn composting, planting schedules, and DIY tips!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Gardener's Resource Library",
      description:
        "Access guides, videos, and tips for gardeners of all levels.",
      buttonText: "Browse Resources",
      contentType: "resources",
      image:
        "https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg?auto=compress&cs=tinysrgb&w=1920",
      content: (
        <div className="mt-4 bg-white text-gray-800 p-4 sm:p-5 rounded-lg shadow-xl animate-fadeIn">
          <h3 className="text-base sm:text-lg font-bold text-green-700 mb-3">
            Resource Library
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Soil Preparation PDF Guides
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Seasonal Planting Videos
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Pest Control Cheat Sheets
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Spring Planting Calendar",
      description: "Discover what to plant and when based on your local zone.",
      buttonText: "View Calendar",
      contentType: "calendar",
      image:
        "https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&w=1920",
      content: (
        <div className="mt-4 bg-white text-gray-800 p-4 sm:p-5 rounded-lg shadow-xl animate-fadeIn">
          <h3 className="text-base sm:text-lg font-bold text-green-700 mb-3">
            Planting Calendar
          </h3>
          <div className="space-y-2 text-sm sm:text-base">
            <div className="bg-green-50 p-3 rounded-md">
              <p className="font-semibold text-green-700">Zone 6:</p>
              <p className="text-gray-700">
                Tomatoes in March, Cucumbers in April, Herbs year-round.
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <p className="font-semibold text-green-700">Zone 8:</p>
              <p className="text-gray-700">
                Earlier planting starts in February.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] flex items-center bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

              {/* Content Container */}
              <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="max-w-xl lg:max-w-2xl">
                  <div className="bg-gradient-to-br from-green-900/90 to-green-800/80 backdrop-blur-sm text-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-2xl border border-green-700/30">
                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                      {slide.id === 1 ? (
                        <span className="inline-block min-h-[1.2em]">
                          {slide.title}
                        </span>
                      ) : (
                        slide.title
                      )}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-gray-100 leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Button */}
                    <button
                      onClick={() =>
                        setActiveContent(
                          activeContent === slide.contentType
                            ? null
                            : slide.contentType
                        )
                      }
                      className="inline-flex items-center gap-2 bg-green-200 text-green-900 font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-green-300 hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
                    >
                      {slide.buttonText}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeContent === slide.contentType
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dynamic Content */}
                    {activeContent === slide.contentType && slide.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .slick-dots {
          bottom: 20px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: white;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          color: #86efac;
          opacity: 1;
        }
        @media (max-width: 640px) {
          .slick-dots {
            bottom: 10px;
          }
          .slick-dots li button:before {
            font-size: 8px;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;
