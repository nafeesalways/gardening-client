import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const ShareGardenTip = () => {
  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficulty: "",
    description: "",
    imageUrl: "",
    category: "",
    availability: "Public",
    userEmail: "user@example.com",
    userName: "John Doe",
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionSuccess(false);
    setSubmissionError(false);
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://gardening-hub-server-indol.vercel.app/garden-tips",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);

      setSubmissionSuccess(true);
      setFormData({
        title: "",
        plantType: "",
        difficulty: "",
        description: "",
        imageUrl: "",
        category: "",
        availability: "Public",
        userEmail: "user@example.com",
        userName: "John Doe",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmissionSuccess(false), 5000);
    } catch (error) {
      setSubmissionError(true);
      console.error("Error submitting form:", error);

      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmissionError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>GardenHub | Share a Garden Tip</title>
      </Helmet>

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          Share Your Garden Tip
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          Help fellow gardeners grow by sharing your expertise and experiences
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Success / Error messages */}
        {submissionSuccess && (
          <div
            className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-800 dark:text-green-300 p-4 m-6 rounded-lg animate-fadeIn"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-bold">Success!</p>
                <p className="text-sm">
                  Your garden tip has been submitted successfully. Thank you for
                  sharing! 🎉
                </p>
              </div>
            </div>
          </div>
        )}

        {submissionError && (
          <div
            className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 p-4 m-6 rounded-lg animate-fadeIn"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-bold">Error!</p>
                <p className="text-sm">
                  There was an issue submitting your tip. Please try again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Tip Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., How to Start Composting at Home"
              required
              className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Two-column grid for Plant Type and Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Plant Type/Topic */}
            <div>
              <label
                htmlFor="plantType"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Plant Type/Topic <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="plantType"
                name="plantType"
                value={formData.plantType}
                onChange={handleChange}
                placeholder='e.g., "Herbs", "Vegetables"'
                required
                className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Difficulty Level */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Difficulty Level <span className="text-red-500">*</span>
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="select select-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">🌱 Easy</option>
                <option value="Medium">🌿 Medium</option>
                <option value="Hard">🌳 Hard</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share your gardening wisdom! Include steps, materials needed, and any helpful tips..."
              required
              className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all resize-none"
            ></textarea>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimum 50 characters recommended for detailed tips
            </p>
          </div>

          {/* Two-column grid for Category and Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="select select-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              >
                <option value="">Select Category</option>
                <option value="Composting">♻️ Composting</option>
                <option value="Plant Care">🌺 Plant Care</option>
                <option value="Vertical Gardening">
                  🏢 Vertical Gardening
                </option>
                <option value="Pest Control">🐛 Pest Control</option>
                <option value="Soil Health">🌍 Soil Health</option>
                <option value="Watering">💧 Watering</option>
                <option value="DIY Projects">🔨 DIY Projects</option>
                <option value="Harvesting">🌾 Harvesting</option>
                <option value="Seed Starting">🌱 Seed Starting</option>
                <option value="Other">📌 Other</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label
                htmlFor="availability"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Visibility <span className="text-red-500">*</span>
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                className="select select-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              >
                <option value="Public">🌐 Public</option>
                <option value="Hidden">🔒 Hidden</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Image URL{" "}
              <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Add a photo to make your tip more engaging
            </p>
          </div>

          {/* User Info Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Your Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* User Email (Read-only) */}
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
              </div>

              {/* User Name (Read-only) */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 sm:py-4 px-6 font-bold rounded-xl text-base sm:text-lg bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Submit Garden Tip
              </>
            )}
          </button>
        </form>
      </div>

      {/* CSS for fade-in animation */}
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
      `}</style>
    </div>
  );
};

export default ShareGardenTip;
