import { Outlet, Navigate } from "react-router-dom";
import { useWhoamiQuery } from "../generated/graphql-types";

const ProtectedRoutes = () => {
  const { data, loading, error } = useWhoamiQuery();

  if (loading) return <div>Chargement...</div>;
  if (error) return <Navigate to="/login" />;

  if (!data?.whoami) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoutes;
