import { createBrowserRouter } from "react-router";

import Error from "../Error/Error";
import MainLayout from "../MainLawout/MainLawout"; 
import Login from "../Form/Login";
import Register from "../Form/Regester"; 
import AddTask from "../Tasks/AddTask";

import TaskCard from "../Tasks/Taske";   
import Details from "../Tasks/Deatils";  
import UpdateUser from "../Tasks/UpdateUser";
import MyTasks from "../Tasks/MyTasks";
import SectionPage from "../Home/SectionPage";
import PrivateRouter from "../Contexts/PrivateRouter";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,

  
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/main-tasks",
    Component: SectionPage,

  },
  {
    path: "/add-task",
    element: <PrivateRouter>
      <AddTask></AddTask>
    </PrivateRouter>,
  },
  {
    path: "/view-deatils/:id",
    element: <PrivateRouter>
      <Details></Details>
    </PrivateRouter>,
    loader: ({ params }) =>
      fetch(`https://backend-zeta-ochre-92.vercel.app/working/${params.id}`),
  },
  {
    path: "/update/:id",
    element: <PrivateRouter>
      <UpdateUser></UpdateUser>
    </PrivateRouter>,
    loader: ({ params }) =>
      fetch(`https://backend-zeta-ochre-92.vercel.app/working/${params.id}`),
  },
  {
    path: "/my-tasks",
    element: <PrivateRouter>
      <MyTasks></MyTasks>
    </PrivateRouter>,
     loader: () =>
      fetch(`https://backend-zeta-ochre-92.vercel.app/working`),
  },
  {
    path: "*",
    element: <Error />,
  },
  
]);
