import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import Detail from "../pages/Detail";
import Favourites from "../pages/Favourites";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../pages/layouts/AuthLayout";
import MainLayout from "../pages/layouts/MainLayout";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      { path: "products", element: <Products /> },
      { path: "detail/:productID", element: <Detail /> },
      {
        path: "favourites",
        element: (
          <PrivateRoute>
            <Favourites />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Auth /> }],
  },
]);
