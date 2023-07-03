import React, { useEffect, useState } from "react";
import Button from "../form/Button";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([
    { id: "", name: "", createdAt: "", modifiedAt: "" },
  ]);

  const handleBranchSelection = (e: any) => {
    setSelectedBranch(e.target.value);
  };

  // delete card id
  useEffect(() => {
    if (cardIdToDel && selectedBranch) {
      const { accessToken } = getAuthUser();
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      API.delete(`/cards?branchId=${selectedBranch}&cardId=${cardIdToDel}`)
        .then((result) => {
          console.log("delete result: ", result.data);
        })
        .catch((error) => console.log("Error: ", error));
    }
  }, [cardIdToDel]);

  // fetch card by branchId
  useEffect(() => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    if (selectedBranch) {
      API.get(`/cards/branch/${selectedBranch}`)
        .then((result) => {
          setCards(result.data.cards);
        })
        .catch((error) => console.log("Error: ", error));
    }
  }, [cardIdToDel, selectedBranch]);

  // get list of branches
  useEffect(() => {
    const { accessToken, agentId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/branches/${agentId}`).then((result) => {
      setBranches(result.data);
    });
  }, []);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 bg-gray-100 px-2 sm:px-4 ">
      <div className="flex w-full flex-col justify-between py-2 sm:flex-row sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">All Cards</h2>

        {/* BranchId */}
        <div className="flex flex-row items-center justify-between gap-2 ">
          <h1 className="whitespace-nowrap font-semibold">select branch: </h1>

          <select
            id="branchId"
            name="branchId"
            className="w-full border-2 border-gray-200 py-2"
            onChange={(e) => handleBranchSelection(e)}
          >
            {branches && (
              <>
                <option value="">select branch</option>
                {branches.map((branch) => (
                  <option value={branch.id}>{branch.name}</option>
                ))}
              </>
            )}
          </select>

          <Link to={"/agent-dashboard/register-card"}>
            <Button
              className={"flex flex-row items-center justify-center gap-2"}
            >
              <IoAdd />
              <p>add</p>
            </Button>
          </Link>
        </div>
      </div>

      <hr className="w-full text-blue-600" />

      {/* <div className="sm:w-full md:px-36 lg:px-48"> */}
      <div className="flex w-full flex-col items-center justify-center">
        {cards &&
          cards.map((card) => (
            <div className="my-1 flex w-full flex-row items-center justify-between gap-8 bg-gray-200 px-4 py-2">
              <h3 className="w-3/5 text-sm font-bold">{card.cardId}</h3>

              <div className="flex w-2/5 flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  onClick={() =>
                    navigate(`/agent-dashboard/update-card/${card.cardId}`, {
                      state: { branchId: selectedBranch },
                    })
                  }
                  className={"w-full text-sm md:w-auto"}
                >
                  View
                </Button>

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
