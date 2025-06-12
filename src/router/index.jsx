import React from "react";
import Login from "../page/login";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import LoginEmployee from "../page/LoginEmployee";
import AccessCode from "../page/AccessCode";
import AccessCodeEmployee from "../page/AccessCodeEmployee";
import DashBoard from "../page/Dashboard";
import ManageEmployee from "../page/ManageEmployee";
import ManagerTask from "../page/ManagerTask";
import Message from "../page/Message";
import EditProfile from "../page/EditProfile";
import ActiveAccount from "../page/ActiveAccount";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // const navigate = useNavigate();
  const role = localStorage.getItem("role");

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

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
      path: "/activeAccount",
      element: <ActiveAccount />,
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
        {
          path: "/dashboard/profile",
          element: <EditProfile />,
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
