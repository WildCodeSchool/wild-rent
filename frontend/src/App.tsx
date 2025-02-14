import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </>
  );
}

export default App;
