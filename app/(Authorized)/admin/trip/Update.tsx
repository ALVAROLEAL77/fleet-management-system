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
import { ImUserTie } from "react-icons/im";
import { AiFillCarryOut } from "react-icons/ai";
const Update = ({ id, refetch }) => {
  const [value, setValue] = useState();
  const get = () => {
    if (id != undefined) {
      fetch(process.env.NEXT_PUBLIC_APP_URL + `api/trip/${id}`, {
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
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/trip/${id}`, {
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
          <DialogContent className="min-w-[885px] drop-shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-rock text-primary">
                Update Trip
              </DialogTitle>
              <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
                <ImUserTie className={`text-6xl text-secondary m-10`} />

                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    vehicleID: Yup.string().required("Vehicle ID is required"),
                    driverID: Yup.string().required("Driver ID is required"),
                    customerID: Yup.string().required(
                      "Customer ID is required"
                    ),
                    startLocationLatitude: Yup.number().required(
                      "Start Latitude is required"
                    ),
                    startLocationLongitude: Yup.number().required(
                      "Start Longitude is required"
                    ),
                    endLocationLatitude: Yup.number().required(
                      "End Latitude is required"
                    ),
                    endLocationLongitude: Yup.number().required(
                      "End Longitude is required"
                    ),
                    startTime: Yup.date().required("Start Time is required"),
                    endTime: Yup.date().required("End Time is required"),
                    distanceTraveled: Yup.number().required(
                      "Distance Traveled is required"
                    ),
                    tripStatus: Yup.string().required(
                      "Trip Status is required"
                    ),
                  })}
                  onSubmit={(values) => {
                    // Optionally, you can add icons for trip-related attributes here
                    onSubmit(values, id);
                  }}
                >
                  <Form className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-start items-start flex-wrap h-[450px]">
                      <div className="m-3 h-20 w-48">
                        <label>Vehicle ID</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="vehicleID"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="vehicleID"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Driver ID</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="driverID"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="driverID"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
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
                      <div className="m-3 h-20 w-48">
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
                      <div className="m-3 h-20 w-48">
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
                      <div className="m-3 h-20 w-48">
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
                      <div className="m-3 h-20 w-48">
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
                      <div className="m-3 h-20 w-48">
                        <label>Start Time</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="datetime-local"
                          name="startTime"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="startTime"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>End Time</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="datetime-local"
                          name="endTime"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="endTime"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Distance Traveled</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="distanceTraveled"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="distanceTraveled"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Trip Status</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          name="tripStatus"
                          component="select"
                        >
                          <option value="">Select status</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="canceled">Canceled</option>
                        </Field>
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="tripStatus"
                          component="div"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                    >
                      <AiFillCarryOut className={`text-xl text-secondary`} />
                      <PiRecycleDuotone className="text-green-800  text-xl cursor-pointer" />
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
