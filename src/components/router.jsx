import React from "react";
import Login from "./login/login";
import Register from "./login/register";
import Feed from "./dashboard/feed";
import People from "./../components/dashboard/people";

const routes = {
    "/login": () => <Login />,
    "/register": () => <Register />,
    "/feed": () => <Feed />,
    "/people": () => <People />
  };
export default routes;