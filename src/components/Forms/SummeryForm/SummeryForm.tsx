import { useForm } from "react-hook-form"
import { summarySchema } from "@/schemas/formsSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDataStore } from "@/store/dataStore"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Spinner } from '../../Spinner'
import { generateDescription } from "@/serivces/AIGenerativeText"

const SummeryForm = () => {
  const { saveData, data } = useDataStore()
  const [loading, setLoading] = useState<boolean>(false)
  const prompt = `Generame solo un about me como si fuera un curriculum de acuerdo solo a este dato: ${data?.jobTitle}`
  const [text, setText] = useState<string | undefined>("")
  const { register, handleSubmit, setValue  } = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema)
  })
  
  const onSubmit = () => {
    saveData({ summery: text })
  }

  const generateText = async (prompt: string) => {
    setLoading(true)
    const data = await generateDescription(prompt)
    if (data) {
      setLoading(false)
      setText(data)
      setValue("summery", data)
     }
  }

  return (
      <div className='min-h-[50%] w-full bg-white border-1 border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 min-h-[100%]'>             
          <div>
            <div className="flex justify-between items-center my-4">
              <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-700 dark:text-gray-300">Add your Summery</label>
              <div className="flex gap-2 items-center">
                <button onClick={() => generateText(prompt)} className="border-1 flex border-purple-500 rounded px-4 py-2 text-purple-500 font-bold hover:bg-purple-500 hover:text-white">Generate from AI {loading === true && <Spinner />}</button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="border-1 border-black/20 text-black/40 px-2 py-1 rounded-full">?</TooltipTrigger>
                    <TooltipContent className="bg-purple-400">
                      <p className="text-sm">Lets AI create your summary</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            {loading ? (
            <div className="w-full min-h-52 p-3 rounded-md border border-gray"><p className="animate-pulse text-gray-500">Generando texto...</p></div>
            ) : (
            <textarea
              id="message"
              className="block w-full min-h-52 p-3 text-sm text-gray-900 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-black-200 focus:border-transparent focus:outline-none dark:text-white dark:placeholder-gray-400"
              placeholder="Text summary..."
              {...register("summery")}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          )}
          </div>              
          <div className="text-end mt-20">
            <Button type="submit" className="text-white text-lg bg-purple-500" size={"lg"}>Save</Button>
          </div>
        </form>
      </div>
  )
}

export default SummeryForm