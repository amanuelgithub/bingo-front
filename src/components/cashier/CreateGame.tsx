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
      position: "bottom-center",
    });

  // find if an active game exists
  useEffect(() => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/games/newly-created")
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
        // rendered if an active game exists
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Active Game exist!!
          </h1>

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
      ) : (
        // rendered if an active game does not exists
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
          <h1 className="mb-4 text-4xl font-bold">Create New Game</h1>
          {/* <Toaster /> */}

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
                  className="my-2"
                />
                {formik.touched.money && formik.errors.money ? (
                  <div className="px-2 text-red-600 md:px-8">
                    {formik.errors.money}
                  </div>
                ) : null}

                <Button
                  type={"submit"}
                  disabled={formik.isSubmitting}
                  className={"w-full"}
                >
                  Create
                </Button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default CreateGame;
