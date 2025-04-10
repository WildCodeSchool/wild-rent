import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/AdminNavbar";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminNavbar />
      <main className="flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
};
