import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { getAuthUser } from "../../../util/localstorage";
import API from "../../../config/api";
import { Formik } from "formik";
import * as yup from "yup";
import { UserRoleEnum, UserStatusEnum } from "../../../models/IUser";
import toast from "react-hot-toast";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

interface CreateAgentProps {
  // setCreateAgentFormOpen: (val: boolean) => void;
  setAgentCreated: (val: boolean) => void;
}

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

function CreateAgent({ setAgentCreated }: CreateAgentProps) {
  const [branches, setBranches] = useState([
    { id: "", name: "", createdAt: "", modifiedAt: "" },
  ]);

  const notifyAgentCreated = () =>
    toast.success("Agent creation success.", {
      duration: 3000,
      position: "bottom-center",
    });

  const notifyAgentCreationError = (err: string) =>
    toast.error(`Agent creation error. \n ${err}`, {
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
      .catch((err) => {
        notifyAgentCreationError(err.response.data.message);
      });
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <IoAdd className="mr-2 h-4 w-4" />
            Add
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Agent</DialogTitle>
          </DialogHeader>

          <Formik
            initialValues={{
              username: "",
              phone: "",
              email: "",
              status: undefined,
              password: "",
              branchId: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleCreateAgent(values);
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className={"py-2 "}>
                  <div className="w-full py-2">
                    <Input
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

                  <div className="w-full py-2">
                    <Input
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

                  <div className="w-full py-2">
                    <Input
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

                  <div className="my-2 flex flex-col gap-4 sm:flex-row">
                    <div className="w-full">
                      {/* Status */}
                      <Select
                        name="status"
                        defaultValue={formik.values.status}
                        onOpenChange={(open) => {
                          if (!open) formik.setFieldTouched("status");
                        }}
                        onValueChange={(value) => {
                          formik.setFieldValue("status", value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Agent Status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value={UserStatusEnum.ACTIVE}>
                              active
                            </SelectItem>
                            <SelectItem value={UserStatusEnum.INACTIVE}>
                              inactive
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                        {formik.touched.status && formik.errors.status && (
                          <div className="px-2 text-xs text-red-600 md:px-8">
                            {formik.errors.status}
                          </div>
                        )}
                      </Select>
                    </div>

                    <div className="w-full">
                      {/* BranchId */}
                      <Select
                        name="branchId"
                        value={formik.values.branchId}
                        onOpenChange={(open) => {
                          if (!open) formik.setFieldTouched("branchId");
                        }}
                        onValueChange={(value) =>
                          formik.setFieldValue("branchId", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Branches</SelectLabel>

                            {branches && (
                              <>
                                {branches.map((branch) => (
                                  <SelectItem
                                    value={
                                      branch.id !== ""
                                        ? branch.id
                                        : "empty value"
                                    }
                                  >
                                    {branch.name}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {formik.touched.branchId && formik.errors.branchId ? (
                        <div className="px-2 text-xs text-red-600 md:px-8">
                          {formik.errors.branchId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* password */}
                  <Input
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

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <div className="my-2 flex w-full flex-row justify-between gap-1">
                        <Button
                          type={"button"}
                          variant={"destructive"}
                          // onClick={() => setCreateAgentFormOpen(false)}
                          className="w-full"
                        >
                          Close
                        </Button>

                        <Button
                          type={"submit"}
                          disabled={formik.isSubmitting}
                          className="w-full"
                        >
                          Create
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
    </>
  );
}

export default CreateAgent;
