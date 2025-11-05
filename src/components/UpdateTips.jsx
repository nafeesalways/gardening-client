import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UpdateTips = () => {
  const tip = useLoaderData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateTip = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const updatedTip = {
      title: form.title.value,
      name: form.name.value,
      plantType: form.plantType.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      category: form.category.value,
      availability: form.availability.value,
      userEmail: form.userEmail.value,
      userName: form.userName.value,
      bio: tip.bio,
    };

    try {
      const response = await fetch(
        `https://gardening-hub-server-indol.vercel.app/myTips/${tip._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTip),
        }
      );

      const data = await response.json();

      if (data.modifiedCount) {
        await Swal.fire({
          title: "Success!",
          text: "Your garden tip has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          background:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "#1f2937"
              : "#ffffff",
          color:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "#ffffff"
              : "#000000",
        });
        navigate("/myTips");
      }
    } catch (error) {
      console.error("Error updating tip:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating your tip. Please try again.",
        icon: "error",
        background:
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "#1f2937"
            : "#ffffff",
        color:
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "#ffffff"
            : "#000000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>GardenHub | Update Tip</title>
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          Update Garden Tip 🌿
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          Edit and improve your gardening knowledge sharing
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <form onSubmit={handleUpdateTip} className="p-6 sm:p-8 space-y-6">
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
              defaultValue={tip.title || tip.name}
              placeholder='e.g., "How I Grow Tomatoes Indoors"'
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
                defaultValue={tip.plantType}
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
                defaultValue={tip.difficulty}
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
              defaultValue={tip.description}
              required
              placeholder="Include steps, materials needed, and any helpful tips..."
              className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all resize-none"
            ></textarea>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Detailed descriptions help other gardeners learn better
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
                defaultValue={tip.category}
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
                defaultValue={tip.availability}
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
              defaultValue={tip.imageUrl}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Update the image to make your tip more engaging
            </p>
          </div>

          {/* User Info Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Your Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                  defaultValue={tip.userName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
              </div>

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
                  defaultValue={tip.userEmail}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Button Group */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/myTips")}
              className="flex-1 btn btn-outline btn-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn btn-lg bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  Updating...
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Update Tip
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* CSS for animations */}
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

export default UpdateTips;
