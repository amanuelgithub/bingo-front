import React from "react";
import Button from "./form/Button";

function SelectGame() {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <h1 className="mb-4 text-4xl font-bold">Select Game</h1>

        <div className="flex w-2/3 items-center justify-between gap-8 bg-white px-8 py-4 shadow-md sm:w-[550px]">
          <h3 className="text-xl font-bold">Keno</h3>

          <Button>Open</Button>
        </div>

        <div className="flex w-2/3 items-center justify-between gap-8 bg-white px-8 py-4 shadow-md sm:w-[550px]">
          <h3 className="text-xl font-bold">Bingo</h3>

          <Button>Open</Button>
        </div>
      </div>
    </div>
  );
}

export default SelectGame;
