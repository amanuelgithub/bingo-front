import React, { useContext, useEffect, useState } from "react";
import { getAuthUser } from "../../../util/localstorage";
import API from "../../../config/api";
import { Field, Formik } from "formik";
import * as yup from "yup";
import TextField from "../../form/TextField";
import Button from "../../form/Button";
import { UserRoleEnum, UserStatusEnum } from "../../../models/IUser";

interface Props {
  onCreateCashier: (val: boolean) => void;
}

function CreateCashier({ onCreateCashier }: Props) {
  const handleCreateBranch = (values: any) => {
    const { accessToken, branchId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.post("/cashiers", {
      ...values,
      role: UserRoleEnum.CASHIER,
      branchId: branchId,
    })
      .then((result) => {
        console.log("create cashier result data: ", result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <Formik
      initialValues={{
        username: "",
        phone: "",
        email: "",
        // role: undefined,
        status: undefined,
        password: "",
      }}
      // validationSchema={yup.object({
      // })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleCreateBranch(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={"py-2 sm:px-20 lg:px-36"}>
            <h5 className="whitespace-nowrap text-center text-xl font-semibold">
              Create Cashier
            </h5>
            <div className="my-2 flex flex-col gap-4 sm:flex-row">
              <TextField
                id="username"
                type="text"
                {...formik.getFieldProps("username")}
                placeholder="Username"
              />

              <TextField
                id="phone"
                type="text"
                {...formik.getFieldProps("phone")}
                placeholder="Phone"
              />
            </div>

            <div className="my-2 flex flex-col gap-4 sm:flex-row">
              <TextField
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Email"
              />

              {/* Status */}
              <Field
                name="status"
                as="select"
                className="w-full border-2 border-black py-2"
              >
                <option value="">select status</option>
                <option value={UserStatusEnum.ACTIVE}>active</option>
                <option value={UserStatusEnum.INACTIVE}>inactive</option>
              </Field>
            </div>

            {/* password */}
            <TextField
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="Password"
              className={"my-2"}
            />

            <div className="flex w-full flex-row justify-between gap-1">
              <Button type={"submit"} className={"w-full"}>
                Create
              </Button>
              <Button
                type={"button"}
                onClick={() => onCreateCashier(false)}
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
