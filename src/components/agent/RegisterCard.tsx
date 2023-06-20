import React, { useState } from "react";
import InputCell from "../ui/InputCell";
import Button from "../form/Button";
import API from "../../config/api";
import { getAuthUser } from "../../util/localstorage";

function RegisterCard() {
  const [card, setCard] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
  );

  // a function to update the value of each cell inputs
  const updateCellValue = (row: any, col: any, value: any) => {
    setCard((prevCard) => {
      const newCard = [...prevCard];

      newCard[row][col] = value;

      return newCard;
    });
  };

  let rows = [];
  for (let row = 0; row < card.length; row++) {
    const innerArr = card[row];

    const RowComp = (
      <div className="flex w-full">
        {innerArr.map((val, col) => (
          <InputCell
            xIndex={row}
            yIndex={col}
            xIsSize={row === innerArr.length - 1}
            yIsSize={col === card.length - 1}
            value={val ?? ""}
            onInputCellChange={updateCellValue}
          />
        ))}
      </div>
    );

    rows.push(RowComp);
  }

  const handleRegisterCard = () => {
    console.log("register card values: ", card);
    const { accessToken, branchId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.post("/cards", { branchId, numbers: card })
      .then((result) => {
        console.log("result: ", result.data);
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <h3 className="text-3xl font-bold">Register Card</h3>

        <div className="flex flex-col gap-2 rounded-md border-4 border-blue-500 bg-blue-100 p-6">
          <div className="flex flex-row justify-evenly gap-1 text-3xl font-bold">
            <h2 className="w-full rounded-lg bg-red-500 text-center">B</h2>
            <h2 className="w-full rounded-lg bg-orange-500 text-center">I</h2>
            <h2 className="w-full rounded-lg bg-green-500 text-center">N</h2>
            <h2 className="w-full rounded-lg bg-blue-500 text-center">G</h2>
            <h2 className="w-full rounded-lg bg-pink-500 text-center">O</h2>
          </div>

          {/* card */}
          <div className="rounded-md border-2 border-red-800 bg-yellow-500 p-1">
            {rows.map((row) => (
              <div className="flex w-full flex-col">{row}</div>
            ))}
          </div>

          {/* Save & Delete Buttons */}
          <div className="flex w-full justify-between gap-4">
            <Button
              className="w-full shadow-md shadow-blue-800"
              onClick={handleRegisterCard}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCard;
