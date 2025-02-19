import { useForm } from "react-hook-form"
import { personalInfoSchema } from "../../schemas/formsSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../ui/button"
import { useDataStore } from "@/store/dataStore"

const PersonalInfoForm = () => {
  const { saveData, data } = useDataStore()
  const { register, handleSubmit } = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema)
  })
  
  const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    saveData(values)
  }

  return (
        <div className='min-h-[50%] bg-white border-1 border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10 w-full'>
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full'>
            <div>
              <div className='mt-4'>
                <label
                  className='block text-lg font-bold text-gray-700 dark:text-neutral-200'
                  htmlFor='firstName'
                >
                  First Name
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    placeholder='Marcos'
                    type='text'
                    {...register('firstName')}
                    required
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  className='block text-lg font-bold text-gray-700 dark:text-neutral-200'
                  htmlFor='email'
                >
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    autoComplete='email'
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    id='email'
                    placeholder='example@example.com'
                    type='email'
                    {...register('email')}
                    required
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  className='block text-lg font-bold text-gray-700 dark:text-neutral-200'
                  htmlFor='phone'
                >
                  Phone Number (Optional)
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    {...register('phone')}
                    required
                    placeholder='+1-000-000-0000'
                    type='tel'
                  />
                </div>
              </div>  
            </div>
            <div>
            <div className='mt-4'>
                <label
                  className='block text-lg font-bold text-gray-700 dark:text-neutral-200'
                  htmlFor='portfolio-link'
                >
                  Last Name
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    {...register('lastName')}
                    required
                    placeholder='Arias'
                    type='text'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  className='block text-lg font-bold text-gray-700 dark:text-neutral-200'
                  htmlFor='location'
                >
                  Location
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    placeholder='City, Country'
                    {...register('location')}
                    required
                    type='text'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  className='block text-lg font-bold text-gray-700 dark:text-neutral-200'
                  htmlFor='location'
                >
                  Address (Optional)
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    placeholder='Address, Number'
                    {...register('address')}
                    type='text'
                  />
                </div>
              </div>
              <div className="text-end mt-20">
                <Button className="bg-purple-500 text-lg font-bold" size={"lg"} type="submit">Save</Button>  
              </div>
            </div>
          </form>
        </div>
  )
}

export default PersonalInfoForm