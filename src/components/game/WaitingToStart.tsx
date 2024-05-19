import GameBackground from "./GameBackground";
import ReactLoading from "react-loading";
import { getAuthUser, getStoredSoldCards } from "../../util/localstorage";
import API from "../../config/api";
import { useEffect, useState } from "react";

function WaitingToStart() {
  const [prizeMoney, setPrizeMoney] = useState<number>(0);

  const { money, cards } = getStoredSoldCards();
  const { branchId } = getAuthUser();
  // get sold cards from window.localstorage

  useEffect(() => {
    console.log("edit branch running...");
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/branches/get/${branchId}`)
      .then((result) => {
        if (result.data) {
          const houseEdge = result.data.houseEdge;
          const prize = money * cards.length - money * cards.length * (houseEdge / 100);
          setPrizeMoney(prize);
        }
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  return (
    <>
      <div className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden overflow-y-hidden">
        <GameBackground />

        <div className="flex h-full w-full flex-col items-center justify-start bg-purple-900 bg-opacity-70 py-16">
          <div className="flex flex-col items-center">
            <h1 className="rounded-xl  text-center font-extrabold text-white" style={{ fontSize: "5vw" }}>
              Loading Game To Start
            </h1>

            <ReactLoading type={"balls"} color={"yellow"} height={64} width={64} />
          </div>

          <div className="mx-4 flex w-full flex-col items-center bg-gradient-to-r from-purple-950 via-purple-500 to-purple-950 px-20 py-10">
            <div className="flex justify-start gap-4 rounded-md bg-gradient-to-tr from-indigo-900 via-gray-800 to-purple-900 px-16 py-8 shadow-md">
              <h1 className="text-xl font-semibold uppercase text-white">
                Game Money: {"  "} <span className="text-4xl font-extrabold text-yellow-500">{money ?? "_ _ _"}</span>
              </h1>
              <h1 className="text-xl font-semibold uppercase text-white">
                Total Prize Money:{"  "}
                <span className="text-4xl font-extrabold text-yellow-500">
                  {(cards && prizeMoney) ?? "_ _ _"}
                  {/* {(cards && money * cards.length) ?? "_ _ _"} */}
                </span>
              </h1>
            </div>

            <hr />

            <div>
              <h1 className="text-xl font-bold uppercase text-yellow-400">Sold Cards</h1>
              <hr />

              <div>
                {cards &&
                  cards.map((card, index) => (
                    <div className="flex gap-2 text-gray-300">
                      <span>{index + 1}.</span>
                      <span>{card.id}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WaitingToStart;
