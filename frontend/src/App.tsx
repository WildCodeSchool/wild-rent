import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/Home";
import ProductsByCategories from "./pages/ProductsByCategories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="produits/categorie/:title"
          element={<ProductsByCategories />}
        />
      </Route>
    </Routes>
  );
}

export default App;
