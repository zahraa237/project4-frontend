import { Outlet, NavLink, useNavigate } from "react-router";
import "./sidebarStyle.css";

const Layout = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="logo">welcome {user.username}</h2>
        <nav className="nav-links">
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/lists">My Lists</NavLink>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
        <div></div>
        <div></div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
