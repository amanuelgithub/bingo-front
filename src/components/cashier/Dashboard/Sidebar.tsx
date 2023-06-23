import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { agentSidebarItems } from "./cashier-sidebar-items";

interface ListItemProps {
  children: any;
  to: string;
  icon: any;
  active: boolean;
  index: any;
  handleActiveItemIndex: any;
}

function ListItem({
  children,
  to,
  icon,
  active,
  index,
  handleActiveItemIndex,
}: ListItemProps) {
  const location = useLocation();

  if (to === location.pathname) {
    handleActiveItemIndex(index);
  }

  return (
    <Link
      to={to}
      className="w-full"
      onClick={() => handleActiveItemIndex(index)}
    >
      <li
        className={`flex list-none items-center justify-start gap-4 px-4 py-2 hover:bg-blue-700 hover:text-white ${
          active ? "bg-blue-700" : "bg-blue-500"
        }`}
      >
        <span>{icon}</span>
        <p>{children}</p>
      </li>
    </Link>
  );
}

export default function Sidebar() {
  const [activeItemIndex, setActiveItemIndex] = useState();

  const handleActiveItemIndex = (index: any) => {
    setActiveItemIndex(index);
  };

  return (
    <div className="w-full pt-5 text-white">
      {agentSidebarItems.map((item, index) => (
        <ListItem
          key={index}
          children={item.text}
          icon={item.icon}
          to={item.to}
          index={index}
          active={activeItemIndex === index}
          handleActiveItemIndex={handleActiveItemIndex}
        />
      ))}
    </div>
  );
}
