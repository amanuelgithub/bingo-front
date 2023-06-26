import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CountDown() {
  const [count, setCount] = useState(15);
  const [hiddenWeStartIn, setHiddenWeStartIn] = useState(false);
  const [hiddenGoodLuck, setHiddenGoodLuck] = useState(true);

  const [countDownStarted, setCountDownStarted] = useState(false);
  const [closeCountDownWindow, setCloseCountDownWindow] = useState(false);

  useEffect(() => {
    const countDownTimer = setTimeout(() => {
      if (countDownStarted) {
        setCount((prev) => {
          return prev - 1;
        });

        if (count === 0) setCount(0);
      }
    }, 1000);

    const delayCountDownTimer = setTimeout(() => {
      setCountDownStarted(true);
    }, 2000);

    if (count !== 0) {
      setHiddenWeStartIn(false);
      setHiddenGoodLuck(true);
    }

    if (count === 0) {
      setHiddenWeStartIn(true);
      setHiddenGoodLuck(false);
    }

    return () => {
      clearTimeout(countDownTimer);
      clearTimeout(delayCountDownTimer);
    };
  }, [count, countDownStarted]);

  return (
    <div
      className={`${
        closeCountDownWindow ? "hidden" : "flex"
      } absolute left-0 top-0 z-30 flex h-[100%] w-[100%] flex-col items-center justify-center gap-[2%] px-[2%] py-[2%]`}
    >
      {/* <div className="w-[100%]"> */}
      <AnimatePresence>
        {!hiddenWeStartIn && (
          <motion.h1
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0,
              // opacity: 0,
              transition: { delay: 0.75, duration: 0.2, type: "spring" },
            }}
            transition={{ duration: 0.3, type: "spring" }}
            className="w-[50%] rounded-xl bg-purple-600 text-center font-bold text-white"
            style={{ fontSize: "4vw" }}
          >
            WE START IN ...
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!hiddenGoodLuck && (
          <motion.h1
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.1,
              opacity: 0,
              transition: { delay: 1.5, duration: 0.2, type: "spring" },
            }}
            onAnimationComplete={() => {
              setHiddenGoodLuck(true);

              setTimeout(() => {
                setCloseCountDownWindow(true);
              }, 1200);
            }}
            transition={{ delay: 1, duration: 0.3, type: "spring" }}
            className="w-[50%] rounded-xl bg-purple-600 text-center font-bold text-white"
            style={{ fontSize: "4vw" }}
          >
            GOOD LUCK!
          </motion.h1>
        )}
      </AnimatePresence>
      {/* </div> */}

      {/* bottom */}
      <AnimatePresence>
        {count !== 0 && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.5,
              y: -120,
              // x: -100,
              transition: { duration: 0.1, type: "tween" },
            }}
            transition={{ delay: 1, duration: 0.3, type: "spring" }}
            className="relative flex h-[25%] w-[15%] flex-row items-center justify-center rounded-2xl bg-purple-600 px-[2%] py-[2%]  font-extrabold"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
              <AnimatePresence>
                {count === n && (
                  <motion.h1
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={countDownStarted ? { scale: 1, opacity: 1 } : {}}
                    exit={{
                      scale: 0.6,
                      opacity: 0,
                      transition: { duration: 0.5, type: "spring" },
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4,
                      type: "spring",
                      bounce: 0.5,
                    }}
                    className={`absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center text-center text-white ${
                      //   className={`absolute -left-[12%] -top-[35%] flex h-[100%] w-[100%] items-center justify-center text-center text-white ${
                      count !== n || !countDownStarted ? "hidden" : "block"
                    }`}
                    style={{ fontSize: "10vw" }}
                  >
                    {n}
                  </motion.h1>
                )}
              </AnimatePresence>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CountDown;
