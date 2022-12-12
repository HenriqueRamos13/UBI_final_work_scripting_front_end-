import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";

import Login from "../pages/Login";
import Register from "../pages/Register";
import UserPage from "../pages/User";
import { Role } from "../utils/RoleAndRoute";
import { PrivateRoute } from "./PrivateRoute";

export const RouteList = () => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

    {/* PRIVATES */}

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
