const FormData = () => {
  return (
    <>
    <div className='relative'>
      <div className='relative z-10'> 
        <div className='mt-12 relative'>
          <div className='bg-white dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
            <form className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <div className='mt-4'>
                  <label
                    className='block text-sm font-medium text-gray-700 dark:text-neutral-200'
                    htmlFor='full-name'
                  >
                    Full Name
                  </label>
                  <div className='mt-1'>
                    <input
                      className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                      id='full-name'
                      name='full-name'
                      placeholder='John Doe'
                      type='text'
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
                      name='email'
                      placeholder='example@example.com'
                      type='email'
                    />
                  </div>
                </div>
                <div className='mt-4'>
                  <label
                    className='block text-sm font-medium text-gray-700 dark:text-neutral-200'
                    htmlFor='portfolio-link'
                  >
                    Portfolio Link
                  </label>
                  <div className='mt-1'>
                    <input
                      className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                      id='portfolio-link'
                      name='portfolio-link'
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
                      id='phone'
                      name='phone'
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
                      id='location'
                      name='location'
                      placeholder='City, Country'
                      type='text'
                    />
                  </div>
                </div>
              </div>  
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default FormData