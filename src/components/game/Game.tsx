import { useEffect, useState } from "react";
import CountDown from "./CountDown";
import Last4Balls from "./Last4Balls";
import PlayBall from "./PlayBall";
import Aesthetic4Balls from "./Aesthetic4Balls";
import PanelCell from "./PanelCell";
import GameBackground from "./GameBackground";
import WaitingToStart from "./WaitingToStart";
import { Socket, io } from "socket.io-client";
import { GameStateEnum, IGame, IGameSocketMessage } from "../../models/IGame";
import { motion, useAnimationControls } from "framer-motion";
import { getAuthUser } from "../../util/localstorage";
import API from "../../config/api";
import { IBall } from "../../models/IBall";
import FailedToConnect from "../FailedToConnect";

// create an object containing a number and its ball color

function Game() {
  const [activeGame, setActiveGame] = useState<IGame>();
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.CREATED
  );

  const [calledBallsIndex, setCalledBallsIndex] = useState<
    (number | undefined)[]
  >([]);
  const [last4CalledBalls, setLast4CalledBalls] = useState<
    (number | undefined)[]
  >([]);

  // current playing number index = playingNumbers[currentIndex]
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<
    number | undefined
  >();

  const [socket, setSocket] = useState<Socket>();
  const [gameSocketMessage, setGameSocketMessage] =
    useState<IGameSocketMessage>({
      room: "",
      gameId: "",
      gameData: {
        currentIndex: 0,
        gameState: GameStateEnum.CREATED,
        playingNumbers: [],
      },
    });

  const [count, setCount] = useState(15);

  const [balls, setBalls] = useState<IBall[]>([]);
  const [b, setB] = useState<IBall[]>([]);
  const [i, setI] = useState<IBall[]>([]);
  const [n, setN] = useState<IBall[]>([]);
  const [g, setG] = useState<IBall[]>([]);
  const [o, setO] = useState<IBall[]>([]);

  const handleCount = (val: number) => setCount(val);

  // setup socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);

    // console.log("socket connected");
  }, [setSocket]);

  const controls = useAnimationControls();

  const { accessToken, cashierId } = getAuthUser();

  const numbers = Array.from({ length: 75 }, (_, index) => index + 1);
  const ballColors = [
    "/images/svg/ball-image.svg",
    "/images/svg/ball-image (1).svg",
    "/images/svg/ball-image (2).svg",
    "/images/svg/ball-image (3).svg",
    "/images/svg/ball-image (4).svg",
    "/images/svg/ball-image (5).svg",
    "/images/svg/ball-image (6).svg",
    "/images/svg/ball-image (7).svg",
  ];

  // gets an active game of by cashier
  useEffect(() => {
    const fetchActiveGameOfCashier = () => {
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      API.get(`/games/active/${cashierId}`)
        .then((res) => {
          if (res.data) {
            setActiveGame(res.data);
          }
        })
        .catch((err) => {
          if (err.response?.data.statusCode === 404) {
            console.log("error: ", err);
          }
        });
    };

    fetchActiveGameOfCashier();
  }, []);

  // create an object of array containing a number and its ball color
  useEffect(() => {
    numbers.forEach((number) => {
      // get a random index between 0 - len-of ballColors array
      const randomIndex = Math.floor(Math.random() * ballColors.length);

      setBalls((balls) => [
        ...balls,
        {
          number: number,
          color: ballColors[randomIndex],
        },
      ]);
    });

    return () => {
      setBalls([]);
    };
  }, []);

  // populate each bingo letters array
  useEffect(() => {
    if (balls.length === 75) {
      setB([...balls.slice(0, 15)]);
      setI([...balls.slice(15, 30)]);
      setN([...balls.slice(30, 45)]);
      setG([...balls.slice(45, 60)]);
      setO([...balls.slice(60, 75)]);
    }
  }, [balls]);

  // Loading Animation control
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3 },
    }));
  }, []);

  const joinRoom = (value: IGameSocketMessage) => {
    socket?.emit("joinRoom", value);
  };
  const sendMessageOnRoom = (value: IGameSocketMessage) => {
    socket?.emit("joinRoom", value);
    // console.log("send msg: ", value);
  };
  const messageListener = (message: IGameSocketMessage) => {
    // console.log(":msg:", message);
    setGameSocketMessage(message);
  };

  // get info from the room
  useEffect(() => {
    socket?.on(`${activeGame?.id}${cashierId}`, messageListener);

    return () => {
      socket?.off(`${activeGame?.id}${cashierId}`, messageListener);
    };
  }, [messageListener]);

  // starting point -> joinRoom
  useEffect(() => {
    if (socket && activeGame?.id && cashierId) {
      joinRoom({
        room: `${activeGame?.id}${cashierId}`,
        gameId: activeGame?.id + ".json",
        gameData: {
          ...gameSocketMessage?.gameData,
          gameState: GameStateEnum.CREATED,
        },
      }); // asking to join room
    }
  }, [socket, activeGame, cashierId]);

  // listens to 'joinedRoom'
  useEffect(() => {
    socket?.on("joinedRoom", messageListener);

    return () => {
      socket?.off("joinedRoom", messageListener);
    };
  }, [socket]);

  // listens to get info of the gameSocketMessage
  useEffect(() => {
    socket?.on(`${activeGame?.id}${cashierId}`, messageListener);

    return () => {
      socket?.off(`${activeGame?.id}${cashierId}`, messageListener);
    };
  }, [socket]);

  // set the separate gameState from gameSocketMessage
  useEffect(() => {
    if (gameSocketMessage.gameData) {
      setGameState(gameSocketMessage.gameData?.gameState);
    }
  }, [gameSocketMessage]);

  // main game play control
  useEffect(() => {
    let gamePlayCallInterval: any;

    // do something if the game is ended
    if (
      gameSocketMessage.gameData?.gameState === GameStateEnum.END &&
      gameState === GameStateEnum.END
    ) {
      // todo: handle game ended state
    } else if (count === 0 && gameSocketMessage.gameData?.currentIndex >= 75) {
      // game should be ended
      sendMessageOnRoom({
        ...gameSocketMessage,
        gameData: {
          ...gameSocketMessage.gameData,
          gameState: GameStateEnum.END,
        },
      });
    } else if (
      count === 0 &&
      gameSocketMessage &&
      gameSocketMessage.gameData?.currentIndex < 75 &&
      gameState === GameStateEnum.PLAYING
    ) {
      //
      gamePlayCallInterval = setInterval(() => {
        setGameSocketMessage({
          ...gameSocketMessage,
          gameData: {
            ...gameSocketMessage.gameData,
            currentIndex: gameSocketMessage.gameData.currentIndex,
          },
        });

        sendMessageOnRoom({
          ...gameSocketMessage,
          gameData: {
            ...gameSocketMessage.gameData,
            currentIndex: gameSocketMessage.gameData.currentIndex + 1,
          },
        });

        // increase the currentPlayingIndex
        if (gameSocketMessage.gameData) {
          setCurrentPlayingIndex(
            gameSocketMessage.gameData?.playingNumbers[
              gameSocketMessage.gameData?.currentIndex
            ]
          );
        }
      }, 4500);
    }

    return () => {
      clearInterval(gamePlayCallInterval);
    };
  }, [count, gameSocketMessage, gameState]);

  useEffect(() => {
    if (calledBallsIndex.length < 4) {
      setLast4CalledBalls(calledBallsIndex.slice());
    } else {
      setLast4CalledBalls(
        calledBallsIndex.slice(
          calledBallsIndex.length - 4,
          calledBallsIndex.length
        )
      );
    }
  }, [calledBallsIndex]);

  // appends called ball index when currentPlayingIndex changes
  useEffect(() => {
    if (currentPlayingIndex) {
      setCalledBallsIndex((prevVal) => [...prevVal, currentPlayingIndex]); //
    }
  }, [currentPlayingIndex]);

  if (gameState === GameStateEnum.END) {
    return <div>show game ended page</div>;
  }

  if (!accessToken || !cashierId) {
    return <FailedToConnect />;
  }

  // game is not yet started
  if (gameState === GameStateEnum.CREATED) {
    return <WaitingToStart />;
  }

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen overflow-x-hidden overflow-y-hidden">
      <GameBackground />
      {/* count-down timer component */}
      {!loading && (
        <CountDown
          gameState={gameState}
          count={count}
          handleCount={handleCount}
        />
      )}

      {/* left */}
      <div className="h-[100%] w-[35%]">
        {/* top */}
        <Aesthetic4Balls setLoading={setLoading} />
        {/* middle */}
        <PlayBall
          ball={
            gameSocketMessage &&
            currentPlayingIndex &&
            balls[currentPlayingIndex - 1]
          }
          gameState={gameState}
        />
        {/* bottom */}
        <Last4Balls last4BallsIndex={last4CalledBalls} balls={balls} />
      </div>

      {/* right */}
      <div className="flex h-[100%] w-[65%] flex-col items-center justify-center">
        <motion.div
          initial={{ display: "hidden", opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex h-[15%] w-[100%] flex-col items-center justify-end whitespace-nowrap font-extrabold uppercase text-green-500 shadow-gray-900/90 drop-shadow-lg"
          style={{ fontSize: "3.5vw" }}
        >
          Control panel
        </motion.div>

        <motion.div
          initial={{ display: "hidden", opacity: 0, scale: 1.3 }}
          // custom={2}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.7 } }}
          className="flex h-[85%] w-[100%] flex-col items-center justify-start"
        >
          {/* B -> row */}
          <div
            className={`flex h-[10%] w-[95%] items-center justify-center gap-[1%] bg-white px-[2%]`}
          >
            <h1
              className="w-[7%] border-r-2 border-blue-600 text-center  font-extrabold text-blue-600 shadow-gray-900/90 drop-shadow-lg"
              style={{ fontSize: "4vw" }}
            >
              B
            </h1>

            {b.map((c, index) => (
              <PanelCell
                index={currentPlayingIndex}
                ballNumber={c.number}
                isInCalled={calledBallsIndex.includes(c.number)}
                color={c.color}
              />
            ))}
          </div>

          {/* I -> row */}
          <div
            className={`flex h-[10%] w-[95%] items-center justify-center gap-[1%] bg-white px-[2%]`}
          >
            <h1
              className="w-[7%] border-r-2 border-green-600 text-center font-extrabold text-green-600 shadow-gray-900/90 drop-shadow-lg"
              style={{ fontSize: "4vw" }}
            >
              I
            </h1>

            {i.map((c) => (
              <PanelCell
                index={currentPlayingIndex}
                ballNumber={c.number}
                isInCalled={calledBallsIndex.includes(c.number)}
                color={c.color}
              />
            ))}
          </div>

          {/* N -> row */}
          <div
            className={`flex h-[10%] w-[95%] items-center justify-center gap-[1%] bg-white px-[2%]`}
          >
            <h1
              className="w-[7%] border-r-2 border-yellow-600 text-center font-extrabold text-yellow-600 shadow-gray-900/90 drop-shadow-lg"
              style={{ fontSize: "4vw" }}
            >
              N
            </h1>

            {n.map((c) => (
              <PanelCell
                index={currentPlayingIndex}
                ballNumber={c.number}
                isInCalled={calledBallsIndex.includes(c.number)}
                color={c.color}
              />
            ))}
          </div>

          {/* G -> row */}
          <div
            className={`flex h-[10%] w-[95%] items-center justify-center gap-[1%] bg-white px-[2%]`}
          >
            <h1
              className="w-[7%] border-r-2 border-purple-600 text-center font-extrabold text-purple-600 shadow-gray-900/90 drop-shadow-lg"
              style={{ fontSize: "4vw" }}
            >
              G
            </h1>

            {g.map((c) => (
              <PanelCell
                index={currentPlayingIndex}
                ballNumber={c.number}
                isInCalled={calledBallsIndex.includes(c.number)}
                color={c.color}
              />
            ))}
          </div>

          {/* O -> row */}
          <div
            className={`flex h-[10%] w-[95%] items-center justify-center gap-[1%] bg-white px-[2%]`}
          >
            <h1
              className="w-[7%] border-r-2 border-orange-600 text-center font-extrabold text-orange-600 shadow-gray-900/90 drop-shadow-lg"
              style={{ fontSize: "4vw" }}
            >
              O
            </h1>

            {o.map((c) => (
              <PanelCell
                index={currentPlayingIndex}
                ballNumber={c.number}
                isInCalled={calledBallsIndex.includes(c.number)}
                color={c.color}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Game;
