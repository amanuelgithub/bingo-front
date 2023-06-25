import React from "react";
import TextField from "../../form/TextField";
import Button from "../../form/Button";
import { Formik } from "formik";
import * as yup from "yup";
import API from "../../../config/api";
import { getAuthUser } from "../../../util/localstorage";
import toast from "react-hot-toast";

interface Props {
  setCreateBranchFormOpen: (val: boolean) => void;
  setBranchCreated: (val: boolean) => void;
}

function CreateBranch({ setCreateBranchFormOpen, setBranchCreated }: Props) {
  const notifyBranchCreated = () =>
    toast.success("Branch creation success.", {
      duration: 3000,
      position: "bottom-center",
    });

  const handleCreateBranch = (values: any) => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.post("/branches", values)
      .then(() => {
        notifyBranchCreated();
        setBranchCreated(true);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={yup.object({
        name: yup.string().required("Name is required."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleCreateBranch(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div
            className={
              "flex flex-col items-start gap-3 py-2 sm:flex-row sm:justify-center sm:gap-2 sm:px-6 lg:px-8"
            }
          >
            <h5 className="whitespace-nowrap text-xl font-semibold">
              Create Branch
            </h5>
            <div className="w-full">
              <TextField
                id="name"
                type="text"
                {...formik.getFieldProps("name")}
                placeholder="branch name"
                className={"h-9"}
              />

              {formik.touched.name && formik.errors.name ? (
                <div className="px-2 text-red-600 md:px-8">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            <div className="flex w-full flex-row justify-between gap-1">
              <Button
                type={"submit"}
                disabled={formik.isSubmitting}
                className={"w-full"}
              >
                Create
              </Button>
              <Button
                type={"button"}
                onClick={() => setCreateBranchFormOpen(false)}
                className={"w-full bg-red-500"}
              >
                Close
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default CreateBranch;
