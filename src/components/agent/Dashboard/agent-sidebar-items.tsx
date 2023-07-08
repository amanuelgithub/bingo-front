import { BsCardText, BsFillPersonLinesFill } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";
import { RiDashboardLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";

export const agentSidebarItems = [
  {
    text: "Dashboard",
    icon: <RiDashboardLine />,
    to: "/agent-dashboard",
  },
  {
    text: "Cashiers",
    icon: <IoPeopleOutline />,
    to: "/agent-dashboard/cashiers",
  },
  {
    text: "Cashier Detail",
    icon: <BsFillPersonLinesFill />,
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
