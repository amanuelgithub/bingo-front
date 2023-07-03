import React, { useEffect, useState } from "react";
import { getAuthUser } from "../../util/localstorage";
import API from "../../config/api";
import { ICashBook } from "../../models/ICashBook";
import { format } from "date-fns";

function CashBook() {
  const [cashBook, setCashBook] = useState<ICashBook>();

  useEffect(() => {
    const { accessToken, cashierId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cashiers/cash-book/${cashierId}`)
      .then((result) => {
        setCashBook(result.data);
        console.log("cash book: ", result.data);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-start py-10 sm:py-20">
      {cashBook && (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 text-sm text-gray-600 md:min-w-[550px] md:p-16 md:text-xl">
          <div className="flex w-full flex-row items-center justify-between">
            <h2 className="w-2/3 whitespace-nowrap font-bold">
              Last Checkout Date:
            </h2>

            <span className="w-1/3 whitespace-nowrap">
              {cashBook.lastCheckOutDate &&
                format(new Date(cashBook.lastCheckOutDate), "yyyy-MM-dd")}{" "}
              G.C
            </span>
          </div>

          <hr />

          <div className="flex w-full flex-row justify-between">
            <h2 className="w-2/3 whitespace-nowrap font-bold ">
              Due Cash(in Birr):
            </h2>

            <span className="w-1/3 whitespace-nowrap">{cashBook.dueCash}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CashBook;
