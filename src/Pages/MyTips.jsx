import React from "react";
import { useLoaderData } from "react-router";
import TipChart from "./TipChart";
import { Helmet } from 'react-helmet-async';

const MyTips = () => {
  const data = useLoaderData();

  const tips = data.filter((item) => item.title);
  const users = data.filter((item) => item.name);
//   console.log(users)

  const myTips = tips.filter((tip) => tip.userEmail === "user@example.com");
//   console.log(myTips)
  return (
    <div>
      <Helmet>
              <title>GardenHub | My Tips</title>
            </Helmet>
      <div className="p-6">
        <TipChart tips={myTips} users={users}>
          {" "}
        </TipChart>
      </div>
    </div>
  );
};

export default MyTips;
