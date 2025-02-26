import { Button } from "@/components/ui/button"
import { examplesSkills } from "@/helpers/examples"
import useActionForm from "@/hooks/useActionForm"
import { skillsSchema } from "@/schemas/formsSchema"
import { useDataStore } from "@/store/dataStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const SkillsForm = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema)
  })
  const { saveData  } = useDataStore()
  const [skillsArray, setSkillsArray] = useState(Array(3).fill(null))
  const { addArray, removeArray } = useActionForm({ array: skillsArray, setArray: setSkillsArray })

  const onSubmit = (values:  z.infer<typeof skillsSchema>) => {
    saveData(values)
  }

  return (
    <div className='min-h-[50%] w-full bg-white border-1 border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 min-h-[100%]'>             
          <div>
            <div className="flex justify-between items-center my-4">
              <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-700 dark:text-gray-300">Add your professional skills</label>
            </div>
             {skillsArray?.map((_, index) => (
              <div key={index} className="mb-1">
                <div className="flex justify-between border-1 rounded-2xl p-5">
                  <div className="flex flex-col p-1 w-full">
                    <label htmlFor="skills">Name</label>
                    <input
                      className='py-3 px-4 block w-full border-1 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-indigo-600'
                      placeholder={examplesSkills[index] ? examplesSkills[index] : "Eg: ..."}                     
                      type='text'
                      {...register(`skills.${index}`)}
                    />
                  </div>   
                </div>
              </div>
             ))}
          </div>              
          <div className="flex justify-between mt-20">
          <div className="flex gap-2">
            <Button onClick={addArray} type="button" className="text-purple-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>+ Add More Skills</Button>
            <Button onClick={removeArray} type="button" className="text-purple-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>- Remove</Button>
          </div>
          <Button type="submit" className="text-white text-lg bg-purple-500" size={"lg"}>Save</Button>
          </div>
        </form>
      </div>
  )
}

export default SkillsForm