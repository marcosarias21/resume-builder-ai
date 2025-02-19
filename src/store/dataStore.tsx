import { create } from "zustand";

type ObjectData = {
  firstName?: string
  lastName?: string
  email?: string
  address?: string
  location?: string
  phone?: string
  summery?: string 
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