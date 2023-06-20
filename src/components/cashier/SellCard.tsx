import React from "react";
import Button from "../form/Button";

function SellCard() {
  const cards = [
    { id: "CR1254" },
    { id: "CR1255" },
    { id: "CR1256" },
    { id: "CR1257" },
  ];

  return (
    <div>
      <div className="flex h-screen flex-col items-center bg-gray-100 p-4">
        {/* started game ... */}
        <div className="flex w-full items-center justify-between gap-1 bg-white px-8 py-4 shadow-md sm:gap-6 sm:md:w-[750px] md:w-[850px]">
          <h3 className="text-base font-semibold sm:text-lg sm:font-bold">
            Started Game
          </h3>
          <h3 className="text-base font-semibold sm:text-lg sm:font-bold">
            Money: 100 Birr
          </h3>

          <Button className="bg-white text-blue-500">Play</Button>
        </div>

        <div className="flex w-full flex-col sm:mt-20 sm:flex-row sm:justify-between sm:md:w-[750px] md:w-[850px]">
          {/* sell card */}
          <div className="py-4">
            <h1 className="mb-4 text-4xl font-bold">Sell Card</h1>

            <div className="my-8">
              <form>
                {/* <TextField placeholder="Enter Game Name" className="my-2" /> */}
                <select
                  name="sell-card"
                  id="sell-card"
                  className="my-2 w-full border-2 border-black py-2"
                >
                  <option>Select Card</option>
                  {cards.map((card) => (
                    <option value={card.id}>{card.id}</option>
                  ))}
                </select>

                <Button className={"w-full"}>Sell</Button>
              </form>
            </div>
          </div>

          {/* sold card */}
          <div className="my-8 flex flex-col gap-1">
            <div className="flex w-5/6 items-center justify-between gap-8 bg-gray-200 px-8 py-4 sm:w-[550px]">
              <h1 className="text-4xl font-bold">Sold Cards</h1>
            </div>

            {cards.map((card) => (
              <div className="flex w-5/6 items-center justify-between gap-8 bg-gray-200 px-8 py-4 sm:w-[550px]">
                <h3 className="text-xl font-bold">{card.id}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellCard;
