import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";


const MainLayouts = () => {
  return (
    <div>
      <Header></Header>
  
      <div>
        <Container>
          <Outlet></Outlet>
        </Container>
      </div>
      <footer className="mt-6">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayouts;
