import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../../config/api";
import { getAuthUser } from "../../../util/localstorage";
import TextField from "../../form/TextField";
import { ICashBook } from "../../../models/ICashBook";
import { format } from "date-fns";
import Button from "../../form/Button";
import toast, { Toaster } from "react-hot-toast";

function CashierDetail() {
  const [query, setQuery] = useState<any>();
  const [cashiers, setCashiers] = useState<any>();
  const [cashier, setCashier] = useState<any>();
  const [cashBook, setCashBook] = useState<ICashBook>();

  const { state } = useLocation();

  const notifyCashBookClear = () =>
    toast.success("clearing cash book success.", {
      duration: 3000,
      position: "top-right",
    });

  const fetchCashiers = () => {
    const { accessToken, agentId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cashiers/agent-branches/${agentId}`)
      .then((result) => {
        setCashiers(result.data);
        console.log("cashiers:  ", result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const fetchCashier = (cashierId: string) => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cashiers/${cashierId}`)
      .then((result) => {
        setCashier(result.data);
        console.log("cashier: ", result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const clearCashBook = () => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    if (cashier) {
      API.patch(`/cashiers/clear-cash-book/${cashier?.id}`)
        .then((result) => {
          setCashBook(result.data);
          notifyCashBookClear();
          console.log("cash book: ", result.data);
        })
        .catch((err) => console.log("Error: ", err));
    }
  };

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleCashierSelection = (cashierId: string) => {
    fetchCashier(cashierId);
  };

  // fetch cash-book
  useEffect(() => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    if (cashier) {
      console.log("casher id: ", cashier?.id);
      API.get(`/cashiers/cash-book/${cashier?.id}`)
        .then((result) => {
          setCashBook(result.data);
          console.log("cash book: ", result.data);
        })
        .catch((err) => console.log("Error: ", err));
    }
  }, [cashier]);

  useEffect(() => {
    fetchCashiers();
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (state?.cashierId) {
      // @ts-ignore
      fetchCashier(state.cashierId);
    }
    // @ts-ignore
  }, [state]);

  useEffect(() => {
    setQuery("");
  }, [cashier]);

  return (
    <div className="p-2">
      <Toaster />

      <TextField
        placeholder="search cashier by email..."
        onChange={(e) => handleQueryChange(e)}
      />

      <div className="border border-gray-300">
        {query &&
          cashiers
            .filter((cashier: any) => cashier.user.email.includes(query))
            .map((cashier: any) => (
              <div
                key={cashier.id}
                className="flex flex-row bg-white px-4 py-1 hover:cursor-pointer hover:bg-gray-100"
                onClick={() => handleCashierSelection(cashier.id)}
              >
                <p>{cashier.user.email}</p>
              </div>
            ))}
      </div>

      {cashier && (
        <div className="flex flex-col items-start justify-center sm:flex-row sm:justify-between sm:p-16">
          {/* left section */}
          <div className="flex w-full flex-col gap-1">
            <h1 className="text-lg font-bold text-gray-800">Cashier Info</h1>
            <hr />

            <h3 className="text-gray-500">
              * Username: {cashier?.user?.username ?? ""}
            </h3>
            <hr />
            <h3 className="text-gray-500">
              * Phone: {cashier?.user?.Phone ?? ""}
            </h3>
            <hr />
            <h3 className="text-gray-500">
              * Email: {cashier?.user?.email ?? ""}
            </h3>
            <hr />
            <h3 className="text-gray-500">
              * Email Verified: {cashier?.user?.isEmailVerified ?? ""}
            </h3>
            <hr />
            <h3 className="text-gray-500">
              * Role: {cashier?.user?.role ?? ""}
            </h3>
            <hr />
            <h3 className="text-gray-500">
              * Status: {cashier?.user?.status ?? ""}
            </h3>
            <hr />
          </div>

          {/* right section */}
          <div className="flex w-full flex-col justify-end bg-white p-2 pl-2 sm:border-l sm:border-gray-200">
            <h1 className="text-lg font-bold text-gray-800">
              Cash Book Status
            </h1>
            <hr />

            {cashBook && (
              <div className="flex flex-col gap-4">
                <h3>
                  Last Checkout Date:{" "}
                  <span className="font-bold text-green-600">
                    {cashBook?.lastCheckOutDate &&
                      format(
                        new Date(cashBook?.lastCheckOutDate),
                        "yyyy-MM-dd"
                      )}{" "}
                    G.C
                  </span>
                </h3>

                <h3>
                  Due Cash (in Birr):{" "}
                  <span className="font-bold text-green-600">
                    {cashBook?.dueCash ?? ""}
                  </span>
                </h3>

                <Button
                  onClick={clearCashBook}
                  className={"bg-red-600 lowercase hover:bg-red-500"}
                >
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CashierDetail;
