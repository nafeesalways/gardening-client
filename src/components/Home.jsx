import React from "react";
import Banner from "./Banner";
import FeaturedGarden from "./FeaturedGarden";
import Reviews from "./Reviews";
import Tools from "./Tools";
import TrendingTips from "./TrendingTips";

import "react-tooltip/dist/react-tooltip.css";
import { Helmet } from "react-helmet-async";
import BlogSection from "./BlogSection";
import Newsletter from "./Newsletter";
import Container from "./Container";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> GardenHub</title>
      </Helmet>

      <Banner></Banner>

      <section className="mt-6">
      <Container>
          <FeaturedGarden></FeaturedGarden>
      </Container>
      </section>

      <section className="mt-6">
      <Container>
          <TrendingTips></TrendingTips>
      </Container>
      </section>
      <section className="mt-6">
       <Container>
         <BlogSection></BlogSection>
       </Container>
      </section>
      <section className="mt-6">
      <Container>
          <Newsletter></Newsletter>
      </Container>
      </section>

      <section className="mt-6">
        <Container>
          <Tools></Tools>
        </Container>
      </section>

      <section className="mt-6">
     <Container>
         <Reviews></Reviews>
     </Container>
      </section>
    </div>
  );
};

export default Home;
