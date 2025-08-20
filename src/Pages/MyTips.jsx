import React, { useState } from "react";
import { useLoaderData } from "react-router";
import TipChart from "./TipChart";
import { Helmet } from 'react-helmet-async';

const MyTips = () => {
  const data = useLoaderData();
  const tips = data.filter((item) => item.title);
  const users = data.filter((item) => item.name);

  // Store the filtered tips in state
  const [filteredTips, setFilteredTips] = useState(
    tips.filter((tip) => tip.userEmail === "user@example.com")
  );

  // Handler to remove a tip after successful deletion
  const handleTipDeleted = (deletedId) => {
    setFilteredTips(oldTips => oldTips.filter(tip => tip._id !== deletedId));
  };

  return (
    <div>
      <Helmet>
        <title>GardenHub | My Tips</title>
      </Helmet>
      <div className="p-6">
        <TipChart tips={filteredTips} users={users} onDelete={handleTipDeleted} />
      </div>
    </div>
  );
};

export default MyTips;
