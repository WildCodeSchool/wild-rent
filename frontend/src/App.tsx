import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./pages/Layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<ProductDetails />} />
        <Route path="product/:id" element={<ProductDetails />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
