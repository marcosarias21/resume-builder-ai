import './App.css'
import { Sidebar } from './components/Sidebar'
import { sectionsData } from './helpers/sectionsData'
import { sidebarInfo } from './helpers/sidebarInfo'
import { useDataStore } from './store/dataStore'
import { useSectionsStore } from './store/sectionStore'

const App = () => {
  const { currentSection } = useSectionsStore()
  const { data } = useDataStore()
  console.log(data)
  return (
    <section className='grid grid-cols-5 container mx-auto h-dvh items-center'>
      <div className='flex flex-col'>
        {sidebarInfo.map(info => <Sidebar key={info.id} {...info} />)}
      </div>
      <div className='col-span-3 w-full h-full'>
        <div className='flex flex-col h-full w-full justify-center'>
          <h2 className='text-4xl font-bold'>{sectionsData[currentSection].title}</h2>
          {sectionsData[currentSection].comp}
        </div>
      </div>
      <div>
        Mostrar cambios en el CV
      </div>
    </section>
  )
}

export default App
