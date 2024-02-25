import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import {loginLoader} from "./pages/LoginPage";
import Error from "./pages/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import MasterLayout from "./pages/MasterLayout";
import ProfilePage from "./pages/ProfilePage";
import {profileLoader } from "./pages/ProfilePage";
import AdminPage from "./pages/Admin/AdminPage";
import {adminLoader} from "./pages/Admin/AdminPage";
import TeacherPage from "./pages/Teacher/TeacherPage";
import {teacherLoader} from "./pages/Teacher/TeacherPage";
import HodPage from "./pages/Hod/HodPage";
import {hodLoader} from "./pages/Hod/HodPage";
import StudentPage from "./pages/Student/StudentPage";
import {studentLoader} from "./pages/Student/StudentPage";
import Principal from "./pages/principal/Principal";
import {principalLoader} from "./pages/principal/Principal";
// import UserContextProvider from "./store/UserContextProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignupPage />,
      errorElement: <Error />,
    },

    {
      path: "/login",
      loader:loginLoader,
      element: <LoginPage />,
    },
    {
      path: "/master",
      element: <MasterLayout />,
    },
    {
      path: "/profile",
      loader:profileLoader,
      element: <ProfilePage />,
    },
    {
      path: "/admin",
      loader:adminLoader,
      element: <AdminPage />,
    },
    {
      path: "/teacher",
      loader:teacherLoader,
      element: <TeacherPage />,
    },
    {
      path: "/hod",
      loader:hodLoader,
      element: <HodPage />,
    },
    {
      path: "/student",
      loader:studentLoader,
      element: <StudentPage />,
    },
    {
      path: "/principal",
      loader:principalLoader,
      element: <Principal />,
    },
  ]);
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
