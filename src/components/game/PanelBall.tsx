import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children: any;
}
function PanelBall({ children }: Props) {
  const [hide, setHide] = useState(false);
  const [hideStart, setHideStar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideStar(true);
    }, 1000);
  }, []);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            scale: 0,
            transition: { type: "just" },
          }}
          transition={{ duration: 0.9, type: "spring" }}
          className={`relative h-[70%] w-[6%]`}
        >
          <div className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[100%] bg-opacity-50">
            <img
              src="/images/svg/ball-image (6).svg"
              alt=""
              className="absolute left-0 top-0 z-10 h-[100%] w-[100%]"
            />

            {/* stars */}
            <div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <AnimatePresence>
                  {!hideStart && (
                    <motion.img
                      initial={{
                        opacity: 1,
                        scale: 0.3,
                        rotate: Math.random() * 360,
                      }}
                      animate={{
                        opacity: 0.7,
                        scale: (function () {
                          let value = Math.random() * 1;
                          return value > 0.3 ? value : 0.4;
                        })(),
                        rotate: Math.random() * 360,
                        x: Math.random() * 30 * Math.pow(-1, n),
                        y: Math.random() * 30 * Math.pow(-1, n),
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          delay: 0.5 * Math.random(),
                          duration: 0.2,
                          type: "tween",
                          ease: "easeIn",
                        },
                      }}
                      transition={{
                        delay: 0.5 * Math.random(),
                        ease: "backInOut",
                        duration: 0.75,

                        // type: "spring",
                      }}
                      src="/images/svg/star.svg"
                      alt=""
                      className="absolute left-[40%] top-[40%] z-10 h-[35%] w-[35%]"
                    />
                  )}
                </AnimatePresence>
              ))}
            </div>

            <span
              className="z-20 font-bold text-black "
              style={{ fontSize: "1.35vw" }}
            >
              {children}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PanelBall;
