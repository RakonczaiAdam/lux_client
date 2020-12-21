import React from "react";
import Login from "./login/login";
import Register from "./login/register";
import Feed from "./dashboard/feedscroll";

const routes = {
    "/login": () => <Login />,
    "/register": () => <Register />,
    "/feed": () => <Feed />,
  };
export default routes;