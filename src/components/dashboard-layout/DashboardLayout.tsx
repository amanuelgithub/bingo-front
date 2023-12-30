import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ISidebarItem } from "../../models/ISidebarItem";

const MIN_SCREEN_SIZE_TO_OPEN_SIDEBAR = 768;

function DashboardLayout({ sidebarItems }: { sidebarItems: ISidebarItem[] }) {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [openSidebar, setOpenSidebar] = useState(
    screenSize > MIN_SCREEN_SIZE_TO_OPEN_SIDEBAR ? true : false
  );

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  const handleSidebarMenuOpenState = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-row justify-end">
        {/* left -- sidebar */}
        <div
          className={`absolute left-0 top-0 z-10 bg-yellow-500 shadow-2xl drop-shadow-lg 
         ${
           screenSize > MIN_SCREEN_SIZE_TO_OPEN_SIDEBAR
             ? "w-[25vw]"
             : "w-[75vw]"
         } 
          ${
            openSidebar
              ? "translate-x-0 transform duration-300 ease-in-out"
              : "-translate-x-full duration-300 ease-in-out"
          }`}
        >
          <Sidebar
            sidebarItems={sidebarItems}
            screenSize={screenSize}
            closeSidebarMenu={handleSidebarMenuOpenState}
          />
        </div>

        {/* right -- navbar & content */}
        <div
          className={
            openSidebar && screenSize > MIN_SCREEN_SIZE_TO_OPEN_SIDEBAR
              ? "w-[75vw]"
              : "w-[100vw]"
          }
        >
          <Navbar handleOpenSidebar={handleSidebarMenuOpenState} />

          <div className="h-full w-full bg-gray-100">
            {/* content */}
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
