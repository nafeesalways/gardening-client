import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "./Loader";

const FeaturedGarden = () => {
  const [activeGardeners, setActiveGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveGardeners = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://gardening-hub-server-indol.vercel.app/active-gardeners"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch gardeners (Status: ${response.status})`);
        }
        const data = await response.json();
        setActiveGardeners(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch active gardeners:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveGardeners();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 dark:text-red-400 font-semibold">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (activeGardeners.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 7a4 4 0 11-8 0 4 4 0 018 0zM6 17c0-1.657.895-3.107 2.226-3.923" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No active gardeners found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 7a4 4 0 11-8 0 4 4 0 018 0zM6 17c0-1.657.895-3.107 2.226-3.923" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Featured Gardeners
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Meet our active community members who are passionate about growing and sharing their gardening knowledge
          </p>
        </div>

        {/* Gardeners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeGardeners.map((gardener) => (
            <div
              key={gardener._id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10">
                <img
                  src={gardener.imageUrl}
                  alt={gardener.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x300?text=Gardener";
                  }}
                />
                {/* Active Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 sm:p-6">
                {/* Name */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">
                  {gardener.name}
                </h3>

                {/* Bio */}
                {gardener.bio && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {gardener.bio}
                  </p>
                )}

                {/* Stats */}
                {(gardener.totalTips || gardener.followers) && (
                  <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    {gardener.totalTips && (
                      <div className="flex-1 text-center">
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">
                          {gardener.totalTips}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tips</p>
                      </div>
                    )}
                    {gardener.followers && (
                      <div className="flex-1 text-center border-l border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">
                          {gardener.followers}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Explore All Gardeners
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGarden;
