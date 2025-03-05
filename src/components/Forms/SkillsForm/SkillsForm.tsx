import { Button } from "@/components/ui/button"
import { examplesSkills } from "@/helpers/examples"
import useActionForm from "@/hooks/useActionForm"
import { skillsSchema } from "@/schemas/formsSchema"
import { useDataStore } from "@/store/dataStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Asterisk, MoveRight, Save } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const SkillsForm = () => {
  const { register, handleSubmit, formState: {errors, isValid} } = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    mode: "onChange"
  })
  const { saveData  } = useDataStore()
  const [skillsArray, setSkillsArray] = useState(Array(3).fill(null))
  const { addArray, removeArray } = useActionForm({ array: skillsArray, setArray: setSkillsArray })

  const onSubmit = (values:  z.infer<typeof skillsSchema>) => {
    saveData(values)
  }

  return (
    <div className='min-h-[60%] w-full bg-white border-1 border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 h-full'>             
          <div>
            <div className="flex justify-between items-center my-4">
              <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-700 dark:text-gray-300">Add your professional skills</label>
            </div>
            <div className="grid grid-cols-3 p-5">
             {skillsArray?.map((_, index) => (
              <div key={index} className="mb-1">
                <div className="flex flex-col p-1 w-full">
                  <label htmlFor="skills" className="font-bold text-gray-700 flex items-center">Skill:<span><Asterisk className="text-red-500" size={14} /></span></label>
                  <input className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                  placeholder={examplesSkills[index] ? examplesSkills[index] : "Add a key skill that you used"} type='text' {...register(`skills.${index}`, { required: true })} />
                </div>   
              </div>
             ))}
            </div>
          </div>              
          {errors.skills && (<p className="text-red-500 text-sm mt-2">Fill in all fields to save!</p>)}
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <Button onClick={addArray} type="button" className="text-blue-400 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>+ Add More Skills</Button>
              <Button onClick={removeArray} type="button" className="text-blue-400 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>- Remove</Button>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="text-center">
              <Button disabled={!isValid} className="bg-green-400 text-sm font-medium" size={"sm"} type="submit">
                <Save />Save Skills
              </Button>              
            </div>
          </div>
          <div className="text-end">
            <Button className="bg-blue-400 text-sm font-medium" size={"sm"} type="button">
              <MoveRight />Continue
            </Button>
           <p className="text-xs text-amber-400">Make sure to save before continue</p>
          </div>
        </form>
      </div>
  )
}

export default SkillsForm