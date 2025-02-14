import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import { useState } from "react";

const Layout = () => {
  // const [showLogin, setShowLogin] = useState(false);
  return (
    <main className="main-content">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
