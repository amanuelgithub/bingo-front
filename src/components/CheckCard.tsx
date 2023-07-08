import React, { useState, useEffect } from "react";
import { getAuthUser } from "../util/localstorage";
import API from "../config/api";
import CardCellForCheckCard from "./ui/CardCellForCheckCard";

interface Props {
  cardId: string;
  calledNumbers?: number[];
}

function CheckCard({ cardId, calledNumbers }: Props) {
  const [card, setCard] = useState<any[][]>([]);
  const [rows, setRows] = useState<any[]>([]);

  // const [card, setCard] = useState(
  //   Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => undefined))
  // );

  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const { accessToken, branchId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cards?branchId=${branchId}&cardId=${cardId}`)
      .then((result) => {
        setCard(result.data.numbers);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  useEffect(() => {
    console.log("called numbers: check ", calledNumbers);
  }, [calledNumbers]);

  useEffect(() => {
    console.log("includes: ", calledNumbers && calledNumbers.includes(19));
  }, [calledNumbers]);

  // populating the card

  useEffect(() => {
    if (rows.length < 5 && card && calledNumbers) {
      for (let x = 0; x < card.length; x++) {
        const row = card[x];

        const RowComp = (
          <>
            {numbers && card && (
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
  }, [numbers, card]);

  return (
    <div>
      <div className="bg-gray-100 p-4">
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
    </div>
  );
}

export default CheckCard;
