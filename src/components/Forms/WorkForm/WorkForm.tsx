import { Button } from "@/components/ui/button"
import { workSchema } from "@/schemas/formsSchema"
import { generateDescription } from "@/serivces/AIGenerativeText"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const WorkForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, control, watch, setValue } = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
    defaultValues: { works:[ { position: "", workCompany: "", start: "", end: "", summery: ""  }] }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "works"
  })
  const values = watch()
  
  
  const onSubmit = (val: z.infer<typeof workSchema>) => {
    console.log(val)
  }

  const generateText = async (index: number) => {
    setLoading(true)
    const prompt = `Generate a summery from work experiences with this datas: ${values.works[index].workCompany} ${values.works[index].position}`
    const data = await generateDescription(prompt)
    if (data) {
      setLoading(false)
      setValue(`works.${index}.summery`, data)
    }
  }

  return (
    <div className='min-h-[50%] w-full bg-white border-1 border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 min-h-[100%]'>             
          <div>
            <div className="flex justify-between items-center my-4">
              <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-700 dark:text-gray-300">Add your professional skills</label>
            </div>
             {fields?.map((_, index) => (
              <div key={index} className="mb-1">
                <div className="flex flex-col justify-between border-1 rounded-2xl p-5">
                  <div className="flex gap-5 p-1 w-full">
                    <div className="w-full">
                      <label className="font-medium" htmlFor="skills">Company Name:</label>
                      <input
                        className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                        placeholder="Accenture"                    
                        type='text'
                        {...register(`works.${index}.workCompany`)}
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-medium" htmlFor="skills">Position:</label>
                      <input
                        className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                        placeholder="Front End Developer"                    
                        type='text'
                        {...register(`works.${index}.position`)}
                      />
                    </div>
                  </div>   
                  <div className="flex flex-col p-1 w-full">
                  </div> 
                  <div className="flex">
                    <div className="flex flex-col p-1 w-full">
                      <label className="font-medium" htmlFor="skills">Start:</label>
                      <input
                        className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                        type='date'
                        {...register(`works.${index}.start`)}
                      />
                    </div>
                    <div className="flex flex-col p-1 w-full">
                      <label className="font-medium" htmlFor="skills">End:</label>
                      <input
                        className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                        type='date'
                        {...register(`works.${index}.end`)}
                      />
                    </div>
                  </div>
                  <div className="w-full p-1">
                    <div className="flex items-center justify-between my-4">
                      <label className="font-medium">Summery</label>
                      <Button type="button" onClick={() =>generateText(index)} className="bg-purple-500">Generate w/AI</Button>
                    </div>
                    {loading ? 
                     <div className="w-full min-h-52 rounded-lg border-1 p-5"><p className="animate-pulse text-gray-500">Generando texto...</p></div>
                     :
                      <textarea className="w-full min-h-52 rounded-lg border-1 p-5 " {...register(`works.${index}.summery`)} />
                    }
                  </div>
                </div>
              </div>
             ))}
          </div>              
          <div className="flex justify-between mt-20">
          <div className="flex gap-2">
            <Button  onClick={() => append({ position: "",workCompany: "", start: "", end: "", summery: "" })} type="button" className="text-purple-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>+ Add More Work Experiences</Button>
            <Button type="button" onClick={() => remove(-1)} className="text-purple-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>- Remove</Button>
          </div>
            <Button type="submit" className="text-white text-lg bg-purple-500" size={"lg"}>Save</Button>
          </div>
        </form>
      </div>
  )
}

export default WorkForm