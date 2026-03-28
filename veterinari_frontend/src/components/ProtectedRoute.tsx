import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken } from "@/lib/api";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/accedi/" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
