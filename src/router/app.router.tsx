import { Navigate, createBrowserRouter } from "react-router"

import type { RouteObject } from "react-router"
import { lazy } from "react"

const AuthenticatedRoute = lazy(() => import("./routes/AuthenticatedRoute").then(module => ({ default: module.AuthenticatedRoute })))
const NotAuthenticatedRoute = lazy(() => import("./routes/NotAuthenticatedRoute").then(module => ({ default: module.NotAuthenticatedRoute })))

const AppLayout = lazy(() => import("@/app/layouts/AppLayout").then(module => ({ default: module.AppLayout })))
const HomePage = lazy(() => import("@/app/pages/home/HomePage").then(module => ({ default: module.HomePage })))
const ReportsPage = lazy(() => import("@/app/pages/reports/ReportsPage").then(module => ({ default: module.ReportsPage })))
const SettingsPage = lazy(() => import("@/app/pages/settings/SettingsPage").then(module => ({ default: module.SettingsPage })))

const AuthLayout = lazy(() => import("@/auth/layouts/AuthLayout").then(module => ({ default: module.AuthLayout })))
const LoginPage = lazy(() => import("@/auth/pages/LoginPage").then(module => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import("@/auth/pages/RegisterPage").then(module => ({ default: module.RegisterPage })))

const mainRoutes: RouteObject = {
  path: "/",
  element: <AuthenticatedRoute children={<AppLayout />} />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "reports",
      element: <ReportsPage />,
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
  ],
}

const authRoutes: RouteObject = {
  path: "/auth",
  element: <NotAuthenticatedRoute children={<AuthLayout />} />,
  children: [
    {
      index: true,
      element: <Navigate to='/auth/login' />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
}

const notFoundRoute: RouteObject = {
  path: "*",
  element: <Navigate to='/' />,
}

export const appRouter = createBrowserRouter([mainRoutes, authRoutes, notFoundRoute])
