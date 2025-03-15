import { useForm } from "react-hook-form"
import { summarySchema } from "@/schemas/formsSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Summery, useDataStore } from "@/store/dataStore"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Spinner } from '../../Spinner'
import { generateDescription } from "@/serivces/AIGenerativeText"
import { Brain, MoveRightIcon, Save } from "lucide-react"
import { EXAMPLES_LINKS, EXAMPLES_NETWORK } from "@/helpers/examples"
import { useSectionsStore } from "@/store/sectionStore"

const SummeryForm = () => {
  const { saveData, data } = useDataStore()
  const { updateCurrentSection } = useSectionsStore()
  const [loading, setLoading] = useState<boolean>(false)
  const prompt = `Generate just an about me as if it were a resume based only on this data: ${data?.personalInfo?.jobTitle}`
  const [text, setText] = useState<string | undefined>("")
  let linksArray: string[] = (Array(3).fill(null))
  const { register, handleSubmit, setValue  } = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema),
  })
  
  const onSubmit = (values: z.infer<typeof summarySchema>) => {
    saveData({
      summery: {
        description: values.description || "",
        socialMedia: values.socialMedia
      }
    })
  }

  const generateText = async (prompt: string) => {
    setLoading(true)
    const dataAI = await generateDescription(prompt)
    if (dataAI) {
      setLoading(false)
      setText(dataAI)
      setValue("description", dataAI)
     }
  }

  useEffect(() => {
    if (data?.summery) {
      Object.keys(data.summery).forEach(key => 
        setValue(key as keyof Summery, data?.summery?.[key as keyof Summery])
      )
    }   
  }, [])

  return (
      <div className='min-h-[60%] w-full bg-white border-1 border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 max-h-[485px] overflow-y-auto custom-scrollbar pr-5'>             
          <div className="flex flex-col justify-center">
            <div className="flex flex-col">
              <div className="grid grid-cols-7 font-bold text-gray-700 mb-2">
                <div className="col-span-1">Site</div>
                <div className="col-span-3 text-center">
                  <h4>URL</h4>
                </div>
                <div className="col-span-3 text-center">
                  <h4>Text</h4>
                </div>
              </div>
              {linksArray?.map((_, index) => 
              <div key={index}>               
                <div className="grid grid-cols-7 mb-4 gap-4 items-center">
                  <div className="col-span-1">
                    <label className="text-md font-bold text-gray-700">{EXAMPLES_NETWORK[index]}</label>
                  </div>
                  <div className="col-span-3">
                    <input type="text" className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400" placeholder={`Enter your profile link. Eg: ${EXAMPLES_LINKS[index]}`} {...register(`socialMedia.${index}.link`)} />
                  </div>
                  <div className="col-span-3">
                    <input type="text" className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400" placeholder={`Enter text that will be shown in CV`} {...register(`socialMedia.${index}.text`)} />
                  </div>
                </div>
              </div>
              )}
            </div>
            <div className="flex justify-between items-center my-5">
              <div>
                <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-700 dark:text-gray-300">Add your Summery (Optional):</label>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => generateText(prompt)} className="text-dark border-1 text-white hover:text-white"><Brain size={"20"} /> Generate from AI {loading === true && <Spinner />}</Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="border-black/20 text-black/40">?</TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Lets AI create your summary</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            {loading ? (
            <div className="w-full min-h-40 p-3 rounded-md border border-gray"><p className="animate-pulse text-gray-400 text-sm font-medium">Generating text...</p></div>
            ) : (
            <textarea id="message" className="block w-full min-h-40 p-3 text-sm text-gray-900 rounded-md border font-medium border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-400 focus:border-transparent focus:outline-none dark:text-white dark:placeholder-gray-400"  placeholder="Summarize your experience and key skills in a few words..." {...register("description")} value={text} onChange={(e) => setText(e.target.value)} />
          )}
          </div>
          <div className="text-center">
            <Button disabled={text ? false : true} type="submit" className="bg-green-400 text-sm font-medium" size={"sm"}><Save />Save Summery</Button>
          </div>             
          <div className="text-end mt-10">
            <Button onClick={() => updateCurrentSection("skills")} className="bg-blue-400 text-sm font-medium" size={"sm"}><MoveRightIcon />Continue</Button>
          </div>
        </form>
      </div>
  )
}

export default SummeryForm