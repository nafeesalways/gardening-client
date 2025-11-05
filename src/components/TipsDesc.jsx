import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import Loader from "./Loader";

const TipsDesc = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTipDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://gardening-hub-server-indol.vercel.app/myTips/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tip details");
        }
        const data = await response.json();
        setTip(data);
      } catch (err) {
        console.error("Error fetching tip:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTipDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center shadow-lg">
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
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!tip) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>{tip.title} | My Tip - GardenHub</title>
      </Helmet>

      {/* Hero Section with Image */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-900">
        <img
          src={tip.imageUrl}
          alt={tip.title}
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/1200x500.png?text=Garden+Tip";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {tip.category && (
                <span className="px-3 py-1 bg-green-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                  {tip.category}
                </span>
              )}
              {tip.difficulty && (
                <span
                  className={`px-3 py-1 text-white text-xs sm:text-sm font-semibold rounded-full ${
                    tip.difficulty === "Easy"
                      ? "bg-green-600"
                      : tip.difficulty === "Medium"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                >
                  {tip.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              {tip.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Author Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {tip.userName?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {tip.userName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {tip.userEmail}
              </p>
              {tip.bio && (
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {tip.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Meta Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
            Tip Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Title */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                TITLE
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                {tip.title}
              </p>
            </div>

            {/* Plant Type */}
            {tip.plantType && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                  PLANT TYPE
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                  {tip.plantType}
                </p>
              </div>
            )}

            {/* Difficulty */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                DIFFICULTY
              </p>
              <p
                className={`text-sm sm:text-base font-bold ${
                  tip.difficulty === "Easy"
                    ? "text-green-600"
                    : tip.difficulty === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {tip.difficulty}
              </p>
            </div>

            {/* Category */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                CATEGORY
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                {tip.category}
              </p>
            </div>
          </div>
        </div>

        {/* Description Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            About This Tip
          </h3>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
              {tip.description ||
                "No detailed description available for this tip."}
            </p>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-1">
                VISIBILITY
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {tip.availability === "Public" ? (
                  <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15.898 4.045c-1.6.263-2.612 1.898-3.506 3.159-.898 1.264-1.57 1.834-3.392 1.834s-2.494-.57-3.392-1.834c-.894-1.261-1.906-2.896-3.506-3.159C.098 3.971-.5 5.409.356 6.747c.888 1.338 1.560 1.845 2.303 2.921.394.596.508 1.288.508 2.330 0 4.302 3.414 7.502 7.633 7.502s7.633-3.2 7.633-7.502c0-1.042.114-1.734.508-2.33.743-1.076 1.415-1.583 2.303-2.921.856-1.338.256-2.776-1.149-2.702z" />
                    </svg>
                    Public
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Hidden
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsDesc;
