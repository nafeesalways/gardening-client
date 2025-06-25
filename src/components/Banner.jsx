import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTypewriter } from 'react-simple-typewriter';

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
  };

  return (
    <section className="w-full">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div>
          <div
            className="h-[400px] md:h-[500px] flex items-center bg-cover bg-center px-6 md:px-16"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600')",
            }}
          >
            <div className="bg-green-900 bg-opacity-60 text-white p-6 rounded max-w-xl">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
               <span>{text}</span>
              </h2>
              <p className="mb-4">
                Learn how to start your own community garden and grow organic produce.
              </p>
              <button
                onClick={() => setActiveContent("workshop")}
                className="inline-block bg-green-200 text-green-900 font-semibold px-4 py-2 rounded hover:bg-green-300"
              >
                Learn More
              </button>

              {activeContent === "workshop" && (
                <div className="mt-4 bg-white text-green-900 p-4 rounded shadow">
                  <h3 className="text-lg font-bold">Workshop Details</h3>
                  <p>
                    Date: June 15, 2025<br />
                    Location: GardenHub Center<br />
                    Time: 10AM - 2PM<br />
                    Join us to learn composting, planting schedules, and DIY tips!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div>
          <div
            className="h-[400px] md:h-[500px] flex items-center bg-cover bg-center px-6 md:px-16"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg?auto=compress&cs=tinysrgb&w=600')",
            }}
          >
            <div className="bg-green-900 bg-opacity-60 text-white p-6 rounded max-w-xl">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                Gardener’s Resource Library
              </h2>
              <p className="mb-4">
                Access guides, videos, and tips for gardeners of all levels.
              </p>
              <button
                onClick={() => setActiveContent("resources")}
                className="inline-block bg-green-200 text-green-900 font-semibold px-4 py-2 rounded hover:bg-green-300"
              >
                Browse Resources
              </button>

              {activeContent === "resources" && (
                <div className="mt-4 bg-white text-green-900 p-4 rounded shadow">
                  <h3 className="text-lg font-bold">Resource Library</h3>
                  <ul className="list-disc pl-5">
                    <li>Soil Preparation PDF Guides</li>
                    <li>Seasonal Planting Videos</li>
                    <li>Pest Control Cheat Sheets</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div>
          <div
            className="h-[400px] md:h-[500px] flex items-center bg-cover bg-center px-6 md:px-16"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&w=600')",
            }}
          >
            <div className="bg-green-900 bg-opacity-60 text-white p-6 rounded max-w-xl">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                Spring Planting Calendar
              </h2>
              <p className="mb-4">
                Discover what to plant and when based on your local zone.
              </p>
              <button
                onClick={() => setActiveContent("calendar")}
                className="inline-block bg-green-200 text-green-900 font-semibold px-4 py-2 rounded hover:bg-green-300"
              >
                View Calendar
              </button>

              {activeContent === "calendar" && (
                <div className="mt-4 bg-white text-green-900 p-4 rounded shadow">
                  <h3 className="text-lg font-bold">Planting Calendar</h3>
                  <p>
                    Zone 6: Tomatoes in March, Cucumbers in April, Herbs year-round.
                    <br />
                    Zone 8: Earlier planting starts in February.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
