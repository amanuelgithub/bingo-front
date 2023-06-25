import { useEffect, useState } from "react";
import Button from "../form/Button";
import API from "../../config/api";
import { getActiveGame, getAuthUser } from "../../util/localstorage";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BiArrowToRight } from "react-icons/bi";
import { IGame } from "../../models/IGame";
import ReactLoading from "react-loading";

function SellCard() {
  const [cardSold, setCardSold] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [gamePlays, setGamePlays] = useState<any[]>([]);
  const [unsoldCards, setUnsoldCards] = useState<any[]>([]);

  const [activeGame, setActiveGame] = useState<IGame>();
  const [activeGameExists, setActiveGameExists] = useState(false);

  const { accessToken } = getAuthUser();

  const notifyCardSold = () =>
    toast.success("Card sell success.", {
      duration: 3000,
      position: "bottom-center",
    });

  const notifyCardSellError = (err: string) =>
    toast.error(`Card Sell error. \n ${err}`, {
      duration: 3000,
      position: "bottom-center",
    });

  const fetchActiveGame = () => {
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/games/newly-created")
      .then((res) => {
        // active game exists
        if (res.data) {
          setActiveGameExists(true);
          setActiveGame(res.data);
          console.log("active game result: ", res.data);
        }
      })
      .catch((err) => {
        // no active game
        if (err.response?.data.statusCode === 404) {
          setActiveGameExists(false);
        }
      });
  };

  const fetchFindUnsoldCards = () => {
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/plays/unsold-cards/${activeGame?.branchId}/${activeGame?.id}`)
      .then((result) => {
        setUnsoldCards(result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const fetchFindGamePlays = () => {
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/plays/game-plays/${activeGame?.branchId}/${activeGame?.id}`)
      .then((result) => {
        setGamePlays(result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const sellCard = (e: any) => {
    e.preventDefault();

    if (!selectedCardId) {
      setErrors(["Card Id is required!"]);
    } else {
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      API.post("/plays", {
        gameId: activeGame?.id,
        branchId: activeGame?.branchId,
        cardId: selectedCardId,
        cashierId: activeGame?.cashierId,
        money: activeGame?.money,
      })
        .then((result) => {
          console.log("sell-card: ", result.data);
          notifyCardSold();
          setCardSold(true);
          setGamePlays([]);
        })
        .catch((err) => {
          notifyCardSellError(err);
        });
    }
  };

  useEffect(() => {
    fetchActiveGame();
  }, []);

  useEffect(() => {
    fetchFindUnsoldCards();
    fetchFindGamePlays();
  }, [activeGame]);

  // card-sold -> refetch unsold & sold cards
  useEffect(() => {
    if (cardSold) {
      fetchFindUnsoldCards();
      fetchFindGamePlays();
    }

    return () => {
      setCardSold(false);
    };
  }, [cardSold]);

  useEffect(() => {
    if (selectedCardId) {
      setErrors([]);
    }
  }, [selectedCardId]);

  return (
    <div>
      <Toaster />
      {!activeGameExists ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">No Game Found</h1>

          <div className="flex flex-row items-center justify-between gap-1 text-sm text-blue-700">
            <Link
              to={"/cashier-dashboard/sell-card"}
              className="hover:underline"
            >
              go to create game
            </Link>

            <BiArrowToRight className="text-xs" />
          </div>
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center bg-gray-100 p-4">
          {/* started game ... */}
          <div className="flex w-full flex-row items-center justify-between bg-white px-8 py-4 shadow-md sm:gap-6">
            <h3 className="text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
              Started Game
            </h3>

            <h3 className="text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
              Money: {activeGame?.money} Birr
            </h3>

            <Button className={"bg-green-500 hover:bg-green-400"}>Play</Button>
          </div>

          <div className="flex w-full flex-col gap-4 sm:mt-20 sm:flex-row sm:justify-between ">
            {/* sell card */}
            <div className="w-full py-4 md:w-2/6">
              <h1 className="text-2xl font-bold text-gray-600">Sell Card</h1>

              <div className="my-2">
                {errors.map((err) => (
                  <div className="text-red-600">{err}</div>
                ))}

                <form>
                  {/* <TextField placeholder="Enter Game Name" className="my-2" /> */}
                  <select
                    name="cardId"
                    id="sell-card"
                    value={selectedCardId}
                    onChange={(e: any) => {
                      setSelectedCardId(e.target.value);
                    }}
                    className="my-2 w-full border-2 border-gray-500 py-2"
                  >
                    <option value={""}>Select Card</option>
                    {unsoldCards.map((card) => (
                      <option value={card.cardId}>{card.cardId}</option>
                    ))}
                  </select>

                  <Button onClick={(e) => sellCard(e)} className={"w-full"}>
                    Sell
                  </Button>
                </form>
              </div>
            </div>

            {/* sold card */}
            <div className="flex w-full flex-col gap-1 py-4 md:w-4/6">
              <div className="flex items-center justify-between gap-8 bg-white px-8 py-2 shadow-lg">
                <h1 className="text-2xl font-bold text-gray-600">Sold Cards</h1>
                <p className="font-bold text-gray-500">
                  Total: {"  "}
                  <span className="font-semibold text-green-600">
                    {gamePlays.length}
                  </span>
                </p>
              </div>

              {/* Loading */}
              {gamePlays && gamePlays.length <= 0 ? (
                <div className="flex w-full items-center justify-center">
                  <ReactLoading
                    type={"spokes"}
                    color={"#4d4dff"}
                    height={32}
                    width={32}
                  />
                </div>
              ) : null}

              {gamePlays.map((play) => (
                <div className="flex flex-row items-center justify-between gap-8 bg-gray-200 px-8 py-2">
                  <h3 className="text-sm ">{play.cardId}</h3>

                  <Link
                    to={`/cashier-dashboard/view-card/${play.cardId}`}
                    className="text-blue-500 hover:underline"
                  >
                    view
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellCard;
