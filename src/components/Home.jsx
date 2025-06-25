import React from "react";
import Banner from "./Banner";
import FeaturedGarden from "./FeaturedGarden";
import Reviews from "./Reviews";
import Tools from "./Tools";
import TrendingTips from "./TrendingTips";



import "react-tooltip/dist/react-tooltip.css";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> GardenHub</title>
      </Helmet>
      <section className="mt-6">
      
      

        <Banner></Banner>
      </section>

      <section>
        <FeaturedGarden></FeaturedGarden>
      </section>

      <section className="mt-6">
        <TrendingTips></TrendingTips>
      </section>

      <section className="mt-6">
        <Tools></Tools>
      </section>

      <section className="mt-6">
        <Reviews></Reviews>
      </section>
    </div>
  );
};

export default Home;
