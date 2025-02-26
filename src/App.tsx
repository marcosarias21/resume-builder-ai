import { useState } from 'react'
import { Eye} from 'lucide-react'
import { LiveTemplateCV } from './components/LiveTemplateCV'
import { Sidebar } from './components/Sidebar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './components/ui/hover-card'
import { sectionsData } from './helpers/sectionsData'
import { sidebarInfo } from './helpers/sidebarInfo'
import { useSectionsStore } from './store/sectionStore'
import './App.css'

const App = () => {
  const { currentSection } = useSectionsStore()
  const [isWatched, setIsWatched] = useState(false)

  return (
    <section className='grid grid-cols-12 container mx-auto h-dvh items-center'>
      <div className='col-span-1 flex flex-col'>
        {sidebarInfo.map(info => <Sidebar key={info.id} {...info} />)}
        <div className='mt-5'>
          <HoverCard>
            <HoverCardTrigger>
              <button onClick={() => setIsWatched(!isWatched)} className={`bg-black/20 p-4 text-white cursor-pointer hover:bg-purple-200 hover:transition-colors ${isWatched && 'bg-purple-500'}`}>
                  <Eye />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className='ml-1 mb-3' side="right">Live Preview</HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <div className={`w-full h-full ${isWatched ? 'col-span-7': 'col-span-9'}`}>
        <div className='flex flex-col h-full w-full justify-center'>
          <h2 className='text-4xl font-bold'>{sectionsData[currentSection].title}</h2>
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
