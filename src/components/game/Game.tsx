import React, { useEffect, useState } from "react";
import CountDown from "./CountDown";
import Last4Balls from "./Last4Balls";
import PlayBall from "./PlayBall";
import Aesthetic4Balls from "./Aesthetic4Balls";
import PanelCell from "./PanelCell";
import GameBackground from "./GameBackground";
import WaitingToStart from "./WaitingToStart";

// create an object containing a number and its ball color
interface IBall {
  number: number;
  color: string;
}

function Game() {
  const [gameState, setGameState] = useState("waiting");

  const [balls, setBalls] = useState<IBall[]>([]);
  const [b, setB] = useState<IBall[]>([]);
  const [i, setI] = useState<IBall[]>([]);
  const [n, setN] = useState<IBall[]>([]);
  const [g, setG] = useState<IBall[]>([]);
  const [o, setO] = useState<IBall[]>([]);

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

  if (gameState === "waiting") {
    // return <WaitingToStart />;
  }

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen overflow-x-hidden overflow-y-hidden">
      <GameBackground />
      {/* count-down timer component */}
      <CountDown />

      {/* left */}
      <div className="h-[100%] w-[35%]">
        {/* top */}
        <Aesthetic4Balls />
        {/* middle */}
        <PlayBall />
        {/* bottom */}
        <Last4Balls />
      </div>

      {/* right */}
      <div className="flex h-[100%] w-[65%] flex-col items-center justify-center">
        <div
          className="flex h-[15%] w-[100%] flex-col items-center justify-end whitespace-nowrap font-extrabold uppercase text-green-500 shadow-gray-900/90 drop-shadow-lg"
          style={{ fontSize: "3.5vw" }}
        >
          Control panel
        </div>

        <div className="flex h-[85%] w-[100%] flex-col items-center justify-start">
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
              <PanelCell index={index} ballNumber={c.number} color={c.color} />
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
              <PanelCell ballNumber={c.number} color={c.color} />
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
              <PanelCell ballNumber={c.number} color={c.color} />
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
              <PanelCell ballNumber={c.number} color={c.color} />
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
              <PanelCell ballNumber={c.number} color={c.color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
