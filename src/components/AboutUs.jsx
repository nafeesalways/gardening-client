import React from "react";

const AboutUs = () => {
  return (
    <section className="my-12 px-4 md:px-8 lg:px-20 text-green-900">
      <h2 className="text-4xl font-bold text-center mb-6 text-green-800">🌿 About GardenHub</h2>

      <p className="text-center max-w-3xl mx-auto text-green-700 text-lg mb-12">
        <strong>GardenHub</strong> is a collaborative platform built for gardeners, by gardeners. 
        Our mission is to cultivate a vibrant and inclusive gardening community where individuals 
        of all experience levels can share knowledge, find inspiration, and grow together.
      </p>

      {/* Mission, Vision, Goals */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-green-100 p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">🌱 Our Mission</h3>
          <p>
            To empower people across the world to grow their own food, embrace sustainability, and
            connect with nature through gardening — whether on a balcony or a backyard.
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">🎯 Our Goals</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Create a knowledge base for plant care, composting, and harvesting.</li>
            <li>Enable users to track and share their gardening tips and experiences.</li>
            <li>Support eco-friendly and sustainable gardening practices.</li>
            <li>Connect gardeners through profiles, posts, and community support.</li>
          </ul>
        </div>
      </div>

      {/* Roles */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-green-800 text-center mb-6">🌼 What We Offer</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
            <h4 className="text-xl font-semibold mb-2">👩‍🌾 Gardener Profiles</h4>
            <p>Connect with passionate gardeners, explore their techniques, and get inspired by their stories.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
            <h4 className="text-xl font-semibold mb-2">📝 Tip Sharing</h4>
            <p>Share your gardening tips — from seed starting to pest control — with the community.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
            <h4 className="text-xl font-semibold mb-2">🌍 Sustainability Focus</h4>
            <p>We encourage organic practices, permaculture principles, and eco-conscious growing methods.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
            <h4 className="text-xl font-semibold mb-2">📚 Learning Resources</h4>
            <p>Blogs, guides, and articles to help everyone — from beginners to experts — grow smarter.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
            <h4 className="text-xl font-semibold mb-2">💬 Community Support</h4>
            <p>Ask questions, get answers, and encourage each other in a friendly, green-loving space.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
            <h4 className="text-xl font-semibold mb-2">📷 Visual Showcase</h4>
            <p>Upload photos of your garden, plant progress, or DIY projects to inspire others.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-bold mb-3">Join the GardenHub Community</h3>
        <p className="text-green-700 max-w-xl mx-auto mb-5">
          Whether you're growing food for your family, planting your first pot of basil, or cultivating a rooftop jungle — 
          GardenHub is here to support and grow with you.
        </p>

      </div>
    </section>
  );
};

export default AboutUs;
