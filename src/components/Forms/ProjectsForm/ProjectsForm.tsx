import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectsSchema } from "@/schemas/formsSchema";
import { examplesProjects } from "@/helpers/examples";

const ProjectsForm = () => {
  const { handleSubmit, register, control } = useForm<z.infer<typeof ProjectsSchema>>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: { project: [{ name: "", techStack: "", listDescription: [""] }] },
  });
  const { fields, append, remove } = useFieldArray({  control, name: "project" });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [descriptionArray, setDescriptionArray] = useState(Array(3).fill(null))

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
  
  const addPointDescription = () => {
    setDescriptionArray([...descriptionArray, null])
  }

  const removePointDescription = () => {
    if (descriptionArray.length > 3) {
      setDescriptionArray(descriptionArray.slice(0, -1))
    }
    if(descriptionArray.length == 3) alert('Minimun are 3 descriptions points')
  }

  return (
    <div className="min-h-[50%] w-full bg-white border border-gray-300 dark:bg-neutral-800 shadow-xl rounded-lg p-6 lg:p-10">
      <form className="gap-6 min-h-[100%]" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex justify-between items-center my-4">
            <label className="block mb-2 text-2xl font-bold text-gray-700 dark:text-gray-300">
              Project {currentIndex + 1}
            </label>
            <div>
              {currentIndex > 0 && <button type="submit" onClick={removeProject} className="text-purple-500 border border-gray-200 bg-white px-4 py-2 rounded-lg">-</button>}
              {fields.length < 6 && <button type="submit" onClick={addProject} className="text-purple-500 border border-gray-200 bg-white px-4 py-2 rounded-lg">+</button>}
            </div>
          </div>
          <div className="mt-1 flex gap-2 w-full">
            <div className="w-full">
              <label>Name</label>
              <input
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Blog App..."
                {...register(`project.${currentIndex}.name`)}
                type="text"
                required
              />
            </div>
            <div className="w-full">
              <label>Tech Stack</label>
              <input
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="React, TypeScript, Tailwind, SQL, etc..."
                type="text"
                {...register(`project.${currentIndex}.techStack`)}
                required
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="font-medium">Describe your project in points</label>
            {descriptionArray.map((_, index) => 
              <div key={index} className="flex my-4 items-center">
                <input
                  className="py-3 px-4 mx-2 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="text"
                 placeholder={examplesProjects[index] ? examplesProjects[index] : 'Put a litle description...'}
                   {...register(`project.${currentIndex}.listDescription.${index}`)}
                />
                <button className="bg-purple-500 py-2 px-2 rounded text-white font-bold hover:bg-purple-400">AI</button>
              </div>
            )}
            </div>
            <div className="flex gap-2 justify-center">
              <button onClick={removePointDescription} type="button" className="border-1 border-gray-200 text-purple-500 px-4 py-2 rounded">
                -
              </button>
              <button onClick={addPointDescription} type="button" className="text-white bg-purple-500 px-4 py-2 rounded">
                +
              </button>
            </div>
        </div>
        <div className="flex justify-between mt-10">          
          <button type="submit" className="text-white bg-purple-500 px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectsForm