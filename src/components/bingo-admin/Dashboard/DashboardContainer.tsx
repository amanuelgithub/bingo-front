import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function DashboardContainer() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    console.log("open sidebar");
    setOpenSidebar(!openSidebar);
  };

  return (
    <div>
      {/* header */}
      <Navbar onOpenSidebar={handleOpenSidebar} />

      {/* sidebar & content */}
      <div className="relative h-screen md:flex md:items-start md:justify-start">
        {/* sidebar */}
        <div
          className={`${
            openSidebar ? "block" : "hidden"
          } absolute left-0 top-0 h-full w-72 bg-blue-600 md:relative md:block md:w-3/12`}
        >
          <Sidebar />
        </div>

        {/* content */}
        <div className="h-full w-full bg-gray-100 md:w-9/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;
