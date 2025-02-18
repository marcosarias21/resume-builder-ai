import './App.css'
import { Sidebar } from './components/Sidebar'
import { sectionsData } from './helpers/sectionsData'
import { sidebarInfo } from './helpers/sidebarInfo'
import { useSectionsStore } from './store/store'

const App = () => {
  const { currentSection } = useSectionsStore()
  return (
    <section className='grid grid-cols-5 container mx-auto h-dvh items-center'>
      <div className='flex flex-col gap-4'>
        {sidebarInfo.map(info => <Sidebar key={info.id} {...info} />)}
      </div>
      <div className='col-span-3'>
        {sectionsData[currentSection].comp}
      </div>
      <div>
        Mostrar cambios en el CV
      </div>
    </section>
  )
}

export default App
