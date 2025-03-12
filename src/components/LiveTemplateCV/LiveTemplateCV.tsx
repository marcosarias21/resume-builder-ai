import { LINKS_ICONS } from "@/helpers/icons"
import { useDataStore } from "@/store/dataStore"
import { Github, Mail, Tv2Icon } from "lucide-react"

const LiveTemplateCV = () => {
  const { data } = useDataStore()
  return (
    <div className='border-1 flex flex-col flex-wrap rounded shadow-md w-full h-full p-7 text-gray-700'>
      <div className='flex justify-between mb-4'>
        <div className="flex flex-col gap-1">
          {data?.personalInfo?.lastName ? <h1 className='text-3xl font-bold tracking-wide'>{data?.personalInfo.firstName.toLocaleUpperCase()} {data?.personalInfo.lastName.toLocaleUpperCase()}</h1> : <h1 className="text-3xl font-bold">Name LastName</h1> }
          <h2 className='text-lg tracking-wider'>{data?.personalInfo?.jobTitle ? data?.personalInfo?.jobTitle?.toLocaleUpperCase() : "Job Title"}</h2>
        </div>
        <div className='flex flex-col text-sm'>
          {!data?.summery?.socialMedia &&
          <div className="flex flex-col">
            <a>Link</a>
            <a>Link</a>
            <a>Link</a>
          </div>}
          <div className="text-sm">
            <p className="flex items-center gap-1 text-xs"><Mail size={10} />{data?.personalInfo?.email}</p>
          {data?.summery?.socialMedia?.map((link, index) => 
            <a className="flex items-center gap-2" key={index} href={link.link}>{LINKS_ICONS[index]}{link.text}</a>
          )}
          </div>
        </div>
      </div>
      <hr className="border-black" />
      <div className="flex flex-col flex-wrap my-5 gap-1">
        <div>
          <h2 className="text-md font-bold tracking-wide">ABOUT ME</h2>
        </div>
        <div>
          {!data?.summery && "Descripcion"}
          <p className="text-sm ">{data?.summery?.description}</p>
        </div>
      </div>
      <hr className="border-black" />
      <div className="flex flex-col mt-2">
        <h2 className="text-lg font-bold">Projects</h2>
        {data?.projects?.map((project, index) =>
        <div key={index} className="flex flex-col text-sm mb-2">
          <h2 className="text-md font-bold">{project.name}</h2>
          <p className="text-sms">Technologies used: {project.techStack.split(' ').join(', ')}</p>
          <div className="flex gap-3 text-xs">
            <a href={project.demo} className="flex items-center gap-1"><Tv2Icon size={10} />Website</a>
            <a href={project.repository} className="flex items-center gap-1"><Github size={10} />Code</a>
          </div>
          <ul className="list-disc pl-5">
            {project?.listDescription?.map((desc, index) => 
              <li key={index}>{desc}</li>
            )}
          </ul>
        </div>)}        
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Works Experiences</h2>
        {data?.works?.map((work, index) => 
        <div key={index}>
          <div className="flex flex-col text-sm mb-2">
            <div className="flex gap-2 items-center">
              <h2 className="text-md font-bold">{work.workCompany}</h2>
              <span className="text-xs font-medium">({work.start} - {work.end})</span>
            </div>
            <p className="text-sms">{work.summery}</p>
          </div>
        </div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Skills</h2>
        <div className="grid grid-cols-3 list-disc text-sm">
         {data?.skills?.map((skill, index) => 
          <li key={index}>{skill}</li>
         )}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Education</h2>
        <div className="grid grid-cols-3 text-xs list-disc">
          {data?.educations?.map((education, index) => 
            <div key={index}>
              <h4 className="font-medium">{education.degree} {education.major}</h4>
              <p className="font-medium">{education.universityName} ({education.start} - {education.end})</p>
              <p>Status: </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LiveTemplateCV