import { Navigate } from "react-router";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user || role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute