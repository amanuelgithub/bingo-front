import { FaCashRegister } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";
import { RiDashboardLine } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";

export const agentSidebarItems = [
  {
    text: "Dashboard",
    icon: <RiDashboardLine />,
    to: "/agent-dashboard",
  },
  {
    text: "Cashiers",
    icon: <FaCashRegister />,
    to: "/agent-dashboard/cashiers",
  },
  {
    text: "Cashier Detail",
    icon: <BiDetail />,
    to: "/agent-dashboard/cashier-detail",
  },
  {
    text: "Cards",
    icon: <BsCardText />,
    to: "/agent-dashboard/cards",
  },
  {
    text: "Register Card",
    icon: <GiArchiveRegister />,
    to: "/agent-dashboard/register-card",
  },
];
