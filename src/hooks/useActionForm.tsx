type StringArray = string[];

interface UseActionFormProps {
  array?: StringArray;
  setArray?: (newArray: StringArray) => void;
}

const useActionForm = ({ array = [], setArray }: UseActionFormProps) => {
  const addArray = () => {
    if (!setArray) return; 
    const newArray = [...array, ""];
    setArray(newArray);
  };

  const removeArray = () => {
    if (!setArray) return;
    if (array.length > 3){
      const newArray = array.slice(0, -1);
      setArray(newArray);
    }
    if (array.length == 3) alert("Minimun are 3")
  };

  return { addArray, removeArray };
};

export default useActionForm;