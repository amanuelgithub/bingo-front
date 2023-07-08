import React, { useEffect } from "react";
import Ball from "./Ball";
import Cell from "./Cell";

interface Props {
  calledPlayingNumber?: number;
  ballNumber: number;
  color: string; // is just an svg images location
  isInCalled: boolean; // checks if it is in called array
}

function PanelCell({
  ballNumber,
  isInCalled,
  color,
  calledPlayingNumber,
}: Props) {
  return (
    <>
      {calledPlayingNumber !== undefined && (
        // animated ball
        <Ball
          called={calledPlayingNumber === ballNumber ? true : false}
          color={color}
          isInCalled={isInCalled}
        >
          {ballNumber}
        </Ball>
      )}

      {/* cell */}
      <Cell
        called={(calledPlayingNumber ?? 0) !== ballNumber ? true : false}
        isInCalled={isInCalled}
        ballNumber={ballNumber}
      />
    </>
  );
}

export default PanelCell;
