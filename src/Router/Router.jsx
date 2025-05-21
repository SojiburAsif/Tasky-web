import { createBrowserRouter } from "react-router";

import Error from "../Error/Error";
import MainLaout from "../MainLawout/MainLawout";
import Login from "../Form/Login";
import Regester from "../Form/Regester";
import AddTask from "../Tasks/AddTask";

import TaskCard from "../Tasks/Taske";
import Deatils from "../Tasks/Deatils";
import UpdateUser from "../Tasks/UpdateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLaout,
    // loader: () => fetch('http://localhost:3000/working'),
    children: [
      // {
      //   path:'/add-task',
      //   Component: AddTask
      // },
      {
        Component: TaskCard,
        path: '/main-tasks',
        // loader: () => fetch('http://localhost:3000/working')
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
    Component: AddTask,

  },
  {
    Component: Deatils,
    path: 'view-deatils/:id'
  },
  {
    Component: UpdateUser,
    path: 'update/:id'
  }
]);