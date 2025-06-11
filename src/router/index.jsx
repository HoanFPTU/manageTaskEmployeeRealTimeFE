import React from "react";
import Login from "../page/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginEmployee from "../page/LoginEmployee";
import AccessCode from "../page/AccessCode";
import AccessCodeEmployee from "../page/AccessCodeEmployee";
import DashBoard from "../page/Dashboard";
import ManageEmployee from "../page/ManageEmployee";
import ManagerTask from "../page/ManagerTask";
import Message from "../page/Message";
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
    {
      path: "/dashboard",
      element: <DashBoard />,
      // // { value: 0, label: 'Administrator' },
      // { value: 1, label: 'Manager' },
      // { value: 2, label: 'Affiliates' },
      // { value: 3, label: 'Customers' },
      // { value: 4, label: 'Sales Staff' },
      // { value: 5, label: 'Shipper Staff' }
      children: [
        {
          path: "/dashboard/manageEmployee",
          element: <ManageEmployee />,
          // index: true
        },
        {
          path: "/dashboard/manageTask",
          element: <ManagerTask />,
          // index: true
        },
        {
          path: "/dashboard/message",
          element: <Message />,
          // index: true
        },
      ],
      //   <Route
      //     path="/dashboard/account"
      //     element={
      //       <ProtectedRoute roles={["0", "1"]}>
      //         <ManageUser />
      //       </ProtectedRoute>
      //     }
      //   />,

      //   <Route path="/dashboard/campaign" element={<Campaign />} />,
      //   <Route path="/dashboard/post" element={<Post />} />,
      //   <Route
      //     path="/dashboard/jobapplication"
      //     element={<JobApplication />}
      //   />,
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
