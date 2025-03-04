import React, { ReactNode } from "react"
import { useSectionsStore } from "../../store/sectionStore"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

type Prop = { section: string, popover: string, icon: ReactNode }

const Sidebar: React.FC<Prop> = ({ section, popover, icon }) => {
  const { updateCurrentSection, currentSection } = useSectionsStore()
  return (
      <HoverCard openDelay={0} closeDelay={0}>
        <div>
          <HoverCardTrigger>
            <button onClick={() => updateCurrentSection(section)} className={`${currentSection != section && "bg-gray-400"} w-auto p-4 text-white cursor-pointer hover:bg-blue-300 hover:transition-colors, ${currentSection === section &&'bg-blue-400'}`} type="button">
            {icon}
          </button>
          </HoverCardTrigger>
          <HoverCardContent className="mb-3 ml-1" side="right">{popover}</HoverCardContent>
        </div>
      </HoverCard>
  )
}

export default Sidebar