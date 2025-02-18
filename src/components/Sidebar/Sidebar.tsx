import React from "react"
import { useSectionsStore } from "../../store/store"

type Prop = { section: string, popover: string, icon: string }

const Sidebar: React.FC<Prop> = ({ section, popover }) => {
  const { updateCurrentSection } = useSectionsStore()
  return (
     <button onClick={() => updateCurrentSection(section)} className="bg-red-300 rounded w-50 py-2 text-white cursor-pointer hover:bg-red-200 hover:transition-colors" type="button">{popover}</button>
  )
}

export default Sidebar