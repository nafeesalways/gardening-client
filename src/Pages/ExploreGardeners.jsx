import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/explore.json") // Change if hosted
      .then((res) => res.json())
      .then((data) => setGardeners(data));
      setLoading(false)
  }, []);
  if(loading){
    return <Loader></Loader>
  }
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Helmet>
        <title>GardenHub | Explore Gardeners</title>
      </Helmet>
      {gardeners.map((gardener) => (
        <div key={gardener._id} className="bg-white shadow-lg rounded-2xl p-4">
          <img
            src={gardener.imageUrl}
            alt={gardener.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold">{gardener.name}</h2>
          <p><strong>Age:</strong> {gardener.age}</p>
          <p><strong>Gender:</strong> {gardener.gender}</p>
          <p><strong>Status:</strong> {gardener.status}</p>
          <p><strong>Experience:</strong> {gardener.experience}</p>
          <p><strong>Total Tips:</strong> {gardener.totalTips || 0}</p>
          {gardener.bio && <p className="text-gray-600 mt-2">{gardener.bio}</p>}
        </div>
      ))}
    </div>
  );
};

export default ExploreGardeners;
