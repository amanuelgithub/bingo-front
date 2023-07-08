import React from "react";
import { AiFillSound } from "react-icons/ai";
import { BiArrowToRight } from "react-icons/bi";
import { MdOutlineVideogameAssetOff } from "react-icons/md";
import { Link } from "react-router-dom";

function GameNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-start py-10 sm:py-20">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-center sm:gap-8 md:min-w-[550px] md:p-16 md:text-xl">
        <div className="flex h-full flex-col items-center justify-center gap-2 text-2xl sm:text-4xl">
          <h1>No Game Found</h1>
          <MdOutlineVideogameAssetOff className="text-6xl" />

          <div className="flex flex-row items-center justify-between gap-1 text-sm text-blue-700">
            <Link
              to={"/cashier-dashboard/create-game"}
              className="hover:underline"
            >
              create game
            </Link>

            <BiArrowToRight className="text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameNotFound;
