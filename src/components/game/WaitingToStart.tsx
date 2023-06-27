import React from "react";
import GameBackground from "./GameBackground";
import ReactLoading from "react-loading";

function WaitingToStart() {
  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden overflow-y-hidden">
      <GameBackground />

      <div className="flex h-full w-full flex-col items-center justify-center bg-purple-900 bg-opacity-70">
        <h1
          className="rounded-xl  text-center font-extrabold text-white"
          style={{ fontSize: "5vw" }}
        >
          Waiting Game To Start
        </h1>

        <ReactLoading type={"balls"} color={"yellow"} height={64} width={64} />
      </div>
    </div>
  );
}

export default WaitingToStart;
