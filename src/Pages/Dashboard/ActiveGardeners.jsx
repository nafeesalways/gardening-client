import React, { useEffect, useState } from 'react';

const ActiveGardeners = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveGardeners = async () => {
      try {
        const response = await fetch('https://gardening-hub-server-indol.vercel.app/active-gardeners');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCount(data.length);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch active gardeners count:", err);
      }
    };

    fetchActiveGardeners();
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  return (
  <div className="stats shadow w-full max-w-md mx-auto my-6 border border-gray-50">
      <div className="stat">
        <div className="stat-title font-bold italic text-xl text-green-500">Total Active Gardeners</div>
        <div className="stat-value text-accent">{count}</div>
        <div className="stat-desc font-bold italic text-xl  text-green-500">Compared to last 30 days</div>
      </div>
    </div>
  );
};

export default ActiveGardeners;
