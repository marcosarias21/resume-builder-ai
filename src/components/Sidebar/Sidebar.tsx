import React, { ReactNode } from "react"
import { useSectionsStore } from "../../store/sectionStore"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

type Prop = { section: string, popover: string, icon: ReactNode }

const Sidebar: React.FC<Prop> = ({ section, popover, icon }) => {
  const { updateCurrentSection, currentSection } = useSectionsStore()
  return (
    <div>
        <HoverCard>
          <HoverCardTrigger>
            <button onClick={() => updateCurrentSection(section)} className={`bg-black/20 w-auto p-4 text-white cursor-pointer hover:bg-purple-200 hover:transition-colors, ${currentSection === section &&'bg-purple-500'}`} type="button">
            {icon}
          </button>
          </HoverCardTrigger>
          <HoverCardContent className="mb-3 ml-1" side="right">{popover}</HoverCardContent>
        </HoverCard>
    </div>
  )
}

export default Sidebar