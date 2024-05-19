import { Formik } from "formik";
import * as yup from "yup";
import API from "../../../config/api";
import { getAuthUser } from "../../../util/localstorage";
import toast from "react-hot-toast";
import { Input } from "../../ui/input";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import IBranch from "../../../models/IBranch";

interface Props {
  setBranchUpdated: (val: boolean) => void;
  handleModalOpen: () => void;
  isOpen: boolean;
  branchId: string;
}

export default function EditBranch({ branchId, setBranchUpdated, handleModalOpen, isOpen }: Props) {
  const [initialValues, setInitialValues] = useState({ name: "", houseEdge: 10 });
  const [branch, setBranch] = useState<IBranch>();

  useEffect(() => {
    console.log("edit branch running...");
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/branches/get/${branchId}`)
      .then((result) => {
        console.log("found branch result: ", result.data);
        setBranch(result.data);
        setInitialValues({ name: result.data.name, houseEdge: result.data.houseEdge });
      })
      .catch((err) => console.log("Error: ", err));
  }, [branchId]);

  const notifyBranchUpdated = () =>
    toast.success("Branch updated success.", {
      duration: 3000,
      position: "bottom-center",
    });

  const handleUpdateBranch = (values: any) => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.put(`/branches/update/${branchId}`, values)
      .then(() => {
        notifyBranchUpdated();
        setBranchUpdated(true);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <>
      {branchId && branch && initialValues.name && (
        <Dialog onOpenChange={handleModalOpen} open={isOpen} modal defaultOpen={isOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Branch</DialogTitle>
            </DialogHeader>

            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                name: yup.string().required("Name is required."),
                houseEdge: yup.number().required("House Edge is required."),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleUpdateBranch(values);
                setSubmitting(false);
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <div className={"flex flex-col items-start gap-3 py-2"}>
                    <div className="w-full">
                      <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                          id="name"
                          // type="text"
                          {...formik.getFieldProps("name")}
                          placeholder="branch name"
                          className={"my-4 h-9"}
                        />
                      </div>

                      <div>
                        <Label htmlFor="houseEdge">House Edge (%)</Label>
                        <Input
                          id="houseEdge"
                          type="number"
                          {...formik.getFieldProps("houseEdge")}
                          placeholder="House Edge (%)"
                          className={"my-4 h-9"}
                        />
                      </div>

                      {formik.touched.houseEdge && formik.errors.houseEdge ? (
                        <div className="px-2 text-red-600 md:px-8">{formik.errors.houseEdge}</div>
                      ) : null}
                    </div>

                    <DialogFooter className="w-full sm:justify-start">
                      <DialogClose asChild>
                        <div className="my-2 flex w-full flex-row justify-between gap-1">
                          <Button type={"submit"} disabled={formik.isSubmitting} className={"w-full"}>
                            Update
                          </Button>

                          <Button
                            onClick={handleModalOpen}
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
      )}
    </>
  );
}
