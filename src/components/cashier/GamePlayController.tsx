import React, { useEffect, useState } from "react";
import { BsPauseCircle, BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { Socket } from "socket.io-client";
import { GameStateEnum, IGame, IGameSocketMessage } from "../../models/IGame";
import { getAuthUser } from "../../util/localstorage";

interface Props {
  socket?: Socket;
  activeGame: IGame | undefined;
  gameState: GameStateEnum;
  handleGameState: (state: GameStateEnum) => void;
}

function GamePlayController({
  gameState,
  handleGameState,
  activeGame,
  socket,
}: Props) {
  // const [gameState, setGameState] = useState<GameStateEnum>(
  //   GameStateEnum.CREATED
  // );
  const [gameSocketMessage, setGameSocketMessage] =
    useState<IGameSocketMessage>({
      room: "",
      gameId: "",
      soundLang: "am",
      soundUrl: "",
      gameData: {
        currentIndex: 0,
        gameState: GameStateEnum.CREATED,
        playingNumbers: [],
      },
    });

  const { cashierId } = getAuthUser();
  // room = gameId + cashierId
  const room = `${activeGame?.id}${cashierId}`;

  const joinRoom = (value: IGameSocketMessage) => {
    socket?.emit("joinRoom", value);
  };
  const sendMessageOnRoom = (value: IGameSocketMessage) => {
    socket?.emit("joinRoom", value);
  };
  const messageListener = (message: IGameSocketMessage) => {
    console.log(":msg:", message);
    setGameSocketMessage(message);
  };

  const handlePlayClick = (e: any) => {
    e.preventDefault();
    handleGameState(GameStateEnum.PLAYING);
    // send message to server through socket
    sendMessageOnRoom({
      room,
      gameId: gameSocketMessage?.gameId,
      soundLang: "am",
      soundUrl: "",
      gameData: {
        ...gameSocketMessage?.gameData,
        gameState: GameStateEnum.PLAYING,
      },
    });
  };
  const handlePauseClick = (e: any) => {
    e.preventDefault();
    handleGameState(GameStateEnum.PAUSED);

    sendMessageOnRoom({
      room,
      gameId: gameSocketMessage?.gameId,
      soundLang: "am",
      soundUrl: "",
      gameData: {
        ...gameSocketMessage?.gameData,
        gameState: GameStateEnum.PAUSED,
      },
    });
  };
  const handleEndClick = (e: any) => {
    e.preventDefault();
    handleGameState(GameStateEnum.END);

    sendMessageOnRoom({
      room,
      gameId: gameSocketMessage?.gameId,
      soundLang: "am",
      soundUrl: "",
      gameData: {
        ...gameSocketMessage?.gameData,
        gameState: GameStateEnum.END,
      },
    });
  };

  // starting point -> joinRoom
  useEffect(() => {
    joinRoom({
      room,
      gameId: activeGame?.id + ".json",
      soundLang: "am",
      soundUrl: "",
      gameData: {
        ...gameSocketMessage?.gameData,
        gameState: GameStateEnum.CREATED,
      },
    }); // asking to join room
  }, []);

  useEffect(() => {
    socket?.on("joinedRoom", messageListener);

    return () => {
      // socket?.off("game", messageListener);
      socket?.off("joinedRoom", messageListener);
    };
  }, [socket]);

  // get info from the room
  useEffect(() => {
    socket?.on(room, messageListener);

    return () => {
      socket?.off(room, messageListener);
    };
  }, [socket]);

  // when message from socket received
  useEffect(() => {
    if (gameSocketMessage.gameData) {
      handleGameState(gameSocketMessage.gameData.gameState);
    }
  }, [gameSocketMessage]);

  return (
    <div className="flex w-full flex-row items-center justify-start gap-2 sm:justify-end md:flex-row">
      {/* play */}
      <button
        onClick={(e) => handlePlayClick(e)}
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
