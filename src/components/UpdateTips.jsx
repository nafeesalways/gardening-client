import React from 'react';
import { useLoaderData, useNavigate } from 'react-router'; // Corrected import
import Swal from 'sweetalert2';

const UpdateTips = () => {
  const tip = useLoaderData(); 
  const navigate = useNavigate();

  const handleUpdateTip = (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedTip = {
      name: form.name.value,
      plantType: form.plantType.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      category: form.category.value,
      availability: form.availability.value,
      userEmail: form.userEmail.value,
      userName: form.userName.value,
      bio: tip.bio, // Preserve bio unless editable
    };

    fetch(`https://gardening-hub-server-indol.vercel.app/myTips/${tip._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTip),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          Swal.fire({
            title: 'Success!',
            text: 'Your garden tip has been updated.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/myTips'); // redirect after update
        }
      });
  };

  return (
   <div className="mt-10 px-6 py-10 bg-green-50 rounded-3xl shadow-xl border border-green-200 max-w-3xl mx-auto">
  <h2 className="text-green-700 italic font-extrabold text-4xl mb-8 text-center">
    🌿 Update Garden Tip
  </h2>
  
  <form onSubmit={handleUpdateTip} className="space-y-6 text-green-900">
    
    {/* Title */}
    <div>
      <label htmlFor="title" className="block text-sm font-semibold mb-1">
        Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        name="name"
        defaultValue={tip.name}
        placeholder='e.g., "How I Grow Tomatoes Indoors"'
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      />
    </div>

    {/* Plant Type/Topic */}
    <div>
      <label htmlFor="plantType" className="block text-sm font-semibold mb-1">
        Plant Type/Topic <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="plantType"
        name="plantType"
        defaultValue={tip.plantType}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      />
    </div>

    {/* Difficulty */}
    <div>
      <label htmlFor="difficulty" className="block text-sm font-semibold mb-1">
        Difficulty Level <span className="text-red-500">*</span>
      </label>
      <select
        id="difficulty"
        name="difficulty"
        defaultValue={tip.difficulty}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      >
        <option value="">Select Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>

    {/* Description */}
    <div>
      <label htmlFor="description" className="block text-sm font-semibold mb-1">
        Description <span className="text-red-500">*</span>
      </label>
      <textarea
        id="description"
        name="description"
        rows="5"
        defaultValue={tip.description}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Include steps, materials, and helpful tips..."
      ></textarea>
    </div>

    {/* Image URL */}
    <div>
      <label htmlFor="imageUrl" className="block text-sm font-semibold mb-1">
        Image URL
      </label>
      <input
        type="url"
        id="imageUrl"
        name="imageUrl"
        defaultValue={tip.imageUrl}
        className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      />
    </div>

    {/* Category */}
    <div>
      <label htmlFor="category" className="block text-sm font-semibold mb-1">
        Category <span className="text-red-500">*</span>
      </label>
      <select
        id="category"
        name="category"
        defaultValue={tip.category}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
      <label htmlFor="availability" className="block text-sm font-semibold mb-1">
        Availability <span className="text-red-500">*</span>
      </label>
      <select
        id="availability"
        name="availability"
        defaultValue={tip.availability}
        required
        className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      >
        <option value="Public">Public</option>
        <option value="Hidden">Hidden</option>
      </select>
    </div>

    {/* Read-only Email */}
    <div>
      <label htmlFor="userEmail" className="block text-sm font-semibold mb-1">
        Your Email
      </label>
      <input
        type="email"
        id="userEmail"
        name="userEmail"
        defaultValue={tip.userEmail}
        readOnly
        className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
      />
    </div>

    {/* Read-only Name */}
    <div>
      <label htmlFor="userName" className="block text-sm font-semibold mb-1">
        Your Name
      </label>
      <input
        type="text"
        id="userName"
        name="userName"
        defaultValue={tip.userName}
        readOnly
        className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full btn py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition duration-300"
    >
      🌱 Update Garden Tips
    </button>
  </form>
</div>

  );
};

export default UpdateTips;
