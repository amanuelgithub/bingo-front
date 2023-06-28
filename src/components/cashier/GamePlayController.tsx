import React, { useState } from "react";
import { BsPauseCircle, BsPlayCircle, BsStopCircle } from "react-icons/bs";

export enum GameStateEnum {
  CREATED = "CREATED",
  PAUSED = "PAUSED",
  PLAYING = "PLAYING",
  END = "END",
}

function GamePlayController() {
  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.CREATED
  );

  const handlePlayClick = () => {
    setGameState(GameStateEnum.PLAYING);
  };

  const handlePauseClick = () => {
    setGameState(GameStateEnum.PAUSED);
  };

  const handleEndClick = () => {
    setGameState(GameStateEnum.END);
  };

  return (
    <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
      {/* play */}
      <button
        onClick={handlePlayClick}
        className={`text-4xl ${
          gameState === GameStateEnum.PLAYING
            ? "hidden"
            : "block text-green-500"
        }`}
      >
        <BsPlayCircle />
      </button>

      {/* pause */}
      <button
        onClick={handlePauseClick}
        className={`text-4xl ${
          gameState !== GameStateEnum.PLAYING
            ? "hidden"
            : "block text-yellow-500"
        }`}
      >
        <BsPauseCircle />
      </button>

      {/* end */}
      <button
        onClick={handleEndClick}
        disabled={
          gameState === GameStateEnum.END || gameState === GameStateEnum.CREATED
        }
        className={`text-4xl ${
          gameState === GameStateEnum.END || gameState === GameStateEnum.CREATED
            ? "text-gray-700 hover:cursor-not-allowed"
            : " text-red-500"
        }`}
      >
        <BsStopCircle />
      </button>
    </div>
  );
}

export default GamePlayController;
