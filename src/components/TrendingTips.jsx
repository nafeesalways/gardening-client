import React, { useEffect, useState } from "react";

const TrendingTips = () => {
  const [tips, setTips] = useState([]);

  const fetchTips = () => {
    fetch("http://localhost:3000/public-garden-tips")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);
        setTips(sorted);
      });
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleLike = async (tipId) => {
    try {
      const res = await fetch(`http://localhost:3000/tips/${tipId}/like`, {
        method: "PATCH",
      });

      if (res.ok) {
        // Update like count locally
        setTips((prevTips) =>
          prevTips.map((tip) =>
            tip._id === tipId
              ? { ...tip, like: (tip.like || 0) + 1 }
              : tip
          )
        );
      }
    } catch (error) {
      console.error("Error liking tip:", error);
    }
  };

  return (
    <section className="bg-white py-10 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-500 italic mb-6">
          Top Trending Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-7 shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={tip.imageUrl || "https://via.placeholder.com/300x200.png?text=No+Image"}
                alt={tip.title}
                className="rounded-md h-40 w-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-green-500 mb-2">
                {tip.title || "No Title"}
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                {tip.description || "No description available."}
              </p>
              <button
                onClick={() => handleLike(tip._id)}
                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              >
                 Like ({tip.like || 0})
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTips;
