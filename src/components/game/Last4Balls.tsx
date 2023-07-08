import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { IBall } from "../../models/IBall";

interface Props {
  last4BallsIndex: (number | undefined)[];
  balls: IBall[];
}

function Last4Balls({ last4BallsIndex, balls }: Props) {
  useEffect(() => {
    // console.log("last 4 balls: ", last4BallsIndex);
  }, [last4BallsIndex]);

  useEffect(() => {
    console.log("balls: ", balls);
  }, [balls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      className="flex h-[25%] w-[100%] flex-col items-center justify-center gap-[3%]"
    >
      <div
        className="h-[20%] w-[75%] text-center font-extrabold uppercase text-green-600 shadow-gray-900/90 drop-shadow-lg"
        style={{ fontSize: "4vh" }}
      >
        Last Balls
      </div>

      <div className="flex h-[40%] w-[75%] flex-row items-start justify-start rounded-2xl bg-white px-[2%] py-[2%]">
        {/* ball */}
        {last4BallsIndex &&
          last4BallsIndex
            .slice()
            .reverse()
            .map((val, index) => (
              <motion.div
                key={index}
                initial={{ x: 0 }}
                animate={{ x: 2, transition: { repeat: Infinity } }}
                className="relative h-[100%] w-[25%]"
              >
                <div
                  key={val}
                  className="flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50"
                >
                  <img
                    src={balls[(val ?? 0) - 1].color}
                    alt=""
                    className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
                  />
                  <span
                    className="z-20 font-bold text-gray-700"
                    style={{ fontSize: "1.7vw" }}
                  >
                    {balls[(val ?? 0) - 1].number}
                  </span>
                </div>
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
}

export default Last4Balls;
