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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiSolidBookContent } from "react-icons/bi";
import { format } from "date-fns";
import Multiselect from "multiselect-react-dropdown";
import Search from "../_components/search";

const Update = ({ id, refetch }) => {
  const [selectedStart, setSelectedStart] = useState();
  const [selectedEnd, setSelectedEnd] = useState();
  const [value, setValue] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/customer")
      .then((res) => res.json())
      .then((res) => {
        setOptions(
          res.map((customer) => ({
            value: customer.id,
            label: `${customer.contactPerson} - ${customer.customerName}`,

            ...customer,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);
  const get = () => {
    if (id != undefined) {
      fetch(process.env.NEXT_PUBLIC_APP_URL + `api/booking/${id}`, {
        next: { revalidate: 0 },
      })
        .then((res) => res.json())
        .then((res) => {
          setValue(res);
          setSelectedOptions([
            {
              value: res.customerId,
              label: `${res.Customer.contactPerson} - ${res.Customer.customerName}`,

              ...customer,
            },
          ]);
        });
    }
  };

  const initialValues = value && {
    ...value,
    bookingDate: value
      ? format(new Date(value.bookingDate), "yyyy-MM-dd'T'HH:mm")
      : "",
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
          <DialogContent className="min-w-[650px] drop-shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-rock text-primary">
                Update Vehicle
              </DialogTitle>
              <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
                <BiSolidBookContent
                  className={`text-6xl text-secondary m-10 drop-shadow-[5px_20px_30px_rgba(82,109,130,1)]`}
                />

                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    bookingDate: Yup.date().required(
                      "Booking Date is required"
                    ),
                    startLocationName: Yup.string().required(
                      "Start Location is required"
                    ),
                    endLocationName: Yup.string().required(
                      "End Location is required"
                    ),
                    tripPurpose: Yup.string().required(
                      "Trip Purpose is required"
                    ),
                    status: Yup.string().required("Status is required"),
                  })}
                  onSubmit={(values) => {
                    values["startLocation"] =
                      selectedStart !== undefined &&
                      selectedStart.lat + ", " + selectedStart.lng;
                    values["endLocation"] =
                      selectedEnd !== undefined &&
                      selectedEnd.lat + ", " + selectedEnd.lng;
                    values["customerId"] = selectedOptions[0].id;
                    onSubmit(values, id);
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
                    <Form className="flex flex-col justify-center items-center">
                      <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                        <div className="m-3 h-20 w-48">
                          <label>Customer</label>
                          <Multiselect
                            options={options}
                            selectedValues={selectedOptions}
                            onSelect={setSelectedOptions}
                            onRemove={setSelectedOptions}
                            placeholder="Select Customer"
                            displayValue="label"
                            className="font-rock font-thin tracking-wider"
                            selectionLimit={1}
                            style={{
                              multiselectContainer: {
                                borderRadius: "2px",
                                color: "#526D82",
                              },
                              chips: {
                                backgroundColor: "#526D82",
                                fontSize: "0.5em",
                                letterSpacing: "3px",
                              },
                              searchBox: {
                                borderRadius: "7px",
                                border: "1.5px #526D82 double",
                                letterSpacing: "10px",
                                padding: "7px",
                              },
                              option: {
                                borderRadius: "12px",
                                border: "2px #000 double",
                                backgroundColor: "#526D82",
                                color: "#000",
                              },
                              highlightOption: {
                                backgroundColor: "#000",
                              },
                              notFound: {
                                fontSize: "16px",
                                borderRadius: "12px",
                                border: "2px #526D82 double",
                                backgroundColor: "#000",
                              },
                              optionContainer: {
                                backgroundColor: "#000",
                              },
                            }}
                          />
                          <p className="text-red-900 text-[10px]">
                            {!selectedOptions[0] && "Select a Customer"}
                          </p>
                        </div>

                        <div className="m-3 h-20 w-48">
                          <label>Booking Date</label>
                          <Field
                            className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                            type="datetime-local"
                            name="bookingDate"
                          />
                          <ErrorMessage
                            className="text-red-900 text-[10px]"
                            name="bookingDate"
                            component="div"
                          />
                        </div>
                        <div className="m-3 h-20 w-48 z-30">
                          <label>Start Location </label>
                          <Search
                            setFieldValue={setFieldValue}
                            setSelected={setSelectedStart}
                            name={"startLocationName"}
                          />
                          <ErrorMessage
                            className="text-red-900 text-[10px]"
                            name="startLocationName"
                            component="div"
                          />
                        </div>

                        <div className="m-3 h-20 w-48 z-30">
                          <label>End Location</label>
                          <Search
                            setFieldValue={setFieldValue}
                            setSelected={setSelectedEnd}
                            name={"endLocationName"}
                          />
                          <ErrorMessage
                            className="text-red-900 text-[10px]"
                            name="endLocationName"
                            component="div"
                          />
                        </div>
                        <div className="m-3 h-20 w-48">
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
                        <div className="m-3 h-20 w-48">
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
                        <PiRecycleDuotone className="text-green-800  text-2xl cursor-pointer" />
                      </Button>{" "}
                    </Form>
                  )}
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
