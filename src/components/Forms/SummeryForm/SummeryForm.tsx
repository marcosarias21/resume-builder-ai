import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card"
import { useForm } from "react-hook-form"
import { summarySchema } from "@/schemas/formsSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDataStore } from "@/store/dataStore"
import { Button } from "@/components/ui/button"

const SummeryForm = () => {
  const { saveData, data } = useDataStore()
  console.log(data)
  const { register, handleSubmit  } = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema)
  })

  const onSubmit = (value: z.infer<typeof summarySchema>) => {
    console.log(value)
    saveData(value)
  }

  return (
      <div className='min-h-[50%] w-full bg-white border-1 border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 min-h-[100%]'>             
          <div>
            <div className="flex justify-between items-center my-4">
              <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-700 dark:text-gray-300">Add your Summery</label>
              <div className="flex gap-2 items-center">
                <button className="border-1 border-purple-500 rounded px-4 py-2 text-purple-500 font-bold hover:bg-purple-500 hover:text-white">Generate from AI</button>
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer border-1 border-black/40 px-3 py-1 rounded-full">?</HoverCardTrigger>
                  <HoverCardContent side="right" className="ml-2 rounded-3xl bg-white border border-gray-200 text-gray-700 p-5 shadow-lg">
                    <p className="font-bold">Let AI create your summary!</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
              <textarea id="message" className="block w-full min-h-52 p-3 text-sm text-gray-900 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-black-200 focus:border-transparent focus:outline-none dark:text-white dark:placeholder-gray-400 " placeholder="Text summery..." {...register('summery')} required />
          </div>              
          <div className="text-end mt-20">
            <Button type="submit" className="text-white text-lg bg-purple-500" size={"lg"}>Save</Button>
          </div>
        </form>
      </div>
  )
}

export default SummeryForm