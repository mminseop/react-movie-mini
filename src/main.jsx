import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail.jsx";
import Layout from "./pages/Layout.jsx";
import MovieSearch from "./pages/MovieSearch.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SingUp.jsx";
import { UserAuthProvider } from "./context/UserAuthContext.jsx";
import OAuthCallback from "./pages/OAuthCallback.jsx";
import MyPage from "./pages/MyPage.jsx";
import UserSettings from "./components/UserSettings.jsx";
import UserFavorites from "./components/UserFavorites.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<UserSettings />} />
            <Route path="favorites" element={<UserFavorites />} />
          </Route>
          <Route path="/auth/callback" element={<OAuthCallback />} />
        </Route>
      </Routes>
    </UserAuthProvider>
  </BrowserRouter>
);
