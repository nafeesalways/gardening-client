import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const TipsDetails = () => {
  const { id } = useParams();
  console.log(id)
  const [tip, setTip] = useState(null);

  useEffect(() => {
    fetch(`https://gardening-hub-server-indol.vercel.app/singleData/${id}`)
      .then(res => res.json())
      .then(data => setTip(data));
  }, [id]);

  if (!tip) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl text- font-bold text-green-700 mb-4">{tip.title}</h1>
      <img src={tip.imageUrl} alt={tip.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="text-gray-700">{tip.description}</p>
  
    </div>
  );
};

export default TipsDetails;
