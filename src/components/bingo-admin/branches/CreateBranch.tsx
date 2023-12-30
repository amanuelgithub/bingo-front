import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import API from "../../../config/api";
import { getAuthUser } from "../../../util/localstorage";
import toast from "react-hot-toast";
import { Input } from "../../ui/input";
import { IoAdd } from "react-icons/io5";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";

interface Props {
  // setCreateBranchFormOpen: (val: boolean) => void;
  setBranchCreated: (val: boolean) => void;
}

function CreateBranch({ setBranchCreated }: Props) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IoAdd className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Branch</DialogTitle>
        </DialogHeader>

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
              <div className={"flex flex-col items-start gap-3 py-2"}>
                <div className="w-full">
                  <Input
                    id="name"
                    // type="text"
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

                <DialogFooter className="w-full sm:justify-start">
                  <DialogClose asChild>
                    <div className="my-2 flex w-full flex-row justify-between gap-1">
                      <Button
                        type={"submit"}
                        disabled={formik.isSubmitting}
                        className={"w-full"}
                      >
                        Create
                      </Button>

                      <Button
                        variant={"destructive"}
                        type={"button"}
                        className={"w-full"}
                      >
                        Close
                      </Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </div>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBranch;
