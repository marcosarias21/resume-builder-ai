import { create } from "zustand";

export type Skill = string

interface socialMediaObject {
  text: string,
  link: string,
}

export interface Summery {
  socialMedia?: socialMediaObject[]
  description: string | undefined
}

export interface WorkObject {
  workCompany: string
  position: string
  start: string
  end: string
  summery: string
}

export interface Project {
  name: string
  techStack: string
  listDescription: string[] | undefined
  demo?: string
  repository?: string
}

export interface Education {
  universityName: string
  degree: string
  major: string
  start: string
  end: string
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  phone?: string
  location: string 
  address?: string
}

type ObjectData = {
  personalInfo?: PersonalInfo
  summery?: Summery
  skills?: Skill[]
  projects?: Project[]
  works?: WorkObject[]
  educations?: Education[]
}

interface State {
  data: ObjectData | undefined
}

interface Action {
  saveData: (newData: Partial<ObjectData>) => void
}

export const useDataStore = create<State & Action>((set) => ({
  data: JSON.parse(localStorage.getItem("resumeData") || "{}"),
  saveData: (newData) => {set((state) => {
      const updatedData = { ...state.data, ...newData };
      localStorage.setItem("resumeData", JSON.stringify(updatedData));
      return { data: updatedData };
    });
  },
}));