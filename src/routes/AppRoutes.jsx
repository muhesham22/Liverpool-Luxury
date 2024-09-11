import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import AllCarsPage from "../pages/all-cars/AllCarsPage";
import CheckOutPage from "../pages/check-out/CheckOutPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ContactUsPage from "../pages/contact-us/ContactUsPage";
import AboutUsPage from "../pages/about-us/AboutUsPage";
import BookingDetails from "../pages/admin/BookingDetails";
import Blank from "../pages/Blank/Blank";
import CarDetails from "../pages/car-details/CarDetails";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      component: <HomePage />,
    },
    {
      path: "/all-cars",
      component: <AllCarsPage />,
    },
    {
      path: "/all-cars/:id",
      component: <CarDetails />,
    },
    {
      path: "/all-cars/:id/check-out",
      component: <CheckOutPage />,
    },
    {
      path: "/profile",
      component: <ProfilePage />,
    },
    {
      path: "/about-us",
      component: <AboutUsPage />,
    },
    {
      path: "/contact-us",
      component: <ContactUsPage />,
    },
    {
      path: "/bookings/:id",
      component: <BookingDetails />,
    },
    {
      path:"*",
      component: <Blank />
    }
  ];
  return (
    <Routes>
      {routes?.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
