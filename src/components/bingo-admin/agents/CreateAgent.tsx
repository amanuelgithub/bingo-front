import React, { useEffect, useState } from "react";
import { getAuthUser } from "../../../util/localstorage";
import API from "../../../config/api";
import { Field, Formik } from "formik";
import TextField from "../../form/TextField";
import Button from "../../form/Button";
import { UserRoleEnum, UserStatusEnum } from "../../../models/IUser";
import toast from "react-hot-toast";

interface Props {
  setCreateAgentFormOpen: (val: boolean) => void;
  setAgentCreated: (val: boolean) => void;
}

function CreateAgent({ setCreateAgentFormOpen, setAgentCreated }: Props) {
  const [branches, setBranches] = useState([
    { id: "", name: "", createdAt: "", modifiedAt: "" },
  ]);

  const notifyAgentCreated = () =>
    toast.success("Agent creation success.", {
      duration: 3000,
      position: "bottom-center",
    });

  const handleCreateAgent = (values: any) => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.post("/agents", { ...values, role: UserRoleEnum.AGENT })
      .then(() => {
        notifyAgentCreated();
        setAgentCreated(true);
      })
      .catch((err) => console.log("Error: ", err));
  };

  // get list of branches
  useEffect(() => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/branches").then((result) => {
      setBranches(result.data);
    });
  }, []);

  return (
    <Formik
      initialValues={{
        username: "",
        phone: "",
        email: "",
        // role: undefined,
        status: undefined,
        password: "",
        branchId: "",
      }}
      // validationSchema={yup.object({
      // })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleCreateAgent(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={"py-2 sm:px-20 lg:px-36"}>
            <h5 className="whitespace-nowrap text-center text-xl font-semibold">
              Create Agent
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

              <TextField
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Email"
              />
            </div>

            <div className="my-2 flex flex-col gap-4 sm:flex-row">
              {/* Status */}
              <Field
                name="status"
                as="select"
                className="my-2 w-full border-2 border-black py-2"
              >
                <option value="">select status</option>
                <option value={UserStatusEnum.ACTIVE}>active</option>
                <option value={UserStatusEnum.INACTIVE}>inactive</option>
              </Field>
              {/* BranchId */}
              <Field
                name="branchId"
                as="select"
                className="my-2 w-full border-2 border-black py-2"
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
              <Button
                type={"button"}
                onClick={() => setCreateAgentFormOpen(false)}
                className={"w-full bg-red-500"}
              >
                Close
              </Button>

              <Button type={"submit"} className={"w-full"}>
                Create
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default CreateAgent;
