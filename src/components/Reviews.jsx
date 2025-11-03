import React from 'react';

const Reviews = () => {
    return (
      <section className="bg-green-50 py-12 px-4 md:px-16">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-green-800 mb-10">What Gardeners Are Saying </h2>
    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <p className="text-gray-700 mb-4">“GardeningHub helped me plan my first vegetable garden! Their planting calendar is a game-changer.”</p>
        <div className="text-green-600 font-semibold">— Virat k.</div>
        <div className="mt-2 text-yellow-500">★★★★★</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <p className="text-gray-700 mb-4">“I love the community section. I got quick help identifying pests on my tomato plants!”</p>
        <div className="text-green-600 font-semibold">— Steve S.</div>
        <div className="mt-2 text-yellow-500">★★★★☆</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <p className="text-gray-700 mb-4">“Beautiful UI and so much valuable info. A must-have resource for any home gardener.”</p>
        <div className="text-green-600 font-semibold">— Michael K.</div>
        <div className="mt-2 text-yellow-500">★★★★★</div>
      </div>
    </div>
  </div>
</section>

    );
};

export default Reviews;