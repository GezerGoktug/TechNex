import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import Detail from "../pages/Detail";
import Favourites from "../pages/Favourites";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";

export const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      { path: "detail/:productID", element: <Detail /> },
      { path: "favourites", element: <Favourites /> },
      { path: "auth", element: <Auth /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
