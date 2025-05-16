import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/AdminNavbar";

export const AdminLayout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <AdminNavbar />
      <main className="overflow-auto p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};
