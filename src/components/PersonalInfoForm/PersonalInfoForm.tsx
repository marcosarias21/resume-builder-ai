import { useForm } from "react-hook-form"
import { personalInfoSchema } from "../../schemas/formsSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const PersonalInfoForm = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema)
  })

  const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    console.log(values)
  }

  return (
        <div className='bg-white border-1 border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <div className='mt-4'>
                <label
                  className='block text-sm font-medium text-gray-700 dark:text-neutral-200'
                  htmlFor='firstName'
                >
                  Full Name
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    placeholder='John Doe'
                    type='text'
                    {...register('firstName')}
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  className='block text-sm font-medium text-gray-700 dark:text-neutral-200'
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
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  className='block text-sm font-medium text-gray-700 dark:text-neutral-200'
                  htmlFor='portfolio-link'
                >
                  Last Name
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    {...register('lastName')}
                    placeholder='http://example.com'
                    type='text'
                  />
                </div>
              </div>
            </div>
            <div>
              <div className='mt-4'>
                <label
                  className='block text-sm font-medium text-gray-700 dark:text-neutral-200'
                  htmlFor='phone'
                >
                  Phone Number (Optional)
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    {...register('phone')}
                    placeholder='+1-000-000-0000'
                    type='tel'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  className='block text-sm font-medium text-gray-700 dark:text-neutral-200'
                  htmlFor='location'
                >
                  Location (Optional)
                </label>
                <div className='mt-1'>
                  <input
                    className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                    placeholder='City, Country'
                    {...register('location')}
                    type='text'
                  />
                </div>
              </div>
            <div className="text-end w-full mt-20">
              <button className="bg-red-300 rounded border-1 border-gray-300 text-white py-1 px-4" type="submit">Save</button>  
            </div>
            </div>
          </form>
        </div>
  )
}

export default PersonalInfoForm