import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectsSchema } from "@/schemas/formsSchema";
import { examplesProjects } from "@/helpers/examples";
import { generateDescription } from "@/serivces/AIGenerativeText";
import useActionForm from "@/hooks/useActionForm";
import { Button } from "@/components/ui/button";
import { Asterisk, BrainCogIcon, MoveRight, Save } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

const ProjectsForm = () => {
  const { handleSubmit, register, control, watch, formState: { isValid, errors }, setValue } = useForm<z.infer<typeof ProjectsSchema>>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: { project: [{ name: "", techStack: "", listDescription: [""] }] },
    mode: "onChange"
  });
  const { fields, append, remove } = useFieldArray({  control, name: "project" });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [indexDescription, setIndexDescription] = useState<number>()
  const [descriptionArray, setDescriptionArray] = useState(Array(3).fill(null))
  const [inputValue, setInputValue] = useState<any[] & string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const prompt = "Mejorame esta breve descripcion como fuera un curriculum, solo dame una descripcion: "
  const values = watch()
  const { addArray, removeArray } = useActionForm({array: descriptionArray, setArray: setDescriptionArray})

  console.log(errors)

  const onSubmit = (values: z.infer<typeof ProjectsSchema>) => {
    console.log(values);
  };

  const addProject = () => {
    if (fields.length < 6) {
      append({ name: "", techStack: "", listDescription: ["", "", ""] })
    } else return
    setCurrentIndex(currentIndex + 1)
  }

  const removeProject = () => {
    remove(currentIndex)
    setCurrentIndex(currentIndex - 1)
  }

  const betterTextWithAI = async (text: string, index: number) => {
    setLoading(true)
    setIndexDescription(index)
    const data = await generateDescription(text)
    if (data) {
      setValue(`project.${currentIndex}.listDescription.${index}`, data)
      setInputValue([...inputValue, {index, text: data}])
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[50%] w-full bg-white border border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10">
      <form className="gap-6 min-h-[100%]" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex justify-between items-center my-4">
            <label className="block mb-2 text-2xl font-bold text-gray-700 dark:text-gray-300">
              Project {currentIndex + 1}
            </label>
            <div>
              {currentIndex > 0 && <button onClick={removeProject} className="text-red-500 border border-gray-200 bg-white px-4 py-2 rounded-lg">-</button>}
              {fields.length < 6 && <button onClick={addProject} className="text-blue-500 border border-gray-200 bg-white px-4 py-2 rounded-lg">+</button>}
            </div>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div className="w-full">
              <label className="flex items-center font-medium">Project Name<span><Asterisk className="text-red-500" size={14} /></span></label>
              <input
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Blog App..."
                {...register(`project.${currentIndex}.name`, { required: true })}
                type="text"
                required
              />
              {errors?.project?.[currentIndex]?.name && <p className="text-red-500 text-sm mt-1">This field is required</p>}

            </div>
            <div className="w-full">
              <label className="flex items-center font-medium">Technologies and Skills Used <span><Asterisk className="text-red-500" size={14} /></span></label>
              <input
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="React, TypeScript, Tailwind, SQL, etc..."
                type="text"
                {...register(`project.${currentIndex}.techStack`, { required: true })}
                required
              />
              {errors?.project?.[currentIndex]?.techStack && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
            <div className="w-full">
              <label className="font-medium">Project URL</label>
              <input
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="www.projectdeployed.com"
                type="text"
                {...register(`project.${currentIndex}.demo`, { required: false })}
                required
              />
            </div>
            <div className="w-full">
              <label className="font-medium">Repository:</label>
              <input
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="www.github.com/marcosarias20/project"
                type="text"
                {...register(`project.${currentIndex}.repository`, { required: false })}
                required
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="font-medium">Describe your project in points</label>
            {descriptionArray?.map((_, index) => 
              <div key={index} className="flex my-4 items-center gap-1">
                {loading === true && index === indexDescription ?
                  <div className="py-3 px-4 mx-2 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"><p className="animate-pulse text-gray-500">Generating text...</p></div>
                :
                <input
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="text"
                  placeholder={examplesProjects[index] ? examplesProjects[index] : 'Put a litle description...'}
                  {...register(`project.${currentIndex}.listDescription.${index}`)}
                 />
              }
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="border-black/20 text-black/40"><Button className="p-3" onClick={() => betterTextWithAI(prompt+values?.project[currentIndex]?.listDescription[index], index)}><BrainCogIcon /></Button></TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Use AI to generate description</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            </div>
            <div className="flex gap-2 justify-start mb-10">
              <Button onClick={addArray} type="button" className="text-blue-400 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>+ Add More Descriptions</Button>
              <Button onClick={removeArray} type="button" className="text-red-400 border-1 bg-white border-gray-200 hover:bg-inherit" size={"lg"}>- Remove Description</Button>     
            </div>
        </div>
        <div className="flex justify-center">
          <Button className="bg-green-400 text-sm font-medium" disabled={!isValid} size={"sm"} type="submit">
            <Save /> Save Project/s
          </Button>
        </div>
        <div className="flex justify-end mt-10">          
          <Button className="bg-blue-400 text-sm font-medium" size={"sm"}>
            <MoveRight /> Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectsForm