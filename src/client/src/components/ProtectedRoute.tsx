import { Navigate } from "react-router";

import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { enabled, user, isLoading } = useAuth();

  if (isLoading) return null;

  if (enabled && !user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
