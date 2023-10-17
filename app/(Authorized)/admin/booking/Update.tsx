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
import { BiSolidBookContent } from "react-icons/bi";
const Update = ({ id, refetch }) => {
  const [value, setValue] = useState();
  const get = () => {
    if (id != undefined) {
      fetch(process.env.NEXT_PUBLIC_APP_URL + `api/booking/${id}`, {
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
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/booking/${id}`, {
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
                Update Driver
              </DialogTitle>
              <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
                <BiSolidBookContent
                  className={`text-6xl text-secondary m-10`}
                />

                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    customerID: Yup.string().required(
                      "Customer ID is required"
                    ),
                    bookingDate: Yup.date().required(
                      "Booking Date is required"
                    ),
                    startLocationLatitude: Yup.number().required(
                      "Start Location Latitude is required"
                    ),
                    startLocationLongitude: Yup.number().required(
                      "Start Location Longitude is required"
                    ),
                    endLocationLatitude: Yup.number().required(
                      "End Location Latitude is required"
                    ),
                    endLocationLongitude: Yup.number().required(
                      "End Location Longitude is required"
                    ),
                    tripPurpose: Yup.string().required(
                      "Trip Purpose is required"
                    ),
                    status: Yup.string().required("Status is required"),
                  })}
                  onSubmit={(values) => {
                    values = {
                      ...values,
                    };
                    onSubmit(values, id);
                  }}
                >
                  <Form className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                      <div className="m-3 h-20">
                        <label>Customer ID</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="customerID"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="customerID"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20">
                        <label>Booking Date</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="date"
                          name="bookingDate"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="bookingDate"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20">
                        <label>Start Location Latitude</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="startLocationLatitude"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="startLocationLatitude"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20">
                        <label>Start Location Longitude</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="startLocationLongitude"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="startLocationLongitude"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20">
                        <label>End Location Latitude</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="endLocationLatitude"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="endLocationLatitude"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20">
                        <label>End Location Longitude</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="endLocationLongitude"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="endLocationLongitude"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20">
                        <label>Trip Purpose</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="tripPurpose"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="tripPurpose"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20">
                        <label>Status</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          name="status"
                          component="select"
                        >
                          <option value="">Select status</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                        </Field>
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="status"
                          component="div"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                    >
                      <BiSolidBookContent
                        className={`text-xl text-secondary`}
                      />
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
