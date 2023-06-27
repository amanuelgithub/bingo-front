import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CountDown from "./CountDown";
import PanelBall from "./PanelBall";

function Game() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 1800);

    return () => {
      setHide(false);
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen overflow-x-hidden overflow-y-hidden">
      <img
        src="/images/game-bg-2.jpg"
        alt="bg-image"
        className="absolute left-0 top-0 -z-10 h-screen w-screen"
      />

      {/* count-down timer component */}
      <CountDown />

      {/* left */}
      <div className="h-[100%] w-[35%]">
        {/* top */}
        <div className="flex h-[25%] w-[100%] flex-col items-center justify-center">
          <div className="flex h-[55%] w-[95%] rounded-2xl">
            {/* ball */}
            <motion.div
              initial={{}}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                repeat: Infinity,
                duration: 17,
                type: "tween",
                ease: "linear",
              }}
              className="relative -bottom-[25%] h-[100%] w-[100%]"
            >
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (4).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "2vw" }}
                >
                  22
                </span>
              </div>
            </motion.div>

            {/* ball */}
            <motion.div
              initial={{}}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                repeat: Infinity,
                duration: 15,
                type: "tween",
                ease: "linear",
              }}
              className="relative h-[100%] w-[100%]"
            >
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (5).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "2vw" }}
                >
                  34
                </span>
              </div>
            </motion.div>

            {/* ball */}
            <motion.div
              initial={{}}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                repeat: Infinity,
                duration: 16,
                type: "tween",
                ease: "linear",
              }}
              className="relative h-[100%] w-[100%]"
            >
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (6).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "2vw" }}
                >
                  54
                </span>
              </div>
            </motion.div>

            {/* ball */}
            <motion.div
              initial={{}}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                repeat: Infinity,
                duration: 18,
                type: "tween",
                ease: "linear",
              }}
              className="relative -bottom-[25%] h-[100%] w-[100%]"
            >
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (3).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "2vw" }}
                >
                  87
                </span>
              </div>
            </motion.div>
          </div>

          <div
            className="h-[35%] w-[75%] text-center font-extrabold uppercase text-green-600 shadow-gray-900/90 drop-shadow-lg"
            style={{ fontSize: "8vh" }}
          >
            Bingo
          </div>
        </div>

        {/* middle */}
        <div className="flex h-[50%] w-[100%] items-center justify-center">
          <div className="flex h-[90%] w-[75%] items-center justify-center rounded-2xl bg-white">
            <div className="h-[65%] w-[65%]">
              {/* ball */}
              <AnimatePresence>
                {!hide && (
                  <motion.div
                    initial={{ rotate: 180, scale: 0.3, opacity: 1 }}
                    animate={{ rotate: -360, scale: 1, opacity: 1 }}
                    exit={{
                      scale: 0,
                      dur: 0.1,
                      transition: { type: "just" },
                    }}
                    transition={{ duration: 0.9, type: "spring" }}
                    className={`relative h-[100%] w-[100%]`}
                  >
                    <div className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                      <img
                        src="/images/svg/ball-image (6).svg"
                        alt=""
                        className="absolute left-0 top-0 z-10 h-[100%] w-[100%]  "
                      />

                      <div className="absolute left-0  top-0 z-40  h-[99%] w-[99%] rounded-full bg-gradient-to-b from-slate-100 via-slate-50 to-gray-900 opacity-40" />

                      <span
                        className="z-20 font-bold text-black "
                        style={{ fontSize: "6vw" }}
                      >
                        55
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="flex h-[25%] w-[100%] flex-col items-center justify-center gap-[3%]">
          <div
            className="h-[20%] w-[75%] text-center font-extrabold uppercase text-green-600 shadow-gray-900/90 drop-shadow-lg"
            style={{ fontSize: "4vh" }}
          >
            Last Balls
          </div>

          <div className="flex h-[40%] w-[75%] flex-row items-start justify-start rounded-2xl bg-white px-[2%] py-[2%]">
            {/* ball */}
            <div className="relative h-[100%] w-[100%]">
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (2).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "1.7vw" }}
                >
                  55
                </span>
              </div>
            </div>

            {/* ball */}
            <div className="relative h-[100%] w-[100%]">
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (3).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "1.7vw" }}
                >
                  55
                </span>
              </div>
            </div>

            {/* ball */}
            <div className="relative h-[100%] w-[100%]">
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (4).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "1.7vw" }}
                >
                  55
                </span>
              </div>
            </div>

            {/* ball */}
            <div className="relative h-[100%] w-[100%]">
              <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src="/images/svg/ball-image (5).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />
                <span
                  className="z-20 font-bold text-gray-700"
                  style={{ fontSize: "1.7vw" }}
                >
                  55
                </span>
              </div>
            </div>
          </div>
        </div>
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

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (c, index) => (
                <>
                  <PanelBall called={index === 9 ? true : false}>{c}</PanelBall>

                  {/* ball */}
                  <div
                    className={`${
                      index === 9 ? "hidden" : "block"
                    } relative h-[70%] w-[6%]`}
                  >
                    <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-purple-700 bg-opacity-50 text-white">
                      <span
                        className="font-semibold"
                        style={{ fontSize: "1.75vw" }}
                      >
                        {c}
                      </span>
                    </div>
                  </div>
                </>
              )
            )}
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

            {[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(
              (c) => (
                <>
                  {/* ball */}
                  <div className="relative h-[70%] w-[6%]">
                    <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-purple-700 bg-opacity-50 text-white">
                      <span
                        className="font-semibold"
                        style={{ fontSize: "1.75vw" }}
                      >
                        {c}
                      </span>
                    </div>
                  </div>
                </>
              )
            )}
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

            {[31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map(
              (c) => (
                <>
                  {/* ball */}
                  <div className="relative h-[70%] w-[6%]">
                    <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-purple-700 bg-opacity-50 text-white">
                      <span
                        className="font-semibold"
                        style={{ fontSize: "1.75vw" }}
                      >
                        {c}
                      </span>
                    </div>
                  </div>
                </>
              )
            )}
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

            {[46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60].map(
              (c) => (
                <>
                  {/* ball */}
                  <div className="relative h-[70%] w-[6%]">
                    <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-purple-700 bg-opacity-50 text-white">
                      <span
                        className="font-semibold"
                        style={{ fontSize: "1.75vw" }}
                      >
                        {c}
                      </span>
                    </div>
                  </div>
                </>
              )
            )}
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

            {[61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75].map(
              (c) => (
                <>
                  {/* ball */}
                  <div className="relative h-[70%] w-[6%]">
                    <div className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-purple-700 bg-opacity-50 text-white">
                      <span
                        className="font-semibold"
                        style={{ fontSize: "1.75vw" }}
                      >
                        {c}
                      </span>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
