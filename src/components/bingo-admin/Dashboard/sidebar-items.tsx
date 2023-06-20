import { FaBuilding, FaCashRegister } from "react-icons/fa";
// import { IoAdd } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";

export const sidebarItems = [
  {
    text: "Branches",
    icon: <FaBuilding />,
    to: "/admin-dashboard/branches",
  },
  // {
  //   text: "Create Branch",
  //   icon: <IoAdd />,
  //   to: "/admin-dashboard/create-branch",
  // },
  {
    text: "Agents",
    icon: <GoOrganization />,
    to: "/admin-dashboard/agents",
  },
  // {
  //   text: "Create Agent",
  //   icon: <IoAdd />,
  //   to: "/admin-dashboard/create-agent",
  // },
];
