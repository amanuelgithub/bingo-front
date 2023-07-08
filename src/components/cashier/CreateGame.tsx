import { useContext, useEffect, useState } from "react";
import TextField from "../form/TextField";
import Button from "../form/Button";
import { getAuthUser, storeActiveGame } from "../../util/localstorage";
import API from "../../config/api";
import * as yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { SlGameController } from "react-icons/sl";
import { MdOutlineGamepad } from "react-icons/md";
import { GameContext } from "../../state/contexts/game-context";
import { GameActionTypes } from "../../state/actions/game-actions";

const validationSchema = yup.object({
  money: yup.number().min(10).required("Money is required"),
});

function CreateGame() {
  const [activeGameExists, setActiveGameExists] = useState(false);
  const [gameCreated, setGameCreated] = useState(false);

  const { dispatch } = useContext(GameContext);

  const notifyGameCreated = () =>
    toast.success("Game creation success.", {
      duration: 3000,
      position: "top-right",
    });

  useEffect(() => {
    const { accessToken, cashierId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/games/active/${cashierId}`)
      .then((res) => {
        // active game exists
        console.log("active game: ", res.data);
        if (res.data) {
          setActiveGameExists(true);
        }
      })
      .catch((err) => {
        // no active game
        if (err.response.data.statusCode === 404) {
          setActiveGameExists(false);
        }
      });
  }, []);

  const handleCreateGame = (value: any) => {
    const { branchId, cashierId, accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.post("/games", {
      branchId,
      cashierId,
      money: value.money,
    })
      .then((result) => {
        console.log("created game result: ", result.data);
        setGameCreated(true);
        notifyGameCreated();

        dispatch({ type: GameActionTypes.CREATED, ...result.data });

        storeActiveGame({ ...result.data });
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div>
      <Toaster />

      {activeGameExists || gameCreated ? (
        <>
          <div className="flex h-full flex-col items-center justify-start py-10 sm:py-20">
            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-center sm:gap-8 md:min-w-[550px] md:p-16 md:text-xl">
              <div className="flex h-full flex-col items-center justify-center gap-2 text-2xl sm:text-4xl">
                <h1>Active Game exist</h1>
                <MdOutlineGamepad className="text-6xl" />

                <div className="flex flex-row items-center justify-between gap-1 text-sm text-blue-700">
                  <BiArrowBack className="text-xs" />
                  <Link
                    to={"/cashier-dashboard/sell-card"}
                    className="hover:underline"
                  >
                    Go to game page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // rendered if an active game does not exists
        <div className="flex h-full flex-col items-center justify-start py-10 sm:py-20">
          <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-center sm:gap-8 md:min-w-[550px] md:p-16 md:text-xl">
            <div className="flex h-full flex-col items-center justify-center gap-2 text-2xl sm:text-4xl">
              <div className="flex flex-row items-center justify-center gap-2">
                <SlGameController className="text-4xl" />
                <h1>Create Game</h1>
              </div>

              <Formik
                initialValues={{ money: 10 }}
                validationSchema={validationSchema}
                onSubmit={(value, { setSubmitting }) => {
                  setSubmitting(true);
                  handleCreateGame(value);
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      id="money"
                      type={"number"}
                      {...formik.getFieldProps("money")}
                      placeholder="Money"
                      className="my-2 border border-gray-400 focus:outline-green-500"
                    />
                    {formik.touched.money && formik.errors.money ? (
                      <div className="px-2 text-red-600 md:px-8">
                        {formik.errors.money}
                      </div>
                    ) : null}

                    <Button
                      type={"submit"}
                      disabled={formik.isSubmitting}
                      className={"w-full bg-green-600 hover:bg-green-500"}
                    >
                      Create
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGame;
