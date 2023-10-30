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
import Search from "../_components/search";
const Update = ({ id, refetch }) => {
  const [value, setValue] = useState();
  const [selected, setSelected] = useState();

  const get = () => {
    if (id != undefined) {
      fetch(process.env.NEXT_PUBLIC_APP_URL + `api/vehicle/${id}`, {
        next: { revalidate: 0 },
      })
        .then((res) => res.json())
        .then((res) => setValue(res));
    }
  };

  const initialValues = value && value;
  const onSubmit = (value, id) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/vehicle/${id}`, {
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
                Update Vehicle
              </DialogTitle>
              <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  md:flex-nowrap flex-wrap w-fit">
                <PiCarFill
                  className={`text-6xl text-secondary m-10 drop-shadow-[5px_20px_30px_rgba(82,109,130,1)]`}
                />

                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    vehicleType: Yup.string().required(
                      "Vehicle Type is required"
                    ),
                    vehicleMake: Yup.string().required(
                      "Vehicle Make is required"
                    ),
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
                      selected !== undefined &&
                      selected.lat + ", " + selected.lng;
                    console.log("js", values);
                    onSubmit(values, id);
                  }}
                >
                  {({
                    values,
                    // errors,
                    // touched,
                    // handleChange,
                    // handleBlur,
                    setFieldValue,
                  }) => {
                    console.log(values);
                    return (
                      <Form className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-start items-start flex-wrap  h-[320px]">
                          <div className="md:m-3 h-20 w-48">
                            {" "}
                            <label>Vehicle Type</label>
                            <Field
                              className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
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
                            <label>Vehicle Make</label>
                            <Field
                              className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
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
                            <label>Vehicle Model</label>
                            <Field
                              className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
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
                            <label>Vehicle License Plate</label>
                            <Field
                              className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
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
                            <label>Current Location</label>
                            <Search
                              setSelected={setSelected}
                              setFieldValue={setFieldValue}
                              name={"currentLocationName"}
                            />
                            <ErrorMessage
                              className="text-red-900 text-[10px]"
                              name="currentLocationName"
                              component="div"
                            />
                          </div>

                          <div className="md:m-3 h-20 w-48">
                            {" "}
                            <label>Status</label>
                            <Field
                              className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                              name="status"
                              component="select"
                            >
                              <option value="">status</option>
                              <option value="active">Active</option>
                              <option value="in-maintenance">
                                In Maintenance
                              </option>
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
                          <PiCarFill className={`text-xl text-secondary`} />
                          <PiPlusSquareDuotone className="text-lg text-secondary" />
                        </Button>{" "}
                      </Form>
                    );
                  }}
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
