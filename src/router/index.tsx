import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import Cart from "../pages/Cart/Cart";
import Categories from "../pages/Categories/Categories";
import ProductDescription from "../pages/ProductDescription/ProductDescription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Categories />,
      },
      {
        path: "/product/:productID",
        element: <ProductDescription />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
