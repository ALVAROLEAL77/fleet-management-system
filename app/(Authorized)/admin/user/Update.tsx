"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "../_components/ui/dialog";
import * as Yup from "yup";
import { Button } from "../_components/ui/button";
import {
  PiCarFill,
  PiPersonFill,
  PiPlusSquareDuotone,
  PiRecycleDuotone,
} from "react-icons/pi";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUserShield } from "react-icons/fa6";

const Update = ({ id, refetch }) => {
  const [value, setValue] = useState();
  const get = () => {
    if (id != undefined) {
      fetch(process.env.NEXT_PUBLIC_APP_URL + `user/${id}`, {
        next: { revalidate: 0 },
      })
        .then((res) => res.json())
        .then((res) => setValue(res));
    }
  };

  const initialValues = value && {
    ...value,
  };
  const onSubmit = (value, id) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `user/${id}`, {
      method: "put",
      body: JSON.stringify(value),
      next: { revalidate: 0 },
      headers: { "Content-Types": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => toast.success(res.message));
  };
  const oC = () => {
    refetch();
    get();
  };
  return (
    <>
      <Dialog onOpenChange={oC}>
        <DialogTrigger>
          <PiRecycleDuotone className="text-green-800  text-2xl cursor-pointer" />
        </DialogTrigger>
        {value && (
          <DialogContent className="md:min-w-[650px] min-w-full drop-shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-rock text-primary">
                Update User
              </DialogTitle>
              <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  md:flex-nowrap flex-wrap w-fit">
                <FaUserShield
                  className={`text-6xl text-primary m-10 drop-shadow-[5px_20px_30px_rgba(82,109,130,1)]`}
                />

                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    userRoleId: Yup.string().required("User Role is required"),
                    username: Yup.string().required("Username is required"),
                    password: Yup.string().required("Password is required"),
                    firstName: Yup.string().required("First Name is required"),
                    lastName: Yup.string().required("Last Name is required"),
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                  })}
                  onSubmit={(values) => {
                    onSubmit(values, id);
                  }}
                >
                  <Form className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                      <div className="md:m-3 h-20 w-48">
                        {" "}
                        <label className="text-primary">User Role</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary"
                          type="text"
                          name="userRoleId"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="userRoleId"
                          component="div"
                        />
                      </div>
                      <div className="md:m-3 h-20 w-48">
                        {" "}
                        <label className="text-primary">Username</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary"
                          type="text"
                          name="username"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="username"
                          component="div"
                        />
                      </div>
                      <div className="md:m-3 h-20 w-48">
                        {" "}
                        <label className="text-primary">Password</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary"
                          type="password"
                          name="password"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="password"
                          component="div"
                        />
                      </div>
                      <div className="md:m-3 h-20 w-48">
                        {" "}
                        <label className="text-primary">First Name</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary"
                          type="text"
                          name="firstName"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="firstName"
                          component="div"
                        />
                      </div>
                      <div className="md:m-3 h-20 w-48">
                        {" "}
                        <label className="text-primary">Last Name</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary"
                          type="text"
                          name="lastName"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="lastName"
                          component="div"
                        />
                      </div>
                      <div className="md:m-3 h-20 w-48">
                        {" "}
                        <label className="text-primary">Email</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary"
                          type="email"
                          name="email"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="email"
                          component="div"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                    >
                      <FaUserShield className={`text-xl text-primary`} />
                      <PiRecycleDuotone className="text-green-800  text-lg cursor-pointer" />
                    </Button>{" "}
                  </Form>
                </Formik>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Update;
