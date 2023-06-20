import { FaCashRegister } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";

export const agentSidebarItems = [
  {
    text: "Cashiers",
    icon: <FaCashRegister />,
    to: "/agent-dashboard/cashiers",
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
