import { BsCardText } from "react-icons/bs";
import { MdSell } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";

export const agentSidebarItems = [
  {
    text: "Cards",
    icon: <BsCardText />,
    to: "/cashier-dashboard/cards",
  },
  {
    text: "Sell Cards",
    icon: <MdSell />,
    to: "/cashier-dashboard/sell-card",
  },
  {
    text: "Create Game",
    icon: <FaGamepad />,
    to: "/cashier-dashboard/create-game",
  },
];
