import React from "react";
import { MdOutlineSecurityUpdate, MdDelete } from "react-icons/md";
import { CgDetailsLess } from "react-icons/cg";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Helmet } from 'react-helmet-async';

const TipChart = ({ tips, onDelete }) => {
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gardening-hub-server-indol.vercel.app/myTips/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your Tip has been deleted.',
                icon: 'success',
                background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#ffffff',
                color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#000000',
              });
              onDelete(_id);
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>GardenHub | My Tips</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            My Gardening Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your shared gardening knowledge
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Tips</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{tips.length}</p>
            </div>
          </div>
        </div>

        {/* Desktop Table View (hidden on mobile) */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-green-100 dark:bg-green-900/30">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Image</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Author</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Title</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Difficulty</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {tips.map((tip) => (
                  <tr
                    key={tip._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <img
                        src={tip?.imageUrl}
                        className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                        alt={tip?.userName || 'User'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/48";
                        }}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{tip?.userName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tip?.userEmail}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                      {tip.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tip.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : tip.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {tip.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                      {tip.category}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2 justify-center">
                        <Link
                          to={`/myTips/${tip._id}`}
                          className="btn btn-sm btn-ghost text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          title="View Details"
                        >
                          <CgDetailsLess size={20} />
                        </Link>
                        <Link
                          to={`/updateTips/${tip._id}`}
                          className="btn btn-sm btn-ghost text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30"
                          title="Update"
                        >
                          <MdOutlineSecurityUpdate size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(tip._id)}
                          className="btn btn-sm btn-ghost text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                          title="Delete"
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

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {tips.map((tip) => (
            <div
              key={tip._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Card Header with Image */}
              <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
                <img
                  src={tip?.imageUrl}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-green-200 dark:border-green-700"
                  alt={tip?.userName || 'User'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 truncate">{tip.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tip?.userName}</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Difficulty</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tip.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : tip.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {tip.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Category</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-semibold">{tip.category}</span>
                </div>

                {tip.bio && (
                  <div className="py-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium block mb-1">Bio</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{tip.bio}</p>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 flex gap-2">
                <Link
                  to={`/myTips/${tip._id}`}
                  className="flex-1 btn btn-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white border-none"
                >
                  <CgDetailsLess size={18} />
                  Details
                </Link>
                <Link
                  to={`/updateTips/${tip._id}`}
                  className="flex-1 btn btn-sm bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white border-none"
                >
                  <MdOutlineSecurityUpdate size={18} />
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(tip._id)}
                  className="btn btn-sm bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white border-none"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tips.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No tips yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start sharing your gardening wisdom with the community!</p>
            <Link to="/share" className="btn bg-green-600 hover:bg-green-700 text-white">
              Share Your First Tip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipChart;
