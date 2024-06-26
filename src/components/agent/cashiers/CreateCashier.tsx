import React, { useContext, useEffect, useState } from "react";
import { getAuthUser } from "../../../util/localstorage";
import API from "../../../config/api";
import { Field, Formik } from "formik";
import * as yup from "yup";
import TextField from "../../form/TextField";
import Button from "../../form/Button";
import { UserRoleEnum, UserStatusEnum } from "../../../models/IUser";
import toast from "react-hot-toast";

interface Props {
  cashierCreated: boolean;
  setCreateCashierFormOpen: (val: boolean) => void;
  setCashierCreated: (val: boolean) => void;
}

const initialValues = {
  username: "",
  phone: "",
  email: "",
  status: "",
  password: "",
  branchId: "",
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters long"),
  phone: yup
    .string()
    .required("Phone is required")
    .min(10, "Phone must be at least 10 characters long")
    .max(13, "Phone must be not exceed 13 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(
      [UserStatusEnum.ACTIVE, UserStatusEnum.INACTIVE],
      "Status must be either ACTIVE or INACTIVE"
    ),
  branchId: yup.string().required("BranchId is required"),
});

function CreateCashier({ setCreateCashierFormOpen, setCashierCreated }: Props) {
  const [branches, setBranches] = useState([
    { id: "", name: "", createdAt: "", modifiedAt: "" },
  ]);

  const notifyCashierCreated = () =>
    toast.success("Cashier creation success.", {
      duration: 3000,
      position: "top-right",
    });

  const notifyCashierCreationError = (err: string) =>
    toast.error(`Cashier creation error. \n ${err}`, {
      duration: 3000,
      position: "top-right",
    });

  const handleCreateBranch = (values: any) => {
    const { accessToken, branchId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.post("/cashiers", {
      ...values,
      role: UserRoleEnum.CASHIER,
    })
      .then(() => {
        notifyCashierCreated();
        setCashierCreated(true);
      })
      .catch((err) => {
        notifyCashierCreationError(err.response.data.message);
      });
  };

  // get list of branches
  useEffect(() => {
    const { accessToken, agentId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/branches/${agentId}`).then((result) => {
      setBranches(result.data);
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        handleCreateBranch(values);
        setSubmitting(false);

        // resetForm({ values: initialValues });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={"py-2 sm:px-20 lg:px-36"}>
            <h5 className="whitespace-nowrap text-center text-xl font-semibold">
              Create Cashier
            </h5>
            <div className="my-2 flex flex-col gap-4 sm:flex-row">
              <div className="w-full">
                <TextField
                  id="username"
                  type="text"
                  {...formik.getFieldProps("username")}
                  placeholder="Username"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="px-2 text-xs text-red-600 md:px-8">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>

              <div className="w-full">
                <TextField
                  id="phone"
                  type="text"
                  {...formik.getFieldProps("phone")}
                  placeholder="Phone"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="px-2 text-xs text-red-600 md:px-8">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="my-2 flex flex-col gap-4 sm:flex-row">
              <div className="w-full">
                {/* Status */}
                <Field
                  id="status"
                  name="status"
                  as="select"
                  className="w-full border-2 border-black py-2"
                >
                  <option value="">select status</option>
                  <option value={UserStatusEnum.ACTIVE}>active</option>
                  <option value={UserStatusEnum.INACTIVE}>inactive</option>
                </Field>

                {formik.touched.status && formik.errors.status ? (
                  <div className="px-2 text-xs text-red-600 md:px-8">
                    {formik.errors.status}
                  </div>
                ) : null}
              </div>

              <div className="w-full">
                {/* BranchId */}
                <Field
                  id="branchId"
                  name="branchId"
                  as="select"
                  className="w-full border-2 border-black py-2"
                >
                  {branches && (
                    <>
                      <option value="">select branch</option>
                      {branches.map((branch) => (
                        <option value={branch.id}>{branch.name}</option>
                      ))}
                    </>
                  )}
                </Field>

                {formik.touched.branchId && formik.errors.branchId ? (
                  <div className="px-2 text-xs text-red-600 md:px-8">
                    {formik.errors.branchId}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <TextField
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="px-2 text-xs text-red-600 md:px-8">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* password */}
            <TextField
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="Password"
              className={"my-2"}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="px-2 text-xs text-red-600 md:px-8">
                {formik.errors.password}
              </div>
            ) : null}

            <div className="my-2 flex w-full flex-row justify-between gap-1">
              <Button
                type={"submit"}
                disabled={formik.isSubmitting}
                className={"w-full"}
              >
                Create
              </Button>
              <Button
                type={"button"}
                onClick={() => setCreateCashierFormOpen(false)}
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

export default CreateCashier;
