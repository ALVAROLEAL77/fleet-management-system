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
import { FaMoneyBills } from "react-icons/fa6";
const Update = ({ id, refetch }) => {
  const [value, setValue] = useState();
  const get = () => {
    if (id != undefined) {
      fetch(process.env.NEXT_PUBLIC_APP_URL + `api/expense/${id}`, {
        next: { revalidate: 0 },
      })
        .then((res) => res.json())
        .then((res) => setValue(res));
    }
  };

  const initialValues = value
    ? {
        ...value,
      }
    : {
        vehicleID: "",
        expenseType: "",
        expenseDate: "",
        amount: "",
        description: "",
      };
  const onSubmit = (value, id) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/expense/${id}`, {
      method: "put",
      body: JSON.stringify(value),
      next: { revalidate: 0 },
      headers: { "Content-Types": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => toast.success(res.message));
  };
  return (
    <>
      <Dialog onOpenChange={refetch}>
        <DialogTrigger onClick={get}>
          <PiRecycleDuotone className="text-green-800  text-2xl cursor-pointer" />
        </DialogTrigger>
        {value && (
          <DialogContent className="min-w-[850px] drop-shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-rock text-primary">
                Update Expense
              </DialogTitle>
              <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
                <FaMoneyBills className={`text-6xl text-secondary m-10`} />

                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    vehicleID: Yup.number().required("Vehicle ID is required"),
                    expenseType: Yup.string().required(
                      "Expense Type is required"
                    ),
                    expenseDate: Yup.date().required(
                      "Expense Date is required"
                    ),
                    amount: Yup.number().required("Amount is required"),
                    description: Yup.string().required(
                      "Description is required"
                    ),
                  })}
                  onSubmit={(values) => {
                    // Optionally, you can add icons for expense-related attributes here
                    values = {
                      ...values,
                    };
                    onSubmit(values, id);
                  }}
                >
                  <Form className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                      <div className="m-3 h-20 w-48">
                        <label>Vehicle ID</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="vehicleID"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="vehicleID"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Expense Type</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="expenseType"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="expenseType"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Expense Date</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="date"
                          name="expenseDate"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="expenseDate"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Amount</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="amount"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="amount"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Description</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="description"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="description"
                          component="div"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                    >
                      <FaMoneyBills className={`text-xl text-secondary`} />
                      <PiRecycleDuotone className="text-green-800  text-2xl cursor-pointer" />
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
