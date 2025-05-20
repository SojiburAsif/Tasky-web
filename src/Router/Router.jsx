import { createBrowserRouter } from "react-router";

import Error from "../Error/Error";
import MainLaout from "../MainLawout/MainLawout";
import Login from "../Form/Login";
import Regester from "../Form/Regester";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLaout,
    children: [
      {

      }
    ]
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/register',
    Component: Regester
  }

  ,
  {
    path: '/*',
    element: <Error></Error>
  }
]);