"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../_components/ui/dialog";
import * as Yup from "yup";
import { Button } from "../_components/ui/button";
import { PiPlusSquareDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import { BsFillFuelPumpFill } from "react-icons/bs";
import Multiselect from "multiselect-react-dropdown";
import { format } from "date-fns";
import { useEffect, useState } from "react";
const Create = ({ refetch }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle")
      .then((res) => res.json())
      .then((res) => {
        console.log("Vehicle Data:", res);
        setOptions(
          res.map((vehicle) => ({
            value: vehicle.id,
            label: `${vehicle.vehicleModel}: ${vehicle.vehicleLicensePlate}`,

            ...vehicle,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/fuelingrecord`, {
      method: "post",
      body: JSON.stringify(value),
      headers: { "Content-Types": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (value["add"]) {
          const capitalize = value["fuelType"].split("");
          capitalize.unshift(capitalize.shift().toUpperCase());
          const expense = {
            vehicleId: value["vehicleId"],
            expenseType: "Fuel Bill",
            expenseDate: value["fuelingDate"],
            amount: value["totalCost"],
            description: `${value["gallonsFilled"]} ${capitalize.join(
              ""
            )} gallons refill for The ${
              selectedOptions[0].vehicleLicensePlate
            }`,
          };
          fetch(
            process.env.NEXT_PUBLIC_APP_URL + `api/expense/${res.result.id}`,
            {
              method: "post",
              body: JSON.stringify(expense),
              headers: { "Content-Types": "application/json" },
            }
          );
        }
        toast.success(res.message);
      });
  };
  return (
    <Dialog onOpenChange={refetch}>
      <DialogTrigger>
        <Button className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2">
          <BsFillFuelPumpFill className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[650px] min-w-full drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Fuel Record
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  md:flex-nowrap flex-wrap w-fit">
            <BsFillFuelPumpFill
              className={`text-6xl text-secondary m-10 drop-shadow-[5px_20px_30px_rgba(82,109,130,1)]`}
            />

            <Formik
              initialValues={{
                fuelingDate: "",
                fuelingLocation: "",
                fuelType: "",
                gallonsFilled: "",
                totalCost: "",
                add: true,
              }}
              validationSchema={Yup.object().shape({
                fuelingDate: Yup.date().required("Fueling Date is required"),
                fuelingLocation: Yup.string().required(
                  "Fueling Location is required"
                ),
                fuelType: Yup.string().required("Fuel Type is required"),
                gallonsFilled: Yup.number().required(
                  "Gallons Filled is required"
                ),
                totalCost: Yup.number().required("Total Cost is required"),
                add: Yup.boolean(),
              })}
              onSubmit={(values) => {
                values["vehicleId"] = selectedOptions[0].id;
                console.log(values);
                onSubmit(values);
              }}
            >
              {({ setFieldValue, values }) => (
                <Form className="flex flex-col justify-center items-center">
                  <div className="flex justify-between items-center m-3 w-48">
                    <label
                      className="text-xs font-thin capitalize cursor-pointer"
                      htmlFor="flexSwitchChecked"
                    >
                      Add to expenses?
                    </label>
                    <input
                      className="drop-shadow-[5px_20px_30px_rgba(82,109,130,1)] mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-gray-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-secondary before:content-[''] after:absolute 
                    after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-gray-500 after:drop-shadow-[5px_20px_30px_rgba(82,109,130,1)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-secondary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-secondary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-secondary checked:focus:bg-secondary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchChecked"
                      onChange={(e) => setFieldValue("add", e.target.checked)}
                      checked={values.add}
                      name="add"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="add"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label>Fueling Date</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                        type="datetime-local"
                        name="fuelingDate"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="fuelingDate"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label>Fueling Location</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                        type="text"
                        name="fuelingLocation"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="fuelingLocation"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label>Fuel Type</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                        type="text"
                        name="fuelType"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="fuelType"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label>Vehicle</label>
                      <Multiselect
                        options={options}
                        selectedValues={selectedOptions}
                        onSelect={setSelectedOptions}
                        onRemove={setSelectedOptions}
                        placeholder="Select Vehicle Plate"
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
                        {!selectedOptions[0] && "Select a Vehicle"}
                      </p>
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label>Gallons Filled</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                        type="number"
                        name="gallonsFilled"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="gallonsFilled"
                        component="div"
                      />
                    </div>
                    <div className="md:m-3 h-20 w-48">
                      {" "}
                      <label>Total Cost</label>
                      <Field
                        className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                        type="number"
                        name="totalCost"
                      />
                      <ErrorMessage
                        className="text-red-900 text-[10px]"
                        name="totalCost"
                        component="div"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                  >
                    <BsFillFuelPumpFill className={`text-xl text-secondary`} />
                    <PiPlusSquareDuotone className="text-lg text-secondary" />
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
