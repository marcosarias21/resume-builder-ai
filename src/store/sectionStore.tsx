import { create } from 'zustand'

type State = {
  currentSection: string
  currentStep: number,
}

type Action = {
  updateCurrentSection: (newSection: string) => void
  setCurrentStep: (step: number) => void
}

export const useSectionsStore = create<State & Action>((set) => ({
  currentSection: 'personalInfo',
  updateCurrentSection: (newSection) => set({
    currentSection: newSection
  }),
  currentStep: 0,
  setCurrentStep: (step) => set({
    currentStep: step
  }),
}))