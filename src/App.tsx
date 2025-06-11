import { useEffect, useState } from "react";
import { LiveTemplateCV } from "./components/LiveTemplateCV";
import { Sidebar } from "./components/Sidebar";
import { sectionsData } from "./helpers/sectionsData";
import { sidebarInfo } from "./helpers/sidebarInfo";
import { useSectionsStore } from "./store/sectionStore";
import "./App.css";
import { SideTemplateBar } from "./components/SideTemplateBar";
import { useDataStore } from "./store/dataStore";
import { Stepper } from "./components/Stepper";

const App = () => {
  const { currentSection, setCurrentStep } = useSectionsStore();
  const { data } = useDataStore();
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    if (Object.entries(data ?? []).length > 5) setCurrentStep(5);
    const unsubscribe = useDataStore.subscribe((state) => {
      const existingData = JSON.parse(
        localStorage.getItem("resumeData") || "{}"
      );
      const newData = { ...existingData, ...state.data };
      localStorage.setItem("resumeData", JSON.stringify(newData));
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="h-[100vh]">
      <div className="h-full grid grid-cols-12 gap-4 items-center">
        <div className="col-span-1 flex flex-col mt-40">
          {sidebarInfo.map((info, index) => (
            <Sidebar key={info.id} {...info} index={index} />
          ))}
          <div>
            <SideTemplateBar
              setIsWatched={setIsWatched}
              isWatched={isWatched}
            />
          </div>
        </div>
        <div
          className={`flex flex-col justify-center h-full ${
            isWatched ? "col-span-6" : "col-span-10"
          } h-full`}
        >
          <div className="flex flex-col h-full">
            <div
              className="h-full flex flex-col justify-center"
              key={currentSection}
            >
              <Stepper />
              <h2 className="text-3xl font-bold text-gray-700">
                {sectionsData[currentSection].title}
              </h2>
              {sectionsData[currentSection].comp}
            </div>
          </div>
        </div>
        {isWatched && (
          <div
            className={`h-full w-full py-5 transition-all duration-500 ease-in.out ${
              isWatched ? "col-span-5 opacity-100" : "opacity-0"
            }`}
          >
            <LiveTemplateCV />
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
