import { ReactNode } from "react";
import { PersonalInfoForm } from "../components/PersonalInfoForm";
import { SummeryForm } from "../components/SummeryForm";

export const sectionsData: Record<string, {id: number, title: string, comp: ReactNode}> = {
    personalInfo: {
      id: 0,
      title: 'Personal Information',
      comp: <PersonalInfoForm />
    },
    summery: {
      id: 1,
      title: 'Summery',
      comp: <SummeryForm />
    }
}