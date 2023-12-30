import { useState } from "react";
import { Link } from "react-router-dom";
// import { Button } from "../../ui/button";
import { FaAngleLeft } from "react-icons/fa";
import { Button } from "../ui/button";
import { ISidebarItem } from "../../models/ISidebarItem";

interface ListItemProps {
  children: any;
  to: string;
  icon: any;
  active: boolean;
  index: any;
  onActiveItemIndex: any;
}

function ListItem({
  children,
  to,
  icon,
  active,
  index,
  onActiveItemIndex,
}: ListItemProps) {
  return (
    <Link to={to} className="w-full" onClick={() => onActiveItemIndex(index)}>
      <li
        className={`flex list-none items-center justify-start gap-4 px-4 py-2 hover:bg-yellow-400 hover:text-white ${
          active ? "bg-yellow-400 drop-shadow-sm" : "bg-yellow-500"
        }`}
      >
        <span>{icon}</span>
        <p>{children}</p>
      </li>
    </Link>
  );
}

interface SidebarProps {
  sidebarItems?: ISidebarItem[];
  screenSize: number;
  closeSidebarMenu: () => void;
}
export default function Sidebar({
  sidebarItems,
  screenSize,
  closeSidebarMenu,
}: SidebarProps) {
  const [activeItemIndex, setActiveItemIndex] = useState();

  const handleActiveItemIndex = (index: any) => {
    setActiveItemIndex(index);
  };

  return (
    <div className="w-full bg-yellow-700 text-gray-100">
      <div className="relative flex w-full flex-col items-center justify-center pb-6 pt-3">
        <img
          src="/images/bingo-logo.png"
          alt="bingo-logo"
          className="block w-2/6 rounded-full"
        />

        {screenSize < 768 && (
          <Button
            variant={"outline"}
            onClick={closeSidebarMenu}
            className="text-gray-1 absolute right-0 top-0 m-2 rounded-full bg-yellow-700 px-3 hover:bg-yellow-600"
          >
            <FaAngleLeft />
          </Button>
        )}
      </div>

      <div className="min-h-screen rounded-t-lg bg-yellow-500 py-4">
        {sidebarItems?.map((item, index) => (
          <ListItem
            key={index}
            children={item.text}
            icon={item.icon}
            to={item.to}
            index={index}
            active={activeItemIndex === index}
            onActiveItemIndex={handleActiveItemIndex}
          />
        ))}
      </div>
    </div>
  );
}
