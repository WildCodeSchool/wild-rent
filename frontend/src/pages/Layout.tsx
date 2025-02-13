import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Layout = () => {
  return (
    <main className="main-content">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};
