import { CgOrganisation } from "react-icons/cg";
import { FaBookReader } from "react-icons/fa";
import DataTable from "./components/DataTable";
import About from "./pages/About";
import Home from "./pages/Home";
const routes = [
  {
    name: "Employee",
    path: "/",
    component: <Home />,
    icon: <CgOrganisation className="w-5 h-5 " />,
  },
  {
    name: "About us",
    path: "/about-us",
    component: <About />,
    icon: <FaBookReader className="w-5 h-5 " />,
  },
];

export { routes };
