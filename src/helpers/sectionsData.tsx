import { ReactNode } from "react";
import { PersonalInfoForm } from "../components/PersonalInfoForm";
import { SummeryForm } from "../components/SummeryForm";

export const sectionsData: Record<string, {id: number, popover: string, comp: ReactNode}> = {
    personalInfo: {
      id: 0,
      popover: 'Personal Info',
      comp: <PersonalInfoForm />
    },
    summery: {
      id: 1,
      popover: 'Summery',
      comp: <SummeryForm />
    }
}