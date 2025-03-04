import { useState } from 'react'
import { LiveTemplateCV } from './components/LiveTemplateCV'
import { Sidebar } from './components/Sidebar'
import { sectionsData } from './helpers/sectionsData'
import { sidebarInfo } from './helpers/sidebarInfo'
import { useSectionsStore } from './store/sectionStore'
import './App.css'
import { SideTemplateBar } from './components/SideTemplateBar'

const App = () => {
  const { currentSection } = useSectionsStore()
  const [isWatched, setIsWatched] = useState(false)

  return (
    <section className='grid grid-cols-12 container mx-auto h-dvh items-center'>
      <div className='col-span-1 flex flex-col'>
        {sidebarInfo.map(info => <Sidebar key={info.id} {...info} />)}
        <div className='mt-5'>
          <SideTemplateBar setIsWatched={setIsWatched} isWatched={isWatched}/>
        </div>
      </div>
      <div className={`w-full h-full ${isWatched ? 'col-span-7': 'col-span-9'}`}>
        <div className='flex flex-col h-full w-full justify-center'>
          <h2 className='text-4xl font-bold text-gray-700'>{sectionsData[currentSection].title}</h2>
          {sectionsData[currentSection].comp}
        </div>
      </div>
      <div className={`ml-20 h-full w-full py-5 ${isWatched && 'col-span-4'}`}>
        {isWatched &&  <LiveTemplateCV />}    
      </div>
    </section>
  )
}

export default App
