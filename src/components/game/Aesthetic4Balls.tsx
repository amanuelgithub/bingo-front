import { motion } from "framer-motion";
import React from "react";

function Aesthetic4Balls() {
  return (
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
  );
}

export default Aesthetic4Balls;
