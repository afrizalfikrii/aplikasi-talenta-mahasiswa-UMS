import { createBrowserRouter } from "react-router-dom"

import AppLayout from "@/components/layout/AppLayout"
import ProtectedRoute from "@/features/auth/routes/ProtectedRoute"

// Pages
import HomePage from "@/pages/HomePage"
import LoginPage from "@/features/auth/pages/LoginPage"
import RegisterPage from "@/features/auth/pages/RegisterPage"
import NotFoundPage from "@/pages/NotFoundPage"
import ForbiddenPage from "@/pages/ForbiddenPage"

// Talent
import TalentaPage from "@/features/talents/pages/TalentaPage"
import TalentDetailPage from "@/features/talents/pages/TalentaDetailPage"

// admin
import AdminDashboard from "@/features/admin/pages/AdminDashboard"

// user
import UserDashboard from "@/features/dashboard-user/UserDashboard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Navbar + Footer
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "talenta",
        element: <TalentaPage />, // PUBLIC
      },
      {
        path: "talenta/:username",
        element: <TalentDetailPage />,
      },
      // 🔒 PROTECTED ADMIN ROUTES
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "admin/dashboard",
            element: <AdminDashboard />,
          },
        ],
      },
      // 🔒 PROTECTED STUDENT ROUTES
      {
        element: <ProtectedRoute role="student" />,
        children: [
          {
            path: "user/dashboard",
            element: <UserDashboard />,
          },
        ],
      },
    ],
  },

  // AUTH
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },

  // FORBIDDEN
  {
    path: "/403",
    element: <ForbiddenPage />,
  },

  // FALLBACK
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
