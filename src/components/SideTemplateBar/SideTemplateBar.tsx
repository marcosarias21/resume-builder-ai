import React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { Eye } from "lucide-react"

interface Prop {
  isWatched: boolean
  setIsWatched: (isWatched: boolean) => void
}

const SideTemplateBar: React.FC<Prop> = ({ isWatched, setIsWatched }) => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>
        <button onClick={() => setIsWatched(!isWatched)} className={`bg-black/20 p-4 text-white cursor-pointer hover:bg-blue-300 hover:transition-colors ${isWatched && 'bg-blue-400'}`}>
            <Eye />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className='ml-1 mb-3' side="right">Live Preview</HoverCardContent>
    </HoverCard>
  )
}

export default SideTemplateBar