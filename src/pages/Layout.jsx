import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <section className="section-main">
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
