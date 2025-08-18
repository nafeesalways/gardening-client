import React from "react";
import { MdOutlineSecurityUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CgDetailsLess } from "react-icons/cg";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Helmet } from 'react-helmet-async';


const TipChart = ({ tips }) => {
 
  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    fetch(`https://gardening-hub-server-indol.vercel.app/myTips/${_id}`,{
      method:'DELETE'

    })
    .then(res=>res.json())
    .then(data=>{
      if(data.deletedCount){
        Swal.fire({
          title: "Deleted!",
          text: "Your Tip has been deleted.",
          icon: "success"
        });

      }
    })
  }
});
  };
  return (
    <div className="overflow-x-auto  shadow-xl rounded-2xl p-6 border">
      <Helmet>
              <title>GardenHub | Tips Details</title>
            </Helmet>
      <h2 className="text-2xl font-bold  mb-4">
        My Gardening Tips
      </h2>
      <table className="table w-full">
        <thead>
          <tr className="text-left text-green-900 border-b-2 border-green-300">
            <th className="py-3 text-green-600">Image</th>
            <th className="py-3 text-green-600">Name</th>
            <th className="py-3 text-green-600">Bio</th>
            <th className="py-3 text-green-600">Tip Title</th>
            <th className="py-3 text-green-600">Difficulty</th>
            <th className="py-3 text-green-600">Category</th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip) => {
            console.log(tip);
          
            return (
              <tr
                key={tip._id}
                className=""
              >
                <td className="py-2">
                  <img
                    src={tip?.imageUrl}
                    className="w-16 h-16 object-cover rounded-full border border-green-300"
                  />
                </td>
                <td className="py-2 font-semibold text-green-600">
                  {tip?.userName}
                </td>
                <td className="py-2 text-green-700">{tip?.bio || "No Bio"}</td>
                <td className="py-2 text-green-700">{tip.title}</td>
                <td className="py-2 text-green-700">{tip.difficulty}</td>
                <td className="py-2 text-green-700">{tip.category}</td>
                <div className="join join-vertical space-y-2 mt-5">
                  <Link to={`/myTips/${tip._id}`} className="btn join-item">
                    <CgDetailsLess size={20} />
                  </Link>
                  <Link to={`/updateTips/${tip._id}`} className="btn join-item">
                    <MdOutlineSecurityUpdate size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(tip._id)}
                    className="btn join-item"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TipChart;
