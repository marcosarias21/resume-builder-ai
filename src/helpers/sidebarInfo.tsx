import { NotebookPen, PenToolIcon, UserRound } from "lucide-react";
import { ReactNode } from "react";

interface Prop {
  id: number,
  section: string,
  popover: string,
  icon: ReactNode
}

export const sidebarInfo: Prop[] = [
  {
    id: 0,
    section: 'personalInfo',
    popover: 'Personal Information Form',
    icon: <UserRound />
  },
  {
    id: 1,
    section: 'summery',
    popover: 'Summery Form',
    icon: <NotebookPen />
  },
  {
    id: 2,
    section: 'skills',
    popover: 'Skills Form',
    icon: <PenToolIcon />
  }
]