import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // ✅ FIXED
import { Helmet } from "react-helmet-async";

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("");

  const fetchTips = async (selectedDifficulty) => {
    try {
      setLoading(true);
      const url = selectedDifficulty
        ? `https://gardening-hub-server-indol.vercel.app/public-garden-tips?difficulty=${encodeURIComponent(
            selectedDifficulty
          )}`
        : "https://gardening-hub-server-indol.vercel.app/public-garden-tips";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch garden tips");
      }

      const data = await response.json();
      setTips(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load garden tips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips(difficulty);
  }, [difficulty]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading garden tips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <Helmet>
        <title>GardenHub | Browse Tips</title>
      </Helmet>

      <h1 className="text-4xl font-extrabold text-green-500 italic mb-8 text-center">
        Browse Garden Tips
      </h1>

      {/* --- FILTERING DROPDOWN --- */}
      <div className="flex justify-end mb-6">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 shadow-sm"
        >
          <option value="">All Difficulty Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {tips.length === 0 ? (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded"
          role="alert"
        >
          <p className="font-bold">No public garden tips available yet!</p>
          <p>Be the first to share your wisdom.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tips.map((tip) => (
                <tr key={tip._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">
                    {tip.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-center">
                    {tip.category}
                  </td>
                  <td className="px-6 py-4 text-left">
                    {tip.imageUrl ? (
                      <img
                        src={tip.imageUrl}
                        alt={tip.title}
                        className="h-16 w-16 object-cover rounded-md border border-gray-200 shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/64x64.png?text=No+Image";
                        }}
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/tipsDetails/${tip._id}`}
                      className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md border border-green-600 hover:border-green-900 transition-colors duration-200"
                    >
                      See More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tips;
