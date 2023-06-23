import React, { useEffect, useState } from "react";
import Button from "../form/Button";
import { Link } from "react-router-dom";
import API from "../../config/api";
import { getAuthUser } from "../../util/localstorage";

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
        console.log("result: ", result.data);
        setCards(result.data.cards);
      })
      .catch((error) => console.log("Error: ", error));
  }, [cardIdToDel]);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 bg-gray-100">
      <h1 className="py-2 text-start text-4xl font-bold text-gray-500 sm:w-full md:px-36 lg:px-48">
        All Cards
      </h1>

      <div className="flex w-5/6 justify-end px-8 sm:w-full md:px-36 lg:px-48">
        <Link to={"/agent-dashboard/register-card"}>
          <Button>Add</Button>
        </Link>
      </div>

      <div className="sm:w-full md:px-36 lg:px-48">
        {cards &&
          cards.map((card) => (
            <div className="my-1 flex flex-row items-center justify-between gap-8 bg-gray-200 px-8 py-2 sm:w-full">
              <h3 className="text-sm font-bold">{card.cardId}</h3>

              <div className="flex gap-2">
                <Link to={`/agent-dashboard/update-card/${card.cardId}`}>
                  <Button className={"text-sm"}>View</Button>
                </Link>

                <Button
                  onClick={() => setCardIdToDel(card.cardId)}
                  className={"bg-red-600 text-sm"}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cards;
