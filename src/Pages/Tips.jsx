import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("");

  const fetchTips = async (selectedDifficulty) => {
    console.log(selectedDifficulty);
    try {
      setLoading(true);
      const url = `https://gardening-hub-server-indol.vercel.app/public-garden-tips?difficulty=${selectedDifficulty}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch garden tips");
      }

      const data = await response.json();
      setTips(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load garden tips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips(difficulty);
  }, [difficulty]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-green-300 opacity-20"></div>
        </div>
        <p className="mt-4 text-base sm:text-lg text-base-content font-medium">Loading garden tips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100 p-4 sm:p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center shadow-lg">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 dark:text-red-400 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>GardenHub | Browse Tips</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Browse Garden Tips
          </h1>
          <p className="text-green-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-center">
            Discover expert gardening advice from our community
          </p>
        </div>
      </div>

      {/* Filter and Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 sm:p-6 border border-green-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Stats */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 sm:p-4 rounded-full">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">Available Tips</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">{tips.length}</p>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="w-full sm:w-auto">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full sm:w-auto select select-bordered border-green-300 dark:border-green-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-green-500 dark:focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800"
              >
                <option value="">All Levels</option>
                <option value="Easy">🌱 Easy</option>
                <option value="Medium">🌿 Medium</option>
                <option value="Hard">🌳 Hard</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {tips.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 rounded-lg p-6 shadow-md">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-bold text-yellow-800 dark:text-yellow-300">No garden tips available yet!</p>
                <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">Be the first to share your wisdom.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tips.map((tip) => (
              <div
                key={tip._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-48 sm:h-56 bg-gray-100 dark:bg-gray-700">
                  {tip.imageUrl ? (
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300.png?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-md bg-green-500 text-white">
                      {tip.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2 min-h-[3.5rem]">
                    {tip.title}
                  </h2>

                  {/* Description if available */}
                  {tip.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {tip.description}
                    </p>
                  )}

                  {/* See More Button */}
                  <Link
                    to={`/tipsDetails/${tip._id}`}
                    className="inline-flex items-center gap-2 w-full justify-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    See More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tips;
