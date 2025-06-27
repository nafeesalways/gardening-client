import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from './Loader';

const TipsDesc = () => {
      const { id } = useParams();
  const [tip, setTip] = useState(null);

  useEffect(() => {
    fetch(`https://gardening-hub-server-indol.vercel.app/myTips/${id}`)
      .then((res) => res.json())
      .then((data) => setTip(data));
  }, [id]);

  if (!tip) {
    return <Loader></Loader>;
  }
    return (
         <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-green-200">
      <h2 className="text-3xl font-bold text-green-800 mb-4">{tip.title}</h2>
      <img
        src={tip.imageUrl}
        alt={tip.title}
        className="w-full h-60 object-cover rounded-lg mb-4 border"
      />
      <p className="text-green-900 mb-2"><strong>User:</strong> {tip.userName}</p>
      <p className="text-green-700 mb-2"><strong>Bio:</strong> {tip.bio || "No Bio"}</p>
      <p className="text-green-700 mb-2"><strong>Difficulty:</strong> {tip.difficulty}</p>
      <p className="text-green-700 mb-2"><strong>Category:</strong> {tip.category}</p>
      <p className="text-green-700"><strong>Description:</strong> {tip.description || "No Description"}</p>
    </div>
    );
};

export default TipsDesc;