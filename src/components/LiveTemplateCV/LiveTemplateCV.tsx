import { LINKS_ICONS } from "@/helpers/icons"
import { useDataStore } from "@/store/dataStore"

const LiveTemplateCV = () => {
  const { data } = useDataStore()
  return (
    <div className='border-1 flex flex-col flex-wrap rounded shadow-md w-full h-full p-7 text-gray-700'>
      <div className='flex justify-between'>
        <div>
          {data ? <h1 className='text-3xl font-bold'>{data?.firstName} {data?.lastName}</h1> : <h1 className="text-3xl font-bold">Nombre Apellido</h1> }
          <h3 className='text-md font-bold'>{data?.jobTitle ? data?.jobTitle?.toLocaleUpperCase() : "Job Title"}</h3>
        </div>
        <div className='flex flex-col'>
          {data?.summery?.socialMedia?.map((link, index) => 
            <a className="flex" key={index} href={link.link}>{LINKS_ICONS[index]}{link.text}</a>
          )}
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap">
        <p>{data ? data?.summery?.summery : ""}</p>
      </div>
      <hr />
      <div className="flex flex-col gap-4 mt-2">
        <div>
          <h2>Project 1</h2>
          <p>Description</p>
          <ul>
            <li>Use tatat</li>
            <li>Use tatat</li>
            <li>Use tatat</li>
          </ul>
        </div>
        <div>
          <h2>Project 1</h2>
        </div>
        <div>
          <h2>Project 1</h2>
        </div>
        
      </div>
    </div>
  )
}

export default LiveTemplateCV