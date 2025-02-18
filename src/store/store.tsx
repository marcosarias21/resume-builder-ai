import { create } from 'zustand'

type State = {
  currentSection: string
}

type Action = {
  updateCurrentSection: (newSection: string) => void
}

export const useSectionsStore = create<State & Action>((set) => ({
  currentSection: 'personalInfo',
  updateCurrentSection: (newSection) => set({
    currentSection: newSection
  })
}))