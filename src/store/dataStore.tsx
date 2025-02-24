import { create } from "zustand";

type Skill = string

type ObjectData = {
  firstName?: string
  lastName?: string
  jobTitle?: string
  email?: string
  address?: string
  location?: string
  phone?: string
  summery?: string 
  skills?: Skill[]
}

interface State {
  data: ObjectData | undefined
}

interface Action {
  saveData: (newData: ObjectData) => void
}

export const useDataStore = create<State & Action>((set) => ({
  data: undefined,
  saveData: (newData) => set((state) => ({
    data: {...state.data, ...newData},
  }))
}))