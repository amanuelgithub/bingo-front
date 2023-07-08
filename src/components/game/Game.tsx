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
import {
  ISoldCards,
  getAuthUser,
  storeCalledNumbers,
  storeSoldCards,
} from "../../util/localstorage";
import API from "../../config/api";
import { IBall } from "../../models/IBall";
import FailedToConnect from "../FailedToConnect";
import ReactAudioPlayer from "react-audio-player";
import { useCalledNumbers } from "../../state/called-numbers-context";

// create an object containing a number and its ball color

function Game() {
  const [activeGame, setActiveGame] = useState<IGame>();

  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.CREATED
  );

  const [calledBallNumbers, setCalledBallNumbers] = useState<
    (number | undefined)[]
  >([]);
  const [last4CalledBalls, setLast4CalledBalls] = useState<
    (number | undefined)[]
  >([]);

  // current playing number index = playingNumbers[currentIndex]
  const [currentPlayingNumber, setCurrentPlayingNumber] = useState<
    number | undefined
  >();

  const { updateCalledNumbers } = useCalledNumbers();

  const [socket, setSocket] = useState<Socket>();
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

  const [count, setCount] = useState(15);

  const [balls, setBalls] = useState<IBall[]>([]);
  const [b, setB] = useState<IBall[]>([]);
  const [i, setI] = useState<IBall[]>([]);
  const [n, setN] = useState<IBall[]>([]);
  const [g, setG] = useState<IBall[]>([]);
  const [o, setO] = useState<IBall[]>([]);

  const [audioUrl, setAudioUrl] = useState("");

  const handleCount = (val: number) => setCount(val);

  const refresh = () => window.location.reload();

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

  // gets an active game of by cashier
  useEffect(() => {
    fetchActiveGameOfCashier();
  }, []);

  // interval that run to fetch active game if their are none
  useEffect(() => {
    let getActiveGameInterval: any;
    if (
      gameState === GameStateEnum.END ||
      gameState === GameStateEnum.CREATED
    ) {
      getActiveGameInterval = setInterval(() => {
        fetchActiveGameOfCashier();
      }, 2000);
    }

    return () => {
      clearInterval(getActiveGameInterval);
    };
  }, [gameState]);

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
        soundLang: "am",
        soundUrl: "",
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
      console.log("sound url: ", gameSocketMessage?.soundUrl);
    }
  }, [gameSocketMessage, gameState]);

  // main game play control
  useEffect(() => {
    let gamePlayCallInterval: any;

    // do something if the game is ended
    if (
      gameSocketMessage.gameData?.gameState === GameStateEnum.END &&
      gameState === GameStateEnum.END
    ) {
      refresh();
      // remove sold info from localstorage
      storeSoldCards({} as ISoldCards);
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
          setCurrentPlayingNumber(
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

  // set audioUrl when gameSocketMessage Changes
  useEffect(() => {
    let audioDelay: any;
    if (gameSocketMessage.soundUrl) {
      audioDelay = setTimeout(() => {
        setAudioUrl(gameSocketMessage.soundUrl);
      }, 4000);
    }

    return () => clearTimeout(audioDelay);
  }, [gameSocketMessage]);

  useEffect(() => {
    if (calledBallNumbers) {
      console.log("called numbers: ", calledBallNumbers);
      // context value will not be sync since the game page
      // is loaded in another page
      updateCalledNumbers(calledBallNumbers);
      storeCalledNumbers(
        calledBallNumbers.filter((val): val is number => val !== undefined)
      );
    }

    if (calledBallNumbers.length < 4) {
      setLast4CalledBalls(calledBallNumbers.slice());
    } else {
      setLast4CalledBalls(
        calledBallNumbers.slice(
          calledBallNumbers.length - 4,
          calledBallNumbers.length
        )
      );
    }
  }, [calledBallNumbers]);

  // appends called ball index when currentPlayingNumber changes
  useEffect(() => {
    if (currentPlayingNumber) {
      setCalledBallNumbers((prevVal) => [...prevVal, currentPlayingNumber]); //
    }
  }, [currentPlayingNumber]);

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

      <div className="hidden">
        {audioUrl && (
          // {gameSocketMessage?.soundUrl && audioUrl && (
          <ReactAudioPlayer
            src={audioUrl}
            // src={gameSocketMessage?.soundUrl}
            autoPlay
            controls
          />
        )}
      </div>

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
            currentPlayingNumber &&
            balls[currentPlayingNumber - 1]
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
                // key={c.number}
                calledPlayingNumber={currentPlayingNumber}
                ballNumber={c.number}
                isInCalled={calledBallNumbers.includes(c.number)}
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
                // key={c.number}
                calledPlayingNumber={currentPlayingNumber}
                ballNumber={c.number}
                isInCalled={calledBallNumbers.includes(c.number)}
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
                // key={c.number}
                calledPlayingNumber={currentPlayingNumber}
                ballNumber={c.number}
                isInCalled={calledBallNumbers.includes(c.number)}
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
                // key={c.number}
                calledPlayingNumber={currentPlayingNumber}
                ballNumber={c.number}
                isInCalled={calledBallNumbers.includes(c.number)}
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
                // key={c.number}
                calledPlayingNumber={currentPlayingNumber}
                ballNumber={c.number}
                isInCalled={calledBallNumbers.includes(c.number)}
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
