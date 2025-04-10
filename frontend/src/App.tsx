import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import ProductsByCategories from "./pages/ProductsByCategories";
import ProductDetails from "./pages/ProductDetails";
import { Layout } from "./pages/Layout";
import ConfirmEmailPage from "./pages/ConfirmEmail";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import { AdminLayout } from "./pages/AdminLayout";
import { AdminArticle } from "./pages/AdminArticle";
import { AdminHomepage } from "./pages/AdminHomepage";

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
          <Route path="panier" element={<Cart />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm/:code?" element={<ConfirmEmailPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomepage />} />
          <Route path="article" element={<AdminArticle />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
