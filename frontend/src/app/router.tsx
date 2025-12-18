import { createBrowserRouter } from "react-router-dom"

import AppLayout from "@/components/layout/AppLayout"
import ProtectedRoute from "@/features/auth/routes/ProtectedRoute"

// Pages
import HomePage from "@/pages/HomePage"
import LoginPage from "@/features/auth/pages/LoginPage"
import RegisterPage from "@/features/auth/pages/RegisterPage"
import NotFoundPage from "@/pages/NotFoundPage"

// Talent
import TalentaPage from "@/features/talents/pages/TalentaPage"
import TalentDetailPage from "@/features/talents/pages/TalentaDetailPage"

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

      // 🔒 PROTECTED TALENT DETAIL
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "talenta/:username",
            element: <TalentDetailPage />,
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

  // FALLBACK
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
