import React, { useEffect, useState } from "react";
import InputCell from "../ui/InputCell";
import Button from "../form/Button";
import API from "../../config/api";
import { getAuthUser } from "../../util/localstorage";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function UpdateCard() {
  const [card, setCard] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
  );
  const { state } = useLocation();
  const { cardId } = useParams();
  const navigate = useNavigate();

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

  // update card
  const handleUpdateCard = () => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // @ts-ignore
    API.patch(`/cards?branchId=${state.branchId}&cardId=${cardId}`, {
      // @ts-ignore
      branchId: state.branchId,
      numbers: card,
    })
      .then((result) => {
        console.log("result: ", result.data);
        if (result.data) {
          navigate("/agent-dashboard/cards");
        }
      })
      .catch((error) => console.log("Error: ", error));
  };

  // fetch card
  useEffect(() => {
    const { accessToken } = getAuthUser();

    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // @ts-ignore
    if (state?.branchId && cardId) {
      // @ts-ignore
      API.get(`/cards?branchId=${state.branchId}&cardId=${cardId}`)
        .then((result) => {
          setCard(result.data.numbers);
        })
        .catch((error) => console.log("Error: ", error));
    }
    // @ts-ignore
  }, [state?.branchId, cardId]);

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <h3 className="text-3xl font-bold">Update Card</h3>

        <div className="flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-6">
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
            <Link to={"/agent-dashboard/cards"} className="w-full">
              <Button className="w-full bg-red-600 shadow-md shadow-black hover:bg-red-500">
                Cancel
              </Button>
            </Link>
            <Button
              className="w-full shadow-md shadow-black"
              onClick={handleUpdateCard}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCard;
