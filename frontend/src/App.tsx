import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ProductsByCategories from "./pages/ProductsByCategories";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="produits/categorie/:title"
          element={<ProductsByCategories />}
        />
        <Route path="product/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
