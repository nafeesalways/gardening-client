import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const FeaturedGarden = () => {
  const [activeGardeners, setActiveGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveGardeners = async () => {
      try {
        const response = await fetch('http://localhost:3000/active-gardeners');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActiveGardeners(data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch active gardeners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveGardeners();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  if (activeGardeners.length === 0) return <p>No active gardeners found.</p>;

  return (
    <section className="featured-gardeners mt-8 px-4">
      <h2 className="text-2xl font-bold italic text-green-600 mb-2">Active Gardeners</h2>
      <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3">
        {activeGardeners.map((gardener) => (
          <div
            key={gardener._id}
            className="bg-white border rounded-xl p-4 shadow hover:shadow-md text-center"
          >
            <img
              src={gardener.imageUrl}
              alt={gardener.name}
              className="w-28 h-28 rounded-full mx-auto mb-3 border-4 border-green-500 object-cover"
            />
            <h3 className="text-lg font-semibold text-green-700">{gardener.name}</h3>
            <p className="text-gray-600 text-sm">{gardener.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGarden;
