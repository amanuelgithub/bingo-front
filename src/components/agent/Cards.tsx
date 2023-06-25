import React, { useEffect, useState } from "react";
import Button from "../form/Button";
import { Link } from "react-router-dom";
import API from "../../config/api";
import { getAuthUser } from "../../util/localstorage";
import ReactLoading from "react-loading";
import { IoAdd } from "react-icons/io5";

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
      <div className="flex w-full flex-row justify-between py-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">All Cards</h2>

        <Link to={"/agent-dashboard/register-card"}>
          <Button className={"flex flex-row items-center justify-center gap-2"}>
            <IoAdd />
            <p>add</p>
          </Button>
        </Link>
      </div>

      <hr className="w-full text-blue-600" />

      {/* <div className="sm:w-full md:px-36 lg:px-48"> */}
      <div className="flex w-full flex-col items-center justify-center">
        {cards &&
          cards.map((card) => (
            <div className="my-1 flex w-full flex-row items-center justify-between gap-8 bg-gray-200 px-4 py-2">
              <h3 className="w-3/5 text-sm font-bold">{card.cardId}</h3>

              <div className="flex w-2/5 flex-col gap-2 sm:flex-row sm:justify-end">
                <Link to={`/agent-dashboard/update-card/${card.cardId}`}>
                  <Button className={"w-full text-sm md:w-auto"}>View</Button>
                </Link>

                <Button
                  onClick={() => setCardIdToDel(card.cardId)}
                  className={"w-full bg-red-600 text-sm md:w-auto"}
                >
                  Delete
                </Button>
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
