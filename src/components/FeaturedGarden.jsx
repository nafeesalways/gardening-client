// FeaturedGarden.js (or similar component in your frontend framework)
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const FeaturedGarden = () => {
  const [activeGardeners, setActiveGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveGardeners = async () => {
      try {
        // Make sure this URL matches your backend's running address and port
        const response = await fetch('https://gardening-hub-server-indol.vercel.app/active-gardeners');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setActiveGardeners(data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch active gardeners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveGardeners();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <p>Error loading gardeners: {error.message}</p>;
  }

  if (activeGardeners.length === 0) {
    return <p>No active gardeners found for featured display.</p>;
  }

  return (
    <section className="featured-gardeners mt-8">
      <h2 className='text-2xl font-bold italic text-green-500'>Active Gardeners</h2>
      <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive grid
          gap: '20px',
          padding: '20px'
        }}>
        {/* Map over the active gardeners and render their profiles */}
        {activeGardeners.map((gardener) => (
          <div key={gardener._id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#fff'
          }}>
            <img className='mx-auto'
              src={gardener.imageUrl}
             
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '10px',
                border: '3px solid #4CAF50' // Green border for active look
              }}
            />
            <h3 className='text-lg font-semibold'>{gardener.name}</h3>
            <p className='text-gray-500' style={{ fontSize: '0.9em'}}>{gardener.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGarden;