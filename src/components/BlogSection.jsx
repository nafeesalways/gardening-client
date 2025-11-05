import React from "react";
import { Link } from "react-router";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Tips for Urban Gardening",
      description:
        "Discover how to grow fresh herbs and vegetables in small spaces with our expert urban gardening tips.",
      imageUrl:
        "https://img.freepik.com/premium-photo/home-gardening-concept-woman-hands-planting-pots_165536-10781.jpg?w=740",
      category: "Urban Gardening",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Composting Made Easy",
      description:
        "Turn kitchen waste into garden gold with these beginner-friendly composting techniques.",
      imageUrl:
        "https://img.freepik.com/premium-photo/compost-bin-kitchen-waste-garden_488220-4226.jpg?w=740",
      category: "Composting",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Best Plants for Beginners",
      description:
        "New to gardening? Start with these low-maintenance, rewarding plants that thrive with minimal care.",
      imageUrl:
        "https://img.freepik.com/premium-photo/indoor-houseplants-window-sunlight-modern-home_31965-219547.jpg?w=740",
      category: "Plant Care",
      readTime: "6 min read",
    },
  ];

  return (
    <section className="py-12  sm:py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Gardening Blogs
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Learn from our expert guides and discover new gardening techniques to elevate your green space
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-48 sm:h-56 bg-gray-200 dark:bg-gray-700">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x300?text=Garden+Blog";
                  }}
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {blog.category}
                  </span>
                </div>
                {/* Read Time Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {blog.readTime}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 sm:p-6 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
                  {blog.description}
                </p>

                {/* Footer with CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                    Learn More
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <button className="btn btn-sm btn-ghost text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
    
      </div>
    </section>
  );
};

export default BlogSection;
