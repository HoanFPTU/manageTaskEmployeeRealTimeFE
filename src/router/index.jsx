import React from "react";
import Login from "../page/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginEmployee from "../page/LoginEmployee";
import AccessCode from "../page/AccessCode";
import AccessCodeEmployee from "../page/AccessCodeEmployee";
export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/loginEmployee",
      element: <LoginEmployee />,
    },
    {
      path: "/accessCode",
      element: <AccessCode />,
    },
    {
      path: "/accessCodeEmployee",
      element: <AccessCodeEmployee />,
    },
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    //   children: [
    //     {
    //       path: "/dashboard/category",
    //       element: <Category />,
    //     },
    //     {
    //       path: "/dashboard/withdrawal",
    //       element: <WithDrawal />,
    //     },
    //     {
    //       path: "/dashboard/acount",
    //       element: <Acount />,
    //     },
    //     {
    //       path: "/dashboard/request",
    //       element: <ManageRequest />,
    //     },
    //     {
    //       path: "/dashboard/session",
    //       element: <ManageSession />,
    //     },
    //     {
    //       path: "/dashboard/overviewStatistics",
    //       element: <OverviewStatistics />,
    //     },
    //     {
    //       path: "/dashboard/sessionStatistics",
    //       element: <SessionStatistics />,
    //     },
    //   ],
    // },
  ]);
  return <RouterProvider router={router} />;
}
