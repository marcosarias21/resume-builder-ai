import { Button } from '@/components/ui/button'
import { educationSchema } from '@/schemas/formsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Asterisk, MoveRight, Save } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

type educationType = z.infer<typeof educationSchema>

const EducationForm = () => {
  const { register, handleSubmit, control, formState: { isValid } } = useForm<educationType>({
    resolver: zodResolver(educationSchema),
    defaultValues: { education: [{ universityName: "", degree: "", major: "", start: "", end: ""  }]} 
    })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  })

  const onSubmit = (values: educationType) => {
    console.log(values)
  }

  return (
    <div className='min-h-[50%] w-full bg-white border-1 border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-6 min-h-[100%]'>             
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
                    {...register(`education.${index}.universityName`, { required: true })}
                  />
                </div>
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Degree</label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter degree obtained"                    
                    type='text'
                    {...register(`education.${index}.degree`, { required: false })}
                  />
                </div>               
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Major</label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter the field of study"                    
                    type='text'
                    {...register(`education.${index}.major`, { required: false })}
                    />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">Start<span><Asterisk className="text-red-500" size={14} /></span></label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    type='date'
                    {...register(`education.${index}.start`, { required: true })}
                  />
                </div>
                <div className="w-full">
                  <label className="font-bold text-gray-700 flex items-center" htmlFor="skills">End<span><Asterisk className="text-red-500" size={14} /></span></label>
                  <input
                    className="font-medium py-3 px-4 block w-full border rounded-sm text-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    type='date'
                    {...register(`education.${index}.end`, { required: true })}
                  />
                </div>
              </div>
            </div> 
            )}
          </div>                
          <div className="flex justify-between my-10">
            <div className="flex gap-2">
              <Button  onClick={() => append({ universityName: "", degree: "", major: "", start: "", end: "" })} type="button" className="text-blue-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>+ Add More Work Experiences</Button>
              <Button type="button" onClick={() => remove(-1)} className="text-red-500 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>- Remove</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-green-400 text-sm font-medium" size={"sm"} type="submit" disabled={!isValid}>
              <Save /> Save Educational Background
            </Button>
          </div>
          <div className="flex justify-end">
            <Button className="bg-blue-400 text-sm font-medium text-end" size={"sm"} type="submit">
              <MoveRight /> Continue
            </Button>
          </div>
        </form>
      </div>
  )
}

export default EducationForm