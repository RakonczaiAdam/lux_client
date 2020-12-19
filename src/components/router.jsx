import React from "react";
import Login from "./login/login";
import Register from "./login/register";
import Feed from "./dashboard/feedscroll";
import Profile from "./dashboard/profile";
import People from "./dashboard/people";
import Settings from "./dashboard/settings";
import Notifications from "./dashboard/notifications";

const routes = {
    "/login": () => <Login />,
    "/register": () => <Register />,
    "/feed": () => <Feed />,
    "/profile": () => <Profile />,
    "/people": () => <People />,
    "/settings": () => <Settings />,
    "/notifications": () => <Notifications />
  };
export default routes;