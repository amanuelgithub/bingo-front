import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import TextField from "./components/form/TextField";
import Button from "./components/form/Button";
import API from "./config/api";
import * as yup from "yup";
import { AuthContext } from "./state/contexts/auth-context";
import { AuthActionTypes } from "./state/actions/auth-actions";
import { storeAuthUser } from "./util/localstorage";
import { UserRoleEnum } from "./models/IUser";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email is not a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

function SignIn() {
  const [authError, setAuthError] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignIn = (values: any) => {
    API.post("/auth/signin", values)
      .then((result) => {
        const data = result.data;

        console.log("auth data: ", data);

        dispatch({
          type: AuthActionTypes.LOGIN,
          id: data.id,
          username: data.username,
          phone: data.phone,
          email: data.email,
          isEmailVerified: data.isEmailVerified,
          role: data.role,
          status: data.status,

          branchId: undefined,

          access_token: data.access_token,
          isLoggedIn: true,
        });

        storeAuthUser({
          id: data.id,
          username: data.username,
          phone: data.phone,
          email: data.email,
          isEmailVerified: data.isEmailVerified,
          role: data.role,
          status: data.status,
          branchId: undefined,
          accessToken: data.access_token,
          isLoggedIn: true,
        });

        if (data.role === UserRoleEnum.SUPER_ADMIN) {
          navigate("/admin-dashboard");
        } else if (data.role === UserRoleEnum.AGENT) {
          navigate("/agent-dashboard");
        } else if (data.role === UserRoleEnum.CASHIER) {
          navigate("/cashier-dashboard");
        }
      })
      .catch((err) => {
        console.log("Error: ", err.response.data);
        setAuthError(true);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (authError) setAuthError(false);
    }, 3000);
  }, [authError]);

  return (
    <div className="h-screen md:flex md:flex-row md:justify-center md:items-center">
      <div className="h-1/2 w-full md:w-1/2 flex flex-col justify-center md:h-screen bg-black">
        <img src="/images/bingo-signin-img.jpg" alt="bingo-signin-img" />
      </div>

      <div className="h-1/2 md:w-1/2 bg-gray-50 md:h-screen flex flex-col justify-center items-center -mt-16 md:mt-0">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleSignIn(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-2 w-full p-4 md:p-20"
            >
              <h1 className="font-semibold text-3xl text-center">
                SignIn to Virtual Bingo
              </h1>

              {authError && (
                <p className="text-red-500 text-center">
                  authentication error!
                </p>
              )}

              <TextField
                id="email"
                type={"email"}
                {...formik.getFieldProps("email")}
                placeholder={"Email"}
              />
              <TextField
                id="password"
                type={"password"}
                placeholder={"Password"}
                {...formik.getFieldProps("password")}
              />

              <Button type={"submit"} className={"w-full"}>
                SignIn
              </Button>

              {/* <div>
                <pre>{JSON.stringify(formik.values, null, 2)}</pre>
              </div> */}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignIn;
