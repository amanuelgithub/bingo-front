import React, { useState, useEffect } from "react";
import { getAuthUser } from "../util/localstorage";
import API from "../config/api";
import CardCellForCheckCard from "./ui/CardCellForCheckCard";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  cardId: string;
  calledNumbers?: number[];
}

function CheckCard({ cardId, calledNumbers }: Props) {
  const [card, setCard] = useState<any[][]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const [winner, setWinner] = useState(false);

  // card-copy for marking (i.e. making value = 0)
  const [cardCopy, setCardCopy] = useState<any[][]>([]);
  // mark rows
  const [markedRows, setMarkedRows] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  // mark columns
  const [markedColumns, setMarkedColumns] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  // mark right diagonal
  const [markRightDiagonal, setMarkRightDiagonal] = useState(false);
  const [markLeftDiagonal, setMarkLeftDiagonal] = useState(false);

  // display winner status
  useEffect(() => {
    console.log("Winner: ", winner);
  }, [winner]);

  // check if card is winner
  useEffect(() => {
    const checkWinner = () => {
      // 1. if all rows found (i.e. check if all marked rows all have a true value)
      if (!markedRows.find((val) => val === false)) {
        setWinner(true);
      }
      // 2. if all columns found
      else if (!markedColumns.find((val) => val === false)) {
        setWinner(true);
      }
      // 3. count found rows, columns and diagonals and if it is >= 5 then card is a winner
      else {
        const markedRowCount = markedRows.filter((val) => val === true).length;
        const markedColumnCount = markedColumns.filter(
          (val) => val === true
        ).length;

        const summedRows =
          markedRowCount +
          markedColumnCount +
          (markRightDiagonal ? 1 : 0) +
          (markLeftDiagonal ? 1 : 0);

        if (summedRows >= 5) {
          setWinner(true);
        } else {
          setWinner(false);
        }
      }
    };

    if (markedRows && markedColumns && markRightDiagonal && markLeftDiagonal) {
      checkWinner();
    }
  }, [
    cardCopy.length,
    calledNumbers,
    markedRows,
    markedColumns,
    markRightDiagonal,
    markLeftDiagonal,
    cardCopy,
  ]);

  const markNumberFound = (num: number) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const newArr = [...cardCopy];
        // newArr[row][col] = "0";
        // console.log("newArr", newArr);

        newArr[row][col] =
          newArr[row][col] === num.toString() ? "0" : newArr[row][col];

        // set free value also to zero
        if (newArr[row][col] === null) {
          newArr[row][col] = "0";
        }

        // update
        setCardCopy(newArr);
      }
    }
  };

  // mark card-copy & count marked rows, columns, and diagonals
  useEffect(() => {
    if (cardId && cardCopy.length > 0) {
      calledNumbers &&
        // marking
        calledNumbers.forEach((no) => {
          markNumberFound(no);
          // console.log("card-copy-marked: ", cardCopy);
        });

      // keep track or marked rows, columns, and diagonals
      // Check rows
      for (let row = 0; row < 5; row++) {
        if (
          cardCopy[row][0] === "0" &&
          cardCopy[row][1] === "0" &&
          cardCopy[row][2] === "0" &&
          cardCopy[row][3] === "0" &&
          cardCopy[row][4] === "0"
        ) {
          const newMarkedRows = [...markedRows];
          newMarkedRows[row] = true;
          setMarkedRows(newMarkedRows);
        }
      }

      // Check columns
      for (let col = 0; col < 5; col++) {
        if (
          cardCopy[0][col] === "0" &&
          cardCopy[1][col] === "0" &&
          cardCopy[2][col] === "0" &&
          cardCopy[3][col] === "0" &&
          cardCopy[4][col] === "0"
        ) {
          const newMarkedColumns = [...markedRows];
          newMarkedColumns[col] = true;
          setMarkedColumns(newMarkedColumns);
        }
      }

      // Check right diagonals
      if (
        card[0][0] === "0" &&
        card[1][1] === "0" &&
        card[2][2] === "0" &&
        card[3][3] === "0" &&
        card[4][4] === "0"
      ) {
        setMarkRightDiagonal(true);
      }

      // Check left diagonals
      if (
        card[0][4] === "0" &&
        card[1][3] === "0" &&
        card[2][2] === "0" &&
        card[3][1] === "0" &&
        card[4][0] === "0"
      ) {
        setMarkLeftDiagonal(true);
      }
    }
  }, [cardId, calledNumbers, cardCopy.length]);

  // view marked copy-card
  useEffect(() => {
    // console.log("copied card: ", cardCopy);
  }, [cardCopy, calledNumbers]);

  // copy card
  useEffect(() => {
    // console.log("card: ", card);
    if (card) {
      setCardCopy(card);
    }
  }, [card]);

  useEffect(() => {
    const { accessToken, branchId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cards?branchId=${branchId}&cardId=${cardId}`)
      .then((result) => {
        setCard(result.data.numbers);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  // populating the card

  useEffect(() => {
    if (rows.length < 5 && card && calledNumbers) {
      for (let x = 0; x < card.length; x++) {
        const row = card[x];

        const RowComp = (
          <>
            {card && (
              <div className="flex w-full">
                {row.map((val: number, y) => (
                  <CardCellForCheckCard
                    key={y}
                    value={val}
                    calledNumbers={calledNumbers}
                    xIndex={x}
                    yIndex={y}
                    xIsSize={x === row.length - 1}
                    yIsSize={y === card.length - 1}
                  />
                ))}
              </div>
            )}
          </>
        );

        // rows.push(RowComp);
        setRows((prev) => [...prev, RowComp]);
      }
    }
  }, [calledNumbers, card, rows.length]);

  return (
    <div className="bg-gray-100">
      {!winner && (
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="my-1 w-fit rounded-full border border-gray-300 bg-gray-50 p-4 text-gray-500 hover:bg-white">
            <AiOutlineClose className="text-2xl font-extrabold" />
          </div>
          <p className="text-lg">{cardId}</p>
        </div>
      )}

      {winner && (
        <div className="">
          <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2">
            <p className="whitespace-nowrap text-lg">{cardId}</p>
            <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-5xl font-bold text-white shadow-2xl">
              Winner
            </h1>

            <button className="rounded-full border-b-4 border-green-700 bg-gradient-to-r from-green-500 to-green-400 px-4 py-2 text-center text-2xl font-bold text-white shadow-2xl">
              confirm
            </button>
          </div>
        </div>
      )}

      {/* card */}
      <div>
        {rows &&
          rows.map((row, index) => (
            <div key={index} className="flex w-full flex-col">
              {row}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CheckCard;
