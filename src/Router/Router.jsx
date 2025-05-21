import { createBrowserRouter } from "react-router";

import Error from "../Error/Error";
import MainLaout from "../MainLawout/MainLawout";
import Login from "../Form/Login";
import Regester from "../Form/Regester";
import AddTask from "../Tasks/AddTask";
import Taske from "../Tasks/Taske";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLaout,
    children: [
      // {
      //   path:'/add-task',
      //   Component: AddTask
      // },
      {
        Component: Taske,
        path: '/main-tasks',
        loader: () => fetch('http://localhost:3000/working')
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
  },



  {
    path: '/*',
    element: <Error></Error>
  },
  {
    path: '/add-task',
    Component: AddTask
  },
]);