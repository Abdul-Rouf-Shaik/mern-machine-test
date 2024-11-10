import { BiHomeAlt2 } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const loggedInUser = JSON.parse(localStorage.getItem("user"));

export const routes = [
  {
    title: "Home",
    href: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "Employee List",
    href: "/employees",
    Icon: FaList,
  },
  {
    title: `${loggedInUser?.userName}`,
    href: "#",
    Icon: FaRegUser,
  },
];
