import { useForm } from "react-hook-form";
import { personalInfoSchema } from "../../../schemas/formsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import { useDataStore } from "@/store/dataStore";
import { Asterisk, MoveRight } from "lucide-react";

const PersonalInfoForm = () => {
  const { saveData } = useDataStore();

  const { register, handleSubmit, formState: { isValid, errors }} = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
  })

  const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    saveData(values);
    alert("Datos guardados correctamente!")
  }

  return (
    <div className="min-h-[60%] bg-white border-1 border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-lg rounded-lg p-6 lg:p-10 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:grid-cols-2 gap-6 w-full">
        <div className="h-full grid grid-cols-2 gap-3">
          <div className="mt-4">
            <label className="flex items-center text-md font-bold text-gray-700 dark:text-neutral-200" htmlFor="firstName">First Name <span><Asterisk className="text-red-500" size={14} /></span></label>
            <div className="mt-1">
              <input className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400" placeholder="Marcos" type="text" {...register("firstName", { required: true })} />
              {errors.firstName &&<p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center text-md font-bold text-gray-700 dark:text-neutral-200" htmlFor="lastName">Last Name <span><Asterisk className="text-red-500" size={14} /></span>  </label>
            <div className="mt-1">
              <input className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400" placeholder="Arias" type="text" {...register("lastName", { required: true })} />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
          </div>
          <div className="mt-2">
            <label className="flex items-center text-md font-bold text-gray-700 dark:text-neutral-200" htmlFor="email">Email <span><Asterisk className="text-red-500" size={14} /></span>
            </label>
            <div className="mt-1">
              <input autoComplete="email" className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400" placeholder="example@example.com" type="email" {...register("email", { required: true })}/>
              {errors.email &&<p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-md font-bold text-gray-700 dark:text-neutral-200" htmlFor="phone">
              Phone Number (Optional)
            </label>
            <div className="mt-1">
              <input
                className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                placeholder="+1-000-000-0000"
                type="text"
                {...register("phone")}
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="flex items-center text-md font-bold text-gray-700 dark:text-neutral-200" htmlFor="jobTitle">Job Title<span><Asterisk className="text-red-500" size={14} /></span></label>
            <div className="mt-1">
              <input className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400" placeholder="Eg: Engineer Front End" type="text" {...register("jobTitle", { required: true })} />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label className="flex items-center text-md font-bold text-gray-700 dark:text-neutral-200" htmlFor="location">Location<span><Asterisk className="text-red-500" size={14} /></span></label>
            <div className="mt-1">
              <input
                className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                placeholder="City, Country"
                type="text"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-md font-bold text-gray-700 dark:text-neutral-200" htmlFor="address">
              Address (Optional)
            </label>
            <div className="mt-1">
              <input
                className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                placeholder="Address, Number"
                type="text"
                {...register("address")}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-end justify-center">
          <div className="text-center">
            <Button className="bg-green-400 text-sm font-medium" size={"sm"} type="submit" disabled={!isValid}>
              <MoveRight /> Save & Continue
            </Button>
          </div>
          <div className="text-center">
            <p className="text-xs text-amber-400">Make sure you saved before continue</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;