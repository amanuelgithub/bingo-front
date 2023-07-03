import { FaBuilding } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { BiDetail } from "react-icons/bi";
import { RiDashboardLine } from "react-icons/ri";

export const sidebarItems = [
  {
    text: "Dashboard",
    icon: <RiDashboardLine />,
    to: "/admin-dashboard",
  },
  {
    text: "Branches",
    icon: <FaBuilding />,
    to: "/admin-dashboard/branches",
  },

  {
    text: "Agents",
    icon: <GoOrganization />,
    to: "/admin-dashboard/agents",
  },
  {
    text: "Agent Detail",
    icon: <BiDetail />,
    to: "/admin-dashboard/agent-detail",
  },
];
