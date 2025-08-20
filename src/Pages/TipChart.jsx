import React from "react";
import { MdOutlineSecurityUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CgDetailsLess } from "react-icons/cg";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Helmet } from 'react-helmet-async';


const TipChart = ({ tips ,onDelete}) => {
 
 const handleDelete = (_id) => {
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
                fetch(`https://gardening-hub-server-indol.vercel.app/myTips/${_id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        Swal.fire('Deleted!', 'Your Tip has been deleted.', 'success');
                        onDelete(_id); // <-- Call the passed handler
                    }
                });
            }
        });
    };
  return (
   <div className="card shadow-xl rounded-2xl border border-base-200 p-6 mb-6 bg-base-100">
  <Helmet>
    <title>GardenHub | Tips Details</title>
  </Helmet>
  <h2 className="text-2xl font-bold mb-4 text-green-600">
    My Gardening Tips
  </h2>
  <div className="overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr className="bg-base-200">
          <th className="py-3 px-2 sm:px-4 text-base-content">Image</th>
          <th className="py-3 px-2 sm:px-4 text-base-content">Name</th>
          <th className="py-3 px-2 sm:px-4 text-base-content">Bio</th>
          <th className="py-3 px-2 sm:px-4 text-base-content">Title</th>
          <th className="py-3 px-2 sm:px-4 text-base-content">Difficulty</th>
          <th className="py-3 px-2 sm:px-4 text-base-content">Category</th>
          <th className="py-3 px-2 sm:px-4 text-base-content">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tips.map((tip) => (
          <tr
            key={tip._id}
            className="border-b border-base-200 hover:bg-base-200/50 transition-colors"
          >
            <td className="py-3 px-2 sm:px-4">
              <img
                src={tip?.imageUrl}
                className="w-12 h-12 object-cover rounded-full border-2 border-base-content/10"
                alt={tip?.userName || 'User'}
              />
            </td>
            <td className="py-3 px-2 sm:px-4 font-semibold text-green-500">
              {tip?.userName}
            </td>
            <td className="py-3 px-2 sm:px-4 text-base-content">
              {tip?.bio || "—"}
            </td>
            <td className="py-3 px-2 sm:px-4 text-base-content">
              {tip.title}
            </td>
            <td className="py-3 px-2 sm:px-4 text-base-content">
              {tip.difficulty}
            </td>
            <td className="py-3 px-2 sm:px-4 text-base-content">
              {tip.category}
            </td>
            <td className="py-3 px-2 sm:px-4">
              <div className="flex gap-2">
                <Link
                  to={`/myTips/${tip._id}`}
                  className="btn btn-ghost btn-sm"
                  aria-label="Details"
                >
                  <CgDetailsLess size={20} />
                </Link>
                <Link
                  to={`/updateTips/${tip._id}`}
                  className="btn btn-ghost btn-sm"
                  aria-label="Update"
                >
                  <MdOutlineSecurityUpdate size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(tip._id)}
                  className="btn btn-ghost btn-sm"
                  aria-label="Delete"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default TipChart;
