import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";


const MainLayouts = () => {
  return (
    <div>
      <Header></Header>
  
      <div className="min-h-[calc(100vh-68px)]">
  
          <Outlet></Outlet>
      
      </div>
      <footer className="mt-6">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayouts;
