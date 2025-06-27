import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayouts from "./Layouts/MainLayouts.jsx";
import Home from "./components/Home.jsx";
import ExploreGardeners from "./Pages/ExploreGardeners.jsx";
import Tips from "./Pages/Tips.jsx";
import MyTips from "./Pages/MyTips.jsx";
import Login from "./components/Login.jsx";

import Register from "./components/Register.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import SharedGardenTip from "./components/SharedGardenTip.jsx";
import PrivateRoute from "./provider/PrivateRoute.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import TipsDetails from "./components/TipsDetails.jsx";
import TipsDesc from "./components/TipsDesc.jsx";
import UpdateTips from "./components/UpdateTips.jsx";
import "react-tooltip/dist/react-tooltip.css";
import { HelmetProvider } from "react-helmet-async";
import AboutUs from "./components/AboutUs.jsx";
import Career from "./components/Career.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import ActiveGardeners from "./Pages/Dashboard/ActiveGardeners.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/explore",
        Component: ExploreGardeners,
      },
      {
        path: "/tips",
        Component: Tips,
      },
     
      {
        path: "/share",
        element: (
          <PrivateRoute>
            <SharedGardenTip></SharedGardenTip>
          </PrivateRoute>
        ),
      },
      {
        path: "/myTips",
        loader: () => fetch("http://localhost:3000/myTips"),
        element: (
          <PrivateRoute>
            <MyTips></MyTips>
          </PrivateRoute>
        ),
      },
      {
        path: "/tipsDetails/:id",
        element: (
          <PrivateRoute>
            <TipsDetails></TipsDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/myTips/:id",
        element: (
          <PrivateRoute>
            <TipsDesc></TipsDesc>
          </PrivateRoute>
        ),
      },
      {
         path:'/about',
         Component:AboutUs,
      },
  
      {
         path:'/career',
         Component:Career,
      },
      {
        path:'/updateTips/:id',
        loader:({params})=>fetch(`http://localhost:3000/myTips/${params.id}`),
        element:<PrivateRoute>
       <UpdateTips></UpdateTips>
        </PrivateRoute>
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/*",
        Component: ErrorPage,
      },
    ],
  },
  {
    path:'/dashboard',
    element:<PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path:'activeGardeners',
        Component:ActiveGardeners,
      },
    ]
  },
 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <HelmetProvider>
     <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </AuthProvider>
   </HelmetProvider>
  </StrictMode>
);
