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
import { PiCarFill, PiPersonFill, PiPlusSquareDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import Search from "../_components/search";
import { useState } from "react";
const Create = ({ refetch }) => {
  const [selected, setSelected] = useState();

  const onSubmit = (value) => {
    console.log(value);
    fetch(process.env.NEXT_PUBLIC_APP_URL + `vehicle`, {
      method: "post",
      body: JSON.stringify(value),
      headers: { "Content-Types": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => toast.success(res.message));
  };
  return (
    <Dialog onOpenChange={refetch}>
      <DialogTrigger>
        <Button className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2">
          <PiCarFill className={`text-xl text-primary`} />
          <PiPlusSquareDuotone className="text-lg text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[650px] min-w-full drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Vehicle
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  md:flex-nowrap flex-wrap w-fit">
            <PiCarFill
              className={`text-6xl text-primary m-10 drop-shadow-[5px_20px_30px_rgba(82,109,130,1)]`}
            />

            <Formik
              initialValues={{
                vehicleType: "",
                vehicleMake: "",
                vehicleModel: "",
                vehicleLicensePlate: "",
                currentLocation: "",
                status: "",
              }}
              validationSchema={Yup.object().shape({
                vehicleType: Yup.string().required("Vehicle Type is required"),
                vehicleMake: Yup.string().required("Vehicle Make is required"),
                vehicleModel: Yup.string().required(
                  "Vehicle Model is required"
                ),
                vehicleLicensePlate: Yup.string().required(
                  "License Plate is required"
                ),
                currentLocationName: Yup.string().required(
                  "Location is required"
                ),

                status: Yup.string().required("Status is required"),
              })}
              onSubmit={(values) => {
                values["currentLocation"] =
                  selected !== undefined && selected.lat + ", " + selected.lng;
                onSubmit(values);
              }}
            >
              {({
                // values,
                // errors,
                // touched,
                // handleChange,
                // handleBlur,
                setFieldValue,
              }) => (
                <Form className="flex flex-col justify-center items-center flex-wrap">
                  <div className="flex flex-col justify-start items-start flex-wrap  h-[320px]">
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label className="text-primary">Vehicle Type</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary"
                        type="text"
                        name="vehicleType"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="vehicleType"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label className="text-primary">Vehicle Make</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary "
                        type="text"
                        name="vehicleMake"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="vehicleMake"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label className="text-primary">Vehicle Model</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary "
                        type="text"
                        name="vehicleModel"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="vehicleModel"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label className="text-primary">
                        Vehicle License Plate
                      </label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary "
                        type="text"
                        name="vehicleLicensePlate"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="vehicleLicensePlate"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48 z-30">
                      <label className="text-primary">Current Location</label>
                      <Search
                        setSelected={setSelected}
                        setFieldValue={setFieldValue}
                        name={"currentLocationName"}
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="currentLocation"
                        component="div"
                      />
                    </div>

                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label className="text-primary">Status</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background text-primary "
                        name="status"
                        component="select"
                      >
                        <option value="">status</option>
                        <option value="active">Active</option>
                        <option value="in-maintenance">In Maintenance</option>
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
                    <PiCarFill className={`text-xl text-primary`} />
                    <PiPlusSquareDuotone className="text-lg text-primary" />
                  </Button>{" "}
                </Form>
              )}
            </Formik>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
