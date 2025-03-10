import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectsSchema } from "@/schemas/formsSchema";
import { EXAMPLES_PROJECTS } from "@/helpers/examples";
import { generateDescription } from "@/serivces/AIGenerativeText";
import useActionForm from "@/hooks/useActionForm";
import { Button } from "@/components/ui/button";
import { Asterisk, BrainCogIcon, CircleHelp, MoveRight, Save } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Spinner } from "@/components/Spinner";
import { useDataStore } from "@/store/dataStore";

const ProjectsForm = () => {
  const { saveData } = useDataStore()
  const { handleSubmit, register, control, watch, formState: { isValid, errors }, setValue } = useForm<z.infer<typeof ProjectsSchema>>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: { project: [{ name: "", techStack: "", listDescription: [""] }] },
    mode: "onChange"
  });
  const { fields, append, remove } = useFieldArray({  control, name: "project" });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [indexDescription, setIndexDescription] = useState<number>()
  const [descriptionArray, setDescriptionArray] = useState(Array(3).fill(null))
  const [loading, setLoading] = useState<boolean>(false)
  const values = watch()
  const prompt = `Improve it a concise and professional project description for a resume.:`
  const { addArray, removeArray } = useActionForm({array: descriptionArray, setArray: setDescriptionArray})
  const onSubmit = (values: z.infer<typeof ProjectsSchema>) => {
    console.log(values)
    const filteredValues = values.project.map(project => ({...project, listDescription: project.listDescription.filter(p => p != "")}))
    saveData({
      projects: filteredValues
    })
  };

  const addProject = () => {
    if (fields.length < 3) {
      append({ name: "", techStack: "", listDescription: ["", "", ""] })
      setCurrentIndex(currentIndex + 1)
    } else  {
      alert("Max. 3 projects")
      return; 
    }
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
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[50%] w-full bg-white border border-gray-300 border-t-blue-400 border-t-4 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10">
      <form className="gap-6 max-h-[480px] overflow-y-auto custom-scrollbar pr-5" onSubmit={handleSubmit(onSubmit)}>
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
              <label className="flex items-center font-bold text-gray-700">Project Name<span><Asterisk className="text-red-500" size={14} /></span></label>
              <input
                className="font-medium py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter project name. Eg: Blog App..."
                {...register(`project.${currentIndex}.name`, { required: true })}
                type="text"
              />
              {errors?.project?.[currentIndex]?.name && <p className="text-red-500 text-sm mt-1">This field is required</p>}

            </div>
            <div className="w-full">
              <label className="flex items-center font-bold text-gray-700">Technologies and Skills Used <span><Asterisk className="text-red-500" size={14} /></span></label>
              <input
                className="font-medium py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Put skills that you used in the project. Eg: React, TypeScript, SQL, etc..."
                type="text"
                {...register(`project.${currentIndex}.techStack`, { required: true })}
              />
              {errors?.project?.[currentIndex]?.techStack && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
            <div className="w-full">
              <label className="font-bold text-gray-700">Project URL</label>
              <input
                className="font-medium py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter URL. Eg:www.projectdeployed.com"
                type="text"
                {...register(`project.${currentIndex}.demo`, { required: false })}                
              />
            </div>
            <div className="w-full">
              <label className="font-bold text-gray-700">Repository:</label>
              <input
                className="font-medium py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="www.github.com/marcosarias20/project"
                type="text"
                {...register(`project.${currentIndex}.repository`, { required: false })}
                
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center gap-1">
              <label className="font-bold text-gray-700">Describe your project in points</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-gray-400"><CircleHelp size={20}/></TooltipTrigger>
                  <TooltipContent>Describe your project, and if you feel unsure, let AI improve it!</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {descriptionArray?.map((_, index) => 
              <div key={index} className="flex my-4 items-center gap-1">
                {loading === true && index === indexDescription ?
                  <div className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"><p className="animate-pulse text-gray-500">Generating text...</p></div>
                :
                <input
                  className="font-medium py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="text"
                  placeholder={EXAMPLES_PROJECTS[index] ? EXAMPLES_PROJECTS[index] : 'Put a litle description...'}
                  {...register(`project.${currentIndex}.listDescription.${index}`)}
                 />
              }
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="border-black/20 text-black/40"><Button className="p-3" type="button" onClick={() => betterTextWithAI(prompt+values?.project[currentIndex]?.listDescription[index], index)}>{loading == true && index === indexDescription ? <Spinner /> : <BrainCogIcon />}</Button></TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Put a description and click here to generate a better text w/AI!</p>
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