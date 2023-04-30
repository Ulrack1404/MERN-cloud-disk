import React from "react";
import { Navigate } from "react-router-dom";
import Disk from "./components/disk/disk";
import Registration from "./components/authorization/registration";
import Login from "./components/authorization/login";
import Profile from "./components/profile/profile";

const routes = (isAuth) => [
    {
        path: "/",
        element: isAuth ? <Disk /> : <Login />
    },
    {
        path: "/registration",
        element: <Registration />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/profile",
        element: isAuth && <Profile />
    },
    {
        path: "*",
        element: <Navigate to={isAuth ? "/" : "/login"} />
    }
];

export default routes;
