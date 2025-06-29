import { ALERT_ERROR_PROJECT } from "@/constants/alerts/alerts-errors";
import { Project } from "@/store/dataStore";
import { useState } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";

interface Prop {
  fields: FieldArrayWithId<any, "projects", "id">[];
  append: UseFieldArrayAppend<{ project: Project[] }, "project">;
  remove: UseFieldArrayRemove;
}

const useActionProjectForm = ({ fields, append, remove }: Prop) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const addProject = () => {
    if (fields.length < 3) {
      append({ name: "", techStack: "", listDescription: ["", "", ""] });
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(ALERT_ERROR_PROJECT);
      return;
    }
  };

  const removeProject = () => {
    remove(currentIndex);
    setCurrentIndex(currentIndex - 1);
  };
  return { currentIndex, addProject, removeProject };
};

export default useActionProjectForm;
