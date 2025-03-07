import { LINKS_ICONS } from "@/helpers/icons"
import { useDataStore } from "@/store/dataStore"
import { Github, Tv2Icon } from "lucide-react"

const LiveTemplateCV = () => {
  const { data } = useDataStore()
  return (
    <div className='border-1 flex flex-col flex-wrap rounded shadow-md w-full h-full p-7 text-gray-700'>
      <div className='flex justify-between'>
        <div>
          {data?.lastName ? <h1 className='text-3xl font-bold'>{data?.firstName} {data?.lastName}</h1> : <h1 className="text-3xl font-bold">Nombre Apellido</h1> }
          <h3 className='text-md font-bold'>{data?.jobTitle ? data?.jobTitle?.toLocaleUpperCase() : "Job Title"}</h3>
        </div>
        <div className='flex flex-col'>
          {!data?.summery?.socialMedia &&
          <div className="flex flex-col">
            <a>Link</a>
            <a>Link</a>
            <a>Link</a>
          </div>}
          {data?.summery?.socialMedia?.map((link, index) => 
            <a className="flex" key={index} href={link.link}>{LINKS_ICONS[index]}{link.text}</a>
          )}
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap">
        {!data?.summery && "Descripcion"}
        <p>{data ? data?.summery?.summery : ""}</p>
      </div>
      <hr />
      <div className="flex flex-col mt-2">
        <h2 className="text-xl font-bold">Projects</h2>
        {data?.projects?.map((project, index) =>
        <div key={index} className="flex flex-col">
          <h2 className="text-lg font-medium">{project.name}</h2>
          <p className="text-md">Technologies used: {project.techStack}</p>
          <div className="flex gap-3 text-sm">
            <a href={project.demo} className="flex items-center gap-1"><Tv2Icon size={14} />Website</a>
            <a href={project.repository} className="flex items-center gap-1"><Github size={14} />Code</a>
          </div>
          <ul className="list-disc pl-5">
            {project?.listDescription?.map((desc, index) => 
              <li key={index}>{desc}</li>
            )}
          </ul>
        </div>)}        
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Work Experiences</h2>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Skills</h2>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Education</h2>
      </div>
    </div>
  )
}

export default LiveTemplateCV