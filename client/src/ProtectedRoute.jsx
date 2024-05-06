import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./components/Spinner";

export default function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth();

    if (loading) return <Spinner />
    if (!loading && !isAuthenticated) {
        return <Navigate to='/login' replace />
    }

  return (
    <Outlet />
)
}
