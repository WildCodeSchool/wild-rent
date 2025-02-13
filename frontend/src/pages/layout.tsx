import React from "react";
import { Outlet } from "react-router-dom";
//import Header from "../components/Header";
//import { useState } from "react";

const Layout = () => {
 // const [showLogin, setShowLogin] = useState(false);
  return (
    <main className="main-content">
      <Outlet />
    </main>
  );
};

export default Layout;
