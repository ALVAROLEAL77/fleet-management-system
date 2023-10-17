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
import { toast } from "react-toastify";
import { ImUserTie } from "react-icons/im";
import { AiFillCarryOut } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
const Create = ({ refetch }) => {
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/fuelingrecord`, {
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
          <BsFillFuelPumpFill className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[885px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Fuel Record
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <BsFillFuelPumpFill className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                fuelingDate: "",
                fuelingLocation: "",
                fuelType: "",
                vehicleId: "",
                gallonsFilled: "",
                totalCost: "",
              }}
              validationSchema={Yup.object().shape({
                fuelingDate: Yup.date().required("Fueling Date is required"),
                fuelingLocation: Yup.string().required(
                  "Fueling Location is required"
                ),
                fuelType: Yup.string().required("Fuel Type is required"),
                vehicleId: Yup.string().required("Vehicle ID is required"),
                gallonsFilled: Yup.number().required(
                  "Gallons Filled is required"
                ),
                totalCost: Yup.number().required("Total Cost is required"),
              })}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                  <div className="m-3 h-20 w-48">
                    <label>Fueling Date</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="date"
                      name="fuelingDate"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="fuelingDate"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
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
                  <div className="m-3 h-20 w-48">
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
                  <div className="m-3 h-20 w-48">
                    <label>Vehicle ID</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="vehicleId"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="vehicleId"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
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
                  <div className="m-3 h-20 w-48">
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
            </Formik>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
