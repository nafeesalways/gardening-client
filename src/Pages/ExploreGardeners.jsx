import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        // Replace with your actual backend URL if using API
        const response = await fetch('/explore.json'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGardeners(data);
      } catch (err) {
        console.error("Failed to fetch gardeners:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="p-6">
      <Helmet>
        <title>GardenHub | Explore Gardeners</title>
      </Helmet>

      {/* Total explored gardeners stat */}
      <div className="stats shadow w-full max-w-md mx-auto mb-8">
        <div className="stat">
          <div className="stat-title text-green-700">Total Explored Gardeners</div>
          <div className="stat-value text-accent">{gardeners.length}</div>
          <div className="stat-desc text-green-500">As of today</div>
        </div>
      </div>

      {/* Gardener Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gardeners.map((gardener) => (
          <div key={gardener._id} className="bg-white shadow-lg rounded-2xl p-4">
            <img
              src={gardener.imageUrl}
              alt={gardener.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-bold text-black">{gardener.name}</h2>
            <p className="text-black"><strong>Age:</strong> {gardener.age}</p>
            <p className="text-black"><strong>Gender:</strong> {gardener.gender}</p>
            <p className="text-black"><strong>Status:</strong> {gardener.status}</p>
            <p className="text-black"><strong>Experience:</strong> {gardener.experience}</p>
            <p className="text-black"><strong>Total Tips:</strong> {gardener.totalTips || 0}</p>
            {gardener.bio && <p className="text-gray-600 mt-2">{gardener.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreGardeners;
