import { useEffect, useState } from 'react'
import { LiveTemplateCV } from './components/LiveTemplateCV'
import { Sidebar } from './components/Sidebar'
import { sectionsData } from './helpers/sectionsData'
import { sidebarInfo } from './helpers/sidebarInfo'
import { useSectionsStore } from './store/sectionStore'
import './App.css'
import { SideTemplateBar } from './components/SideTemplateBar'
import { useDataStore } from './store/dataStore'

const App = () => {
  const { currentSection } = useSectionsStore()
  const [isWatched, setIsWatched] = useState(false)

  useEffect(() => {
    const unsubscribe = useDataStore.subscribe((state) => {
      const existingData = JSON.parse(localStorage.getItem("resumeData") || "{}");
      const newData = { ...existingData, ...state.data }
      localStorage.setItem("resumeData", JSON.stringify(newData));
    });
    return () => unsubscribe();
  }, []);
  return (
    <section className='grid grid-cols-12 gap-4 h-dvh items-center'>
      <div className='col-span-1 flex flex-col'>
        {sidebarInfo.map(info => <Sidebar key={info.id} {...info} />)}
        <div className='mt-5'>
          <SideTemplateBar setIsWatched={setIsWatched} isWatched={isWatched}/>
        </div>
      </div>
      <div className={`w-full h-full  ${isWatched ? 'col-span-6': 'col-span-7'}`}>
        <div className='flex flex-col h-full w-full justify-center'>
          <h2 className='text-3xl font-bold text-gray-700'>{sectionsData[currentSection].title}</h2>
          {sectionsData[currentSection].comp}
        </div>
      </div>
      <div className={`h-full w-full py-5 transition-all duration-500 ease-in.out ${ isWatched ? 'col-span-5 opacity-100' : 'opacity-0'}`}>
        {isWatched &&  <LiveTemplateCV />}    
      </div>
    </section>
  )
}

export default App
