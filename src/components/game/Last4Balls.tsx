import React from "react";

function Last4Balls() {
  return (
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
  );
}

export default Last4Balls;
