import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/AdminNavbar";

export const Admin = () => {
  return (
    <main className="main-content">
      <AdminNavbar />
      <Outlet />
    </main>
  );
};
