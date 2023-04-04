import Home from "@/pages/home";
import Login from "@/pages/login";

export const ROUTE_CONFIG = [
  {
    key: "home",
    path: "/",
    element: Home,
    title: "首页"
  },
  {
    key: "login",
    path: "/login",
    element: Login,
    title: "登录"
  }
];
