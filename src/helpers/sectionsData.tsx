import { EducationForm } from "@/components/Forms/EducationForm";
import { PersonalInfoForm } from "@/components/Forms/PersonalInfoForm";
import { ProjectsForm } from "@/components/Forms/ProjectsForm";
import { SkillsForm } from "@/components/Forms/SkillsForm";
import { SummeryForm } from "@/components/Forms/SummeryForm";
import { WorkForm } from "@/components/Forms/WorkForm";
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
    },
    skills: {
      id: 2,
      title: 'Skills',
      comp: <SkillsForm />
    },
    projects: {
      id: 3,
      title: 'Projects',
      comp: <ProjectsForm />
    },
    works: {
      id: 4,
      title: 'Works Experiences',
      comp: <WorkForm />
    },
    education: {
      id: 4,
      title: 'Educational Background',
      comp: <EducationForm />
    }
}