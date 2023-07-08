import { FaGamepad } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import {
  AiFillSound,
  AiOutlineCreditCard,
  AiOutlinePlayCircle,
} from "react-icons/ai";

export const agentSidebarItems = [
  {
    text: "Cards",
    icon: <AiOutlineCreditCard />,
    to: "/cashier-dashboard/cards",
  },
  {
    text: "Game Play",
    icon: <AiOutlinePlayCircle />,
    to: "/cashier-dashboard/sell-card",
  },
  {
    text: "Create Game",
    icon: <FaGamepad />,
    to: "/cashier-dashboard/create-game",
  },
  {
    text: "Cash Book",
    icon: <GiCash />,
    to: "/cashier-dashboard/cash-book",
  },
  {
    text: "Sound",
    icon: <AiFillSound />,
    to: "/cashier-dashboard/sound-setting",
  },
];
