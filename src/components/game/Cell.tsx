import React from "react";

interface Props {
  index?: number;
  called: boolean;
  ballNumber: number;
  isInCalled: boolean; // checks if it is in called array
}

function Cell({ called, isInCalled, ballNumber, index }: Props) {
  return (
    <div
      className={`${
        !called || isInCalled ? "hidden" : "block"
      } relative h-[70%] w-[6%]`}
    >
      <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-purple-700 bg-opacity-50 text-white">
        <span className="font-semibold" style={{ fontSize: "1.75vw" }}>
          {ballNumber}
        </span>
      </div>
    </div>
  );
}

export default Cell;
