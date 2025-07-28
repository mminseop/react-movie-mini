import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail.jsx";
import Layout from "./pages/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
