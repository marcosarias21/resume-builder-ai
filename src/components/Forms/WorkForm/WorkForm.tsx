import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { workSchema } from "@/schemas/formsSchema"
import { generateDescription } from "@/serivces/AIGenerativeText"
import { useDataStore, WorkObject } from "@/store/dataStore"
import { useSectionsStore } from "@/store/sectionStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Asterisk, Brain, Lightbulb, MoveRight, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const WorkForm = () => {
  const { saveData, data } = useDataStore()
  const { updateCurrentSection, currentStep, setCurrentStep } = useSectionsStore()
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, control, watch, setValue, formState: { isValid } } = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
    defaultValues: { works:[ { position: "", workCompany: "", start: "", end: "", summery: ""  }] }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "works"
  })
  const values = watch()
  
  
  const onSubmit = (values: z.infer<typeof workSchema>) => {
    saveData(values)
  }

  const generateText = async (index: number) => {
    setLoading(true)
    const prompt = `Generate a summery from work experiences, for a cv with this datas, give me only a description medium-large: ${values.works[index].workCompany} ${values.works[index].position}`
    const data = await generateDescription(prompt)
    if (data) {
      setLoading(false)
      setValue(`works.${index}.summery`, data)
    }
  }

  useEffect(() => {
    if (data?.works) {
      if (currentStep <= 4) setCurrentStep(5)
    }
    if (data?.works) {
      Object.keys(data.works).forEach(key => 
        setValue(`works.${key}` as any, data?.works?.[key as keyof WorkObject[]])
      )
    }
  }, [])

  return (
    <div className='min-h-[60%] w-full bg-white border-1 border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 max-h-[485px] overflow-y-auto custom-scrollbar pr-5'>             
          <div>
             {fields?.map((_, index) => (
              <div key={index} className="mb-1 border-1 rounded">
                <div className="flex flex-col justify-between p-5">
                  <div className="flex gap-5 p-1 w-full">
                    <div className="w-full">
                      <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Company Name: <span><Asterisk className="text-red-500" size={14} /></span></label>
                      <input
                        className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                        placeholder="Enter company name"                    
                        type='text'
                        {...register(`works.${index}.workCompany`, { required: true })}
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Position: <span><Asterisk className="text-red-500" size={14} /></span></label>
                      <input
                        className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                        placeholder="Enter job position"                    
                        type='text'
                        {...register(`works.${index}.position`, { required: true })}
                      />
                    </div>
                  </div>   
                  <div className="flex flex-col p-1 w-full">
                  </div> 
                  <div className="flex">
                    <div className="flex flex-col p-1 w-full">
                      <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Start: <span><Asterisk className="text-red-500" size={14} /></span></label>
                      <input
                        className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                        type='date'
                        {...register(`works.${index}.start`, { required: true })}
                      />
                    </div>
                    <div className="flex flex-col p-1 w-full">
                      <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">End: <span><Asterisk className="text-red-500" size={14} /></span></label>
                      <input
                        className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                        type='date'
                        {...register(`works.${index}.end`, { required: true })}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-between my-4">
                      <label className="font-bold text-gray-700 flex items-center">Summery<span><Asterisk className="text-red-500" size={14} /></span></label>
                      <Button type="button" onClick={() =>generateText(index)} ><Brain />Generate from AI {loading && <Spinner />}</Button>
                    </div>
                    {loading ? 
                     <div className="w-full min-h-20 rounded-xs border-1 p-5"><p className="animate-pulse text-gray-500 text-sm">Generando texto...</p></div>
                     :
                      <textarea  className="min-h-20 font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400" placeholder="Describe your key responsiblities and any notable achievements" {...register(`works.${index}.summery`, { required: true })} />
                    }
                    <span className="text-xs text-gray-500 flex items-center"><Lightbulb size={12} />If unsure what to write,  let AI handle it!</span>
                  </div>
                </div>
              </div>
             ))}
          </div>              
          <div className="flex justify-between my-10">
            <div className="flex gap-2">
              <Button  onClick={() => append({ position: "",workCompany: "", start: "", end: "", summery: "" })} type="button" className="text-blue-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>+ Add More Work Experiences</Button>
              <Button type="button" onClick={() => remove(-1)} className="text-red-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>- Remove</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-green-400 text-sm font-medium" size={"sm"} type="submit" disabled={!isValid}>
              <Save /> Save Work Experience
            </Button>
          </div>
          <div className="flex justify-end">
            <Button className="bg-blue-400 text-sm font-medium text-end" size={"sm"} onClick={() => updateCurrentSection("education")}>
              <MoveRight /> Continue
            </Button>
          </div>
        </form>
      </div>
  )
}

export default WorkForm