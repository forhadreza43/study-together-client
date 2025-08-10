import { createBrowserRouter } from "react-router";
import MainLayout from "./../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import Assignments from "../pages/Assignments/Assignments";
import AssignmentDetails from "../pages/AssignmentDetails/AssignmentDetails";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import MySubmittedAssignments from "../pages/MySubmittedAssignments/MySubmittedAssignments";
import PendingAssignments from "../pages/PendingAssignments/PendingAssignments";
import ErrorPage from "../components/ErrorPage";
import FAQ from "../components/FAQ";
import Leaderboard from "../pages/LeaderBoard/Leaderboard";
import ReviewsPage from "../pages/ReviewsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/createAssignment",
        element: (
          <PrivateRoute>
            <CreateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments",
        element: <Assignments />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/leaderboard",
        element: (
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/reviews",
        element: <ReviewsPage />,
      },
      {
        path: "/review",
        element: <ReviewsPage />,
      },
      {
        path: "/assignment/:id",
        element: <AssignmentDetails />,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/mySubmittedAssignments",
        element: (
          <PrivateRoute>
            <MySubmittedAssignments />
          </PrivateRoute>
        ),
      },
      {
        path: "/pendingAssignments",
        element: (
          <PrivateRoute>
            <PendingAssignments />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
