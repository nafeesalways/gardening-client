import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";


const MainLayouts = () => {
  return (
    <div>
      <Container>
      <Header></Header>

      <div>
        <Outlet></Outlet>
      </div>
      <footer className="mt-6">
        <Footer></Footer>
      </footer>
      </Container>
    </div>
  );
};

export default MainLayouts;
