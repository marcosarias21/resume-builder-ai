import { PersonalInfoForm } from "@/components/Forms/PersonalInfoForm";
import { SummeryForm } from "@/components/Forms/SummeryForm";
import { ReactNode } from "react";

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