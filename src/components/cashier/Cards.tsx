import React, { useEffect, useState } from "react";
import Button from "../form/Button";
import { Link } from "react-router-dom";
import API from "../../config/api";
import { getAuthUser } from "../../util/localstorage";
import ReactLoading from "react-loading";

function Cards() {
  const [cardIdToDel, setCardIdToDel] = useState("");
  const [cards, setCards] = useState<
    {
      cardId: string;
      numbers: any[][];
    }[]
  >([]);

  // delete card id
  useEffect(() => {
    if (cardIdToDel) {
      const { accessToken, branchId } = getAuthUser();
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      API.delete(`/cards?branchId=${branchId}&cardId=${cardIdToDel}`)
        .then((result) => {
          console.log("delete result: ", result.data);
        })
        .catch((error) => console.log("Error: ", error));
    }
  }, [cardIdToDel]);

  useEffect(() => {
    const { accessToken, branchId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cards/branch/${branchId}`)
      .then((result) => {
        setCards(result.data.cards);
      })
      .catch((error) => console.log("Error: ", error));
  }, [cardIdToDel]);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 bg-gray-100 px-2 sm:px-4 ">
      <h1 className="py-2 text-start text-4xl font-bold text-gray-500">
        All Cards
      </h1>

      <hr className="w-full  text-blue-600" />

      <div className="flex w-full flex-col items-center justify-center">
        {cards &&
          cards.map((card) => (
            <div className="my-1 flex flex-row items-center justify-between gap-8 bg-gray-200 px-8 py-2 sm:w-full">
              <h3 className="text-sm font-semibold">{card.cardId}</h3>

              <div className="flex gap-2">
                <Link to={`/cashier-dashboard/view-card/${card.cardId}`}>
                  <Button className={"text-sm"}>View</Button>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* Loading */}
      {cards && cards.length <= 0 ? (
        <div className="flex w-full items-center justify-center">
          <ReactLoading
            type={"spokes"}
            color={"#4d4dff"}
            height={32}
            width={32}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Cards;
