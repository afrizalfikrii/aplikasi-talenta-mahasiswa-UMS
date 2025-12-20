import { useEffect, useRef } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = () => {
  // BYPASS FOR UI TESTING
  return {
    isAdmin: true,
    user: {
      id: 1,
      username: "admin_test",
      email: "admin@test.com",
      role: "admin",
    },
  };
};
