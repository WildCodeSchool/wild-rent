import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/Home";
import ProductsByCategories from "./pages/ProductsByCategories";
import ProductDetails from "./pages/ProductDetails";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import ConfirmEmailPage from "./pages/ConfirmEmail";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="produits/categorie/:title"
            element={<ProductsByCategories />}
          />
          <Route path="produit/:id" element={<ProductDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm/:code?" element={<ConfirmEmailPage />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
