import { useDataStore } from "@/store/dataStore"

const LiveTemplateCV = () => {
  const { data } = useDataStore()
  return (
    <div className='border-1 rounded shadow-md w-full h-full p-7 text-black'>
      <div className='flex justify-between'>
        <div>
          {data ? <h1 className='text-3xl font-bold'>{data?.firstName} {data?.lastName}</h1> : <h1 className="text-3xl font-bold">Nombre Apellido</h1> }
          
          <h3 className='text-2xl'>Title</h3>
        </div>
        <div className='flex flex-col'>
          <a>links</a>
          <a>links</a>
          <a>links</a>
        </div>
      </div>
      <hr />
      <div>
        Summery
      </div>
      <hr />
    </div>
  )
}

export default LiveTemplateCV