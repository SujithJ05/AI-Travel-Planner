// src/components/Layout.jsx
import React from "react";
import Header from "./ui/custom/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet /> {/* Dynamic children go here */}
      </main>
    </>
  );
};

export default Layout;
