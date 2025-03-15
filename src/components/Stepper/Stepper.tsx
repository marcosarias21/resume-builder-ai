import { useSectionsStore } from "@/store/sectionStore";

const Stepper = () => {
  const { currentStep } = useSectionsStore()
  const steps = [
    "Personal Details",
    "Summary",
    "Skills",
    "Projects",
    "Works",
    "Education",
  ];
  
  return (
    <div className="w-full max-w-2xl pr-4">
      <div className="flex justify-between items-center mb-8">
        {steps?.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full  transition-all ${
                currentStep >= index ? "bg-blue-400 text-white" : "border-gray-300 border-2 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <p className="text-sm font-medium text-gray-600 mt-2 text-center">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stepper