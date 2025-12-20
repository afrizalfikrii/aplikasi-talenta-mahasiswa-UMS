import { useEffect, useRef } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const hasShownAlert = useRef(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      navigate("/auth/login");
      return;
    }

    // Check if user has admin role
    if (user && user.role !== "admin") {
      // Only show alert once
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        console.log("User is not admin:", user.role);
        alert("Access denied. Admin privileges required.");
      }
      navigate("/");
      return;
    }
  }, [isAuthenticated, user, navigate]);

  return {
    isAdmin: isAuthenticated && user?.role === "admin",
    user,
  };
};
