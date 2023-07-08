import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IBall } from "../../models/IBall";
import { GameStateEnum } from "../../models/IGame";

interface Props {
  ball: IBall | undefined | 0;
  gameState: GameStateEnum;
}

function PlayBall({ ball, gameState }: Props) {
  const [hide, setHide] = useState(false);

  const controls = useAnimationControls();

  useEffect(() => {
    console.log("playBall: ", ball);
  }, [ball]);

  // Loading Animation control
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3 },
    }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 4000);

    return () => {
      setHide(false);
    };
  }, []);

  useEffect(() => {
    setHide(true);
  }, [ball]);

  useEffect(() => {
    // console.log("hide: ", hide);
    let interval: any;
    if (hide) {
      interval = setTimeout(() => {
        setHide(false);
      }, 400);
    }

    return () => {
      clearTimeout(interval);
    };
  }, [hide]);

  return (
    <motion.div
      initial={{ display: "hidden", opacity: 0, scale: 1.3 }}
      custom={4}
      animate={controls}
      className="flex h-[50%] w-[100%] items-center justify-center"
    >
      <div className="flex h-[90%] w-[75%] items-center justify-center rounded-2xl bg-white">
        <div className="h-[65%] w-[65%]">
          {/* ball */}
          {gameState === GameStateEnum.PLAYING && ball && (
            <AnimatePresence>
              {!hide && (
                <motion.div
                  initial={{ rotate: 180, scale: 0, opacity: 0 }}
                  animate={{ rotate: -360, scale: 1, opacity: 1 }}
                  exit={{
                    scale: 0,
                    // opacity: 0,
                    transition: { duration: 0.3, type: "spring" },
                  }}
                  transition={{ duration: 1.5, type: "spring" }}
                  onAnimationStart={() => {
                    console.log("PlayBall Anim Start!");
                  }}
                  onAnimationEnd={() => console.log("PlayBall Anim End!")}
                  onAnimationComplete={() =>
                    console.log("PlayBall Anim Complete!")
                  }
                  className={`relative h-[100%] w-[100%]`}
                >
                  <div className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                    <img
                      src={ball.color}
                      // src="/images/svg/ball-image (6).svg"
                      alt=""
                      className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                    />

                    <div className="absolute left-0  top-0 z-40  h-[99%] w-[99%] rounded-full bg-gradient-to-b from-slate-100 via-slate-50 to-gray-900 opacity-40" />

                    <span
                      className="z-20 font-bold text-black "
                      style={{ fontSize: "6vw" }}
                    >
                      {ball.number && ball.number}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {gameState === GameStateEnum.PAUSED && ball && (
            <div className={`relative h-[100%] w-[100%]`}>
              <div className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
                <img
                  src={ball.color}
                  // src="/images/svg/ball-image (6).svg"
                  alt=""
                  className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                />

                <div className="absolute left-0  top-0 z-40  h-[99%] w-[99%] rounded-full bg-gradient-to-b from-slate-100 via-slate-50 to-gray-900 opacity-40" />

                <span
                  className="z-20 font-bold text-black "
                  style={{ fontSize: "6vw" }}
                >
                  {ball.number && ball.number}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PlayBall;
