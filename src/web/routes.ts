import Home from "./pages/home/index.tsx";
import About from "./pages/about/index.tsx";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/about",
    exact: true,
    component: About,
  },
  {
    path: "/about/:a/:b",
    exact: true,
    component: About,
  },
];

export default routes;