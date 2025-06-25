import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const ShareGardenTip = () => {
  const [formData, setFormData] = useState({
    title: '',
    plantType: '',
    difficulty: '',
    description: '',
    imageUrl: '',
    category: '',
    availability: 'Public', // Default to Public
    userEmail: 'user@example.com', // Read-only, replace with actual user email
    userName: 'John Doe', // Read-only, replace with actual user name
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

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


    try {
     const res  =  await fetch('https://gardening-hub-server-indol.vercel.app/garden-tips',{
        method:'POST',
       headers:{
         'content-type':'application/json',
       },
       body:JSON.stringify(formData)

     })
     const data = await res.json()
     console.log(data)
      console.log('Form Data Submitted:', formData);
 
      setSubmissionSuccess(true);
      setFormData({
        title: '',
        plantType: '',
        difficulty: '',
        description: '',
        imageUrl: '',
        category: '',
        availability: 'Public',
        userEmail: 'user@example.com',
        userName: 'John Doe',
      });
      // --- End Mocking ---

    } catch (error) {
      setSubmissionError(true);
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <Helmet>
              <title>GardenHub | Share a Garden</title>
            </Helmet>
      <h2 className="text-3xl font-extrabold text-green-500 italic mb-6 text-center">Share Your Garden Tip! 🍀</h2>

      {submissionSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Success!</p>
          <p>Your garden tip has been submitted successfully,'Yeyyy'.</p>
        </div>
      )}

      {submissionError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Error!</p>
          <p>There was an issue submitting your tip. Please try again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder='e.g., "How I Grow Tomatoes Indoors"'
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Plant Type/Topic */}
        <div>
          <label htmlFor="plantType" className="block text-sm font-medium text-gray-700 mb-1">
            Plant Type/Topic <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="plantType"
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            placeholder='e.g., "Herbs", "Composting Basics"'
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Difficulty Level */}
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level <span className="text-red-500">*</span>
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="6"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of your garden tip, including steps, materials, and any helpful insights."
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Images URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="e.g., https://example.com/your-image.jpg"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            <option value="Composting">Composting</option>
            <option value="Plant Care">Plant Care</option>
            <option value="Vertical Gardening">Vertical Gardening</option>
            <option value="Pest Control">Pest Control</option>
            <option value="Soil Health">Soil Health</option>
            <option value="Watering">Watering</option>
            <option value="DIY Projects">DIY Projects</option>
            <option value="Harvesting">Harvesting</option>
            <option value="Seed Starting">Seed Starting</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Availability <span className="text-red-500">*</span>
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="Public">Public</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        {/* User Email (Read-only) */}
        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            readOnly
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed sm:text-sm"
          />
        </div>

        {/* User Name (Read-only) */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            readOnly
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn italic flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          Submit Garden Tip
        </button>
      </form>
    </div>
  );
};

export default ShareGardenTip;