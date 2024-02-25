import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import MasterLayout from "./pages/MasterLayout";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/Admin/AdminPage";
import TeacherPage from "./pages/Teacher/TeacherPage";
import HodPage from "./pages/Hod/HodPage";
import StudentPage from "./pages/Student/StudentPage";
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
      element: <LoginPage />,
    },
    {
      path: "/master",
      element: <MasterLayout />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "/teacher",
      element: <TeacherPage />,
    },
    {
      path: "/hod",
      element: <HodPage />,
    },
    {
      path: "/student",
      element: <StudentPage />,
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
