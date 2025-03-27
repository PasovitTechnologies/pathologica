import AppLayout from "./layout/AppLayout";
import Apply from "./pages/Apply";
import Delivery from "./pages/Delivery";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Experts from "./pages/Experts";
import OurServices from "./pages/OurServices";
import Services from "./pages/Services";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/experts",
          element: <Experts />,
        },
        {
          path: "/our-services",
          element: <OurServices />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/apply",
          element: <Apply />,
        },
        {
          path: "/delivery",
          element: <Delivery />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
