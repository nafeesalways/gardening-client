import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "./Loader";

const TrendingTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedTips, setLikedTips] = useState(new Set());

  const fetchTips = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://gardening-hub-server-indol.vercel.app/public-garden-tips"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tips");
      }
      const data = await response.json();
      const sorted = data
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 6);
      setTips(sorted);
      setError(null);
    } catch (err) {
      console.error("Error fetching tips:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleLike = async (tipId) => {
    if (likedTips.has(tipId)) {
      return; // Already liked
    }

    try {
      const response = await fetch(
        `https://gardening-hub-server-indol.vercel.app/tips/${tipId}/like`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        // Update like count locally
        setTips((prevTips) =>
          prevTips.map((tip) =>
            tip._id === tipId ? { ...tip, likes: (tip.likes || 0) + 1 } : tip
          )
        );
        setLikedTips((prev) => new Set([...prev, tipId]));
      }
    } catch (error) {
      console.error("Error liking tip:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
            <svg
              className="w-12 h-12 text-red-500 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700 dark:text-red-400 font-semibold">
              Error: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (tips.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <svg
            className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No trending tips available
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-green-50 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Trending Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Discover the most popular gardening tips loved by our community
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div
              key={tip._id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={
                    tip.imageUrl ||
                    "https://via.placeholder.com/400x300?text=Garden+Tip"
                  }
                  alt={tip.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />

                {/* Category Badge */}
                {tip.category && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {tip.category}
                    </span>
                  </div>
                )}

                {/* Difficulty Badge */}
                {tip.difficulty && (
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-block text-white text-xs font-semibold px-3 py-1 rounded-full ${
                        tip.difficulty === "Easy"
                          ? "bg-green-600"
                          : tip.difficulty === "Medium"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {tip.difficulty}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 sm:p-6">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {tip.title || "No Title"}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                  {tip.description || "No description available."}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-sm">
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {tip.likes || 0}
                    </span>
                  </div>
                  {tip.views && (
                    <div className="flex items-center gap-1 text-sm">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">
                        {tip.views}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleLike(tip._id)}
                    disabled={likedTips.has(tip._id)}
                    className={`flex-1 btn btn-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      likedTips.has(tip._id)
                        ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 text-white"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill={likedTips.has(tip._id) ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {likedTips.has(tip._id) ? "Liked" : "Like"}
                  </button>
                  <Link
                    to={`/tipsDetails/${tip._id}`}
                    className="flex-1 btn btn-sm bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white border-none font-medium flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/tips"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View All Tips
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingTips;
