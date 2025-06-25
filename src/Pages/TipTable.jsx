import React from 'react';

const TipTable = ({ tip }) => {
  const { imageUrl, name, bio } = tip;

  return (
    <div className="overflow-x-auto bg-green-50 shadow-xl rounded-2xl p-4 border border-green-200">
      <table className="table w-full">
        <thead>
          <tr className="text-left text-green-800 border-b-2 border-green-300">
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Bio</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-green-100 transition duration-300">
            <td className="py-2">
              <img
                src={imageUrl}
                alt={name}
                className="w-16 h-16 object-cover rounded-full border-2 border-green-300"
              />
            </td>
            <td className="py-2 font-semibold text-green-900">{name}</td>
            <td className="py-2 text-green-700">{bio}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TipTable;
