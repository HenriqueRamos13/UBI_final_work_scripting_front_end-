import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import { Role } from "../utils/RoleAndRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const RouteList = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />

    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />

    <Route path="/register" element={<Register />} />

    {/* PRIVATES */}

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
