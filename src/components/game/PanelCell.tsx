import React from "react";
import Ball from "./Ball";
import Cell from "./Cell";

interface Props {
  index?: number;
  ballNumber: number;
  color: string; // is just an svg images location
}

function PanelCell({ ballNumber, color, index }: Props) {
  return (
    <>
      {index !== undefined && (
        // animated ball
        <Ball called={index === 9 ? true : false} color={color}>
          {ballNumber}
        </Ball>
      )}

      {/* cell */}
      <Cell ballNumber={ballNumber} />
    </>
  );
}

export default PanelCell;
