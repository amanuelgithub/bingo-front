import React, { useEffect } from "react";
import Ball from "./Ball";
import Cell from "./Cell";

interface Props {
  index?: number;
  ballNumber: number;
  color: string; // is just an svg images location
  isInCalled: boolean; // checks if it is in called array
}

function PanelCell({ ballNumber, isInCalled, color, index }: Props) {
  return (
    <>
      {index !== undefined && (
        // animated ball
        <Ball
          called={index === ballNumber ? true : false}
          color={color}
          isInCalled={isInCalled}
        >
          {ballNumber}
        </Ball>
      )}

      {/* cell */}
      <Cell
        called={(index ?? 0) !== ballNumber ? true : false}
        isInCalled={isInCalled}
        ballNumber={ballNumber}
      />
    </>
  );
}

export default PanelCell;
