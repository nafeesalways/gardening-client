import React from 'react';

const Tools = () => {
    return (
      <section className="bg-white py-16 px-6 border-t">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Gardening Tools</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold text-green-700 mb-2">Pruning Shears</h3>
        <p className="text-gray-700">Essential for trimming plants and shrubs with ease.</p>
      </div>
      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold text-green-700 mb-2">Soil Tester Kit</h3>
        <p className="text-gray-700">Get accurate pH and moisture readings for optimal growth.</p>
      </div>
      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold text-green-700 mb-2">Watering Can</h3>
        <p className="text-gray-700">Perfect balance between function and flow for your garden.</p>
      </div>
    </div>
  </div>
</section>

    );
};

export default Tools;