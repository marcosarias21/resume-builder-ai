import { create } from "zustand";

type Skill = string

interface socialMediaObject {
  text: string,
  link: string,
}

interface summery {
  socialMedia?: socialMediaObject[]
  summery: string
}
interface Project {
  name: string
  techStack: string
  listDescription: string[] | undefined
  demo?: string
  repository?: string
}

type ObjectData = {
  firstName?: string
  lastName?: string
  jobTitle?: string
  email?: string
  address?: string
  location?: string
  phone?: string
  summery?: summery 
  skills?: Skill[]
  projects?: Project[]
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