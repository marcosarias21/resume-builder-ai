import { Button } from '@/components/ui/button'
import { educationSchema } from '@/schemas/formsSchema'
import { Education, useDataStore } from '@/store/dataStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Asterisk, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

type educationType = z.infer<typeof educationSchema>

const EducationForm = () => {
  const { saveData, data } = useDataStore()
  const { register, handleSubmit, control, formState: { isValid }, setValue } = useForm<educationType>({
    resolver: zodResolver(educationSchema),
    defaultValues: { educations: [{ universityName: "", degree: "", major: "", start: "", end: ""  }]} 
    })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations"
  })

  const onSubmit = (values: educationType) => {
    saveData(values)
  }

  useEffect(() => {
    if (data?.educations) {
      Object.keys(data?.educations).forEach(key => 
        setValue(`educations.${key}` as any, data.educations?.[key as keyof Education[]])
      )
    }
  }, [])

  return (
    <div className='min-h-[70%] bg-white border-1 border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-lg rounded-lg p-6 lg:p-10 w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 min-h-[100%] max-h-[480px] overflow-y-auto custom-scrollbar pr-5'>             
          <div>
            {fields.map((_, index) => 
            <div key={index} className="mb-1 border-1 rounded p-5">
              <div className="grid grid-cols-3 gap-5">
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">University Name<span><Asterisk className="text-red-500" size={14} /></span></label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter university name"                    
                    type='text'
                    {...register(`educations.${index}.universityName`, { required: true })}
                  />
                </div>
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Degree</label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter degree obtained"                    
                    type='text'
                    {...register(`educations.${index}.degree`, { required: false })}
                  />
                </div>               
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Major</label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter the field of study"                    
                    type='text'
                    {...register(`educations.${index}.major`, { required: false })}
                    />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Start<span><Asterisk className="text-red-500" size={14} /></span></label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    type='date'
                    {...register(`educations.${index}.start`, { required: true })}
                  />
                </div>
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">End<span><Asterisk className="text-red-500" size={14} /></span></label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    type='date'
                    {...register(`educations.${index}.end`, { required: true })}
                  />
                </div>
              </div>
            </div> 
            )}
          </div>                
          <div className="flex justify-between my-10">
            <div className="flex gap-2">
              <Button  onClick={() => append({ universityName: "", degree: "", major: "", start: "", end: "" })} type="button" className="text-blue-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>+ Add More Education</Button>
              <Button type="button" onClick={() => remove(-1)} className="text-red-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>- Remove</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-green-400 text-sm font-medium" size={"sm"} type="submit" disabled={!isValid}>
              <Save /> Save Educational Background
            </Button>
          </div>
        </form>
      </div>
  )
}

export default EducationForm