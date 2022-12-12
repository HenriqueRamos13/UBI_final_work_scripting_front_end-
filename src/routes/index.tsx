import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import CoursePage from "../pages/Course";
import Courses from "../pages/User/Courses";
import Login from "../pages/Login";
import MyCourses from "../pages/User/MyCourses";
import Register from "../pages/Register";
import UserPage from "../pages/User";
import { Role } from "../utils/RoleAndRoute";
import { PrivateRoute } from "./PrivateRoute";
import TeacherPage from "../pages/Teacher";
import CreateCourse from "../pages/Teacher/Create";
import CoursesCreated from "../pages/Teacher/CoursesCreated";

export const RouteList = () => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

    {/* PRIVATES */}

    <Route
      path="/courses"
      element={
        <PrivateRoute roles={[Role.USER]}>
          <>
            <NavBar />
            <Courses />
          </>
        </PrivateRoute>
      }
    />

    <Route
      path="/my-courses"
      element={
        <PrivateRoute roles={[Role.USER]}>
          <>
            <NavBar />
            <MyCourses />
          </>
        </PrivateRoute>
      }
    />

    <Route
      path="/course/:id"
      element={
        <PrivateRoute roles={[Role.USER, Role.TEACHER]}>
          <>
            <NavBar />
            <CoursePage />
          </>
        </PrivateRoute>
      }
    />

    <Route
      path="/user"
      element={
        <PrivateRoute roles={[Role.USER]}>
          <>
            <NavBar />
            <UserPage />
          </>
        </PrivateRoute>
      }
    />

    <Route
      path="/teacher"
      element={
        <PrivateRoute roles={[Role.TEACHER]}>
          <>
            <NavBar />
            <TeacherPage />
          </>
        </PrivateRoute>
      }
    />

    <Route
      path="/create-course"
      element={
        <PrivateRoute roles={[Role.TEACHER]}>
          <>
            <NavBar />
            <CreateCourse />
          </>
        </PrivateRoute>
      }
    />

    <Route
      path="/courses-created"
      element={
        <PrivateRoute roles={[Role.TEACHER]}>
          <>
            <NavBar />
            <CoursesCreated />
          </>
        </PrivateRoute>
      }
    />

    {/* <Route
      path="/admin"
      element={
        <PrivateRoute roles={[Role.ADMIN]}>
          <Metrics />
        </PrivateRoute>
      }
    /> */}

    <Route path="*" element={<h1>404</h1>} />
  </Routes>
);
