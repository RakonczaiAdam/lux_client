import React from "react";
import Login from "./login/login";
import Register from "./login/register";

const routes = {
    "/login": () => <Login />,
    "/register": () => <Register /> 
  };

export default routes;