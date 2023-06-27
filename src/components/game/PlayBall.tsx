import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

function PlayBall() {
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
  );
}

export default PlayBall;
