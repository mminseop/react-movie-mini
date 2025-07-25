import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout() {
  return (
    <>
      <NavBar />
      <section className="section-main">
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
