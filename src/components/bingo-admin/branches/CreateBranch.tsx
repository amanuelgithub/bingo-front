import React from "react";
import TextField from "../../form/TextField";
import Button from "../../form/Button";
import { Formik } from "formik";
import * as yup from "yup";
import API from "../../../config/api";
import { getAuthUser } from "../../../util/localstorage";

interface Props {
  onCreateBranch: (val: boolean) => void;
}

function CreateBranch({ onCreateBranch }: Props) {
  const handleCreateBranch = (values: any) => {
    const { id, isLoggedIn, accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.post("/branches", values)
      .then((result) => {
        console.log("create branch: result data: ", result.data);
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
              "flex flex-col sm:justify-center items-center sm:flex-row sm:gap-2 gap-3 py-2 sm:px-6 lg:px-8"
            }
          >
            <h5 className="whitespace-nowrap text-xl font-semibold">
              Create Branch
            </h5>
            <TextField
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="branch name"
              className={"h-9"}
            />

            <div className="flex flex-row justify-between gap-1 w-full">
              <Button type={"submit"} className={"w-full"}>
                Create
              </Button>
              <Button
                type={"button"}
                onClick={() => onCreateBranch(false)}
                className={"bg-red-500 w-full"}
              >
                Close
              </Button>
            </div>
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="px-2 md:px-8 text-red-600">
              {formik.errors.name}
            </div>
          ) : null}
        </form>
      )}
    </Formik>
  );
}

export default CreateBranch;
