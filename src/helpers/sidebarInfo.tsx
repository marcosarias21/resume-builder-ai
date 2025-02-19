import { NotebookPen, UserRound } from "lucide-react";
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
    popover: 'Personal Information',
    icon: <UserRound />
  },
  {
    id: 1,
    section: 'summery',
    popover: 'Summery',
    icon: <NotebookPen />
  },
  {
    id: 2,
    section: 'skills',
    popover: 'Skills',
    icon: ''
  }
]