import React, { useEffect, useState } from "react";
import CardCell from "./ui/CardCell";
import Button from "./form/Button";
import API from "../config/api";
import { getAuthUser } from "../util/localstorage";
import { Link, useNavigate, useParams } from "react-router-dom";

function ViewCard() {
  const [card, setCard] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
  );
  const { cardId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const { accessToken, branchId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cards?branchId=${branchId}&cardId=${cardId}`)
      .then((result) => {
        setCard(result.data.numbers);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  let rows = [];

  for (let x = 0; x < card.length; x++) {
    const row = card[x];

    const RowComp = (
      <div className="flex w-full">
        {row.map((val, y) => (
          <CardCell
            xIndex={x}
            yIndex={y}
            xIsSize={x === row.length - 1}
            yIsSize={y === card.length - 1}
            value={val ?? ""}
          />
        ))}
      </div>
    );

    rows.push(RowComp);
  }

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <h3 className="text-2xl font-bold sm:text-3xl">View Card</h3>
        <h3 className="bg-white p-1 text-sm font-semibold">
          <span className="text-sm font-bold sm:text-lg">Card ID:</span>{" "}
          {cardId}
        </h3>

        <div className="flex flex-col gap-2 rounded-md border-4 border-blue-500 bg-blue-100 p-6">
          <div className="flex flex-row justify-evenly gap-1 text-3xl font-bold">
            <h2 className="w-full rounded-lg bg-red-500 text-center">B</h2>
            <h2 className="w-full rounded-lg bg-orange-500 text-center">I</h2>
            <h2 className="w-full rounded-lg bg-green-500 text-center">N</h2>
            <h2 className="w-full rounded-lg bg-blue-500 text-center">G</h2>
            <h2 className="w-full rounded-lg bg-pink-500 text-center">O</h2>
          </div>

          {/* card */}
          {card && (
            <div className="rounded-md border-2 border-red-800 bg-yellow-500 p-1">
              {rows.map((row) => (
                <div className="flex w-full flex-col">{row}</div>
              ))}
            </div>
          )}

          {/* Save & Delete Buttons */}
          <div className="flex w-full justify-between gap-4">
            {/* <Link to={navigate(-1)} className="w-full"> */}
            <Button
              onClick={() => navigate(-1)}
              className="w-full bg-red-600 shadow-md shadow-black"
            >
              Go Back
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;
