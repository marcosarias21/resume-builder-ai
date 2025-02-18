const SummeryForm = () => {
  return (
        <div className='mt-12 relative'>
          <div className='bg-white border-1 border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
            <form className='gap-6'>             
              <div>
                <h2 className="text-2xl font-bold">Summery</h2>
                <div className="flex justify-between items-center my-4">
                  <label htmlFor="message" className="block mb-2 text-md font-medium text-gray-700 dark:text-gray-300">Add Summery</label>
                  <button className="border-1 border-red-500 rounded px-4 py-2 text-red-500 font-bold hover:bg-red-500 hover:text-white">Generate from AI</button>
                </div>
                  <textarea id="message" className="block w-full p-3 text-sm text-gray-900 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-black-200 focus:border-transparent focus:outline-none dark:text-white dark:placeholder-gray-400 " placeholder="Text summery..." required />
              </div>              
            </form>
            <div className="w-full text-end mt-2">
              <button className="border-1 border-red-500 px-4 py-2 rounded text-white bg-red-500">Save</button>
            </div>
          </div>
        </div>
  )
}

export default SummeryForm