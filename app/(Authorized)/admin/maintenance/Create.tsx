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
import { BiSolidCarMechanic } from "react-icons/bi";
const Create = ({ refetch }) => {
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/maintenancerecord`, {
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
          <BiSolidCarMechanic className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[650px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Maintenance Record
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <BiSolidCarMechanic className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                maintenanceType: "",
                maintenanceDate: "",
                maintenanceCost: "",
                notes: "",
                vehicleId: "",
              }}
              validationSchema={Yup.object().shape({
                maintenanceType: Yup.string().required(
                  "Maintenance Type is required"
                ),
                maintenanceDate: Yup.date().required(
                  "Maintenance Date is required"
                ),
                maintenanceCost: Yup.number().required(
                  "Maintenance Cost is required"
                ),
                notes: Yup.string(),
                vehicleId: Yup.string().required("Vehicle ID Date is required"),
              })}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
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
                    <label>Maintenance Type</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="maintenanceType"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="maintenanceType"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Maintenance Date</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="date"
                      name="maintenanceDate"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="maintenanceDate"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Maintenance Cost</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="number"
                      name="maintenanceCost"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="maintenanceCost"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Notes</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="notes"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="notes"
                      component="div"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                >
                  <BiSolidCarMechanic className={`text-xl text-secondary`} />
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
