import { useForm } from "react-hook-form";
import { useState } from "react";
import PreviewVideo from "./PreviewVideo";
import SimpleListVideo from "../assets/vids/simplelist-animation.mp4";
import LevelsVideo from "../assets/vids/levels-animation.mp4";
import SetsVideo from "../assets/vids/sets-animation.mp4";
import ProgressBarVideo from "../assets/vids/progressbar-animation.mp4";
import "../styles/CreateNewList.css";
import AddSomeGoals from "./addtolist/AddSomeGoals";
import { useAppContext } from "../AppContext";
import { State, Tab } from "../types/types";

// The form data captured in this form
type FormData = {
  listName: string;
  template: string;
  selectedTab: Tab | null;
};

export default function CreateNewList() {
  const { state } = useAppContext() as {
    state: State;
  };
  const { tabs } = state; // Access tabs from the global state

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // Local component state
  // const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  // const [listName, setListName] = useState("");
  // const [template, setTemplate] = useState("");
  const [hoveredTemplate, setHoveredTemplate] = useState("");
  const [firstStepDone, setFirstStepDone] = useState(false);

  const listTypes = ["Simple List", "Progress Bar", "Sets", "Levels", "Mixed"];

  // Form inputs
  const selectedTab = watch("selectedTab");
  const template = watch("template");
  const listName = watch("listName");

  // Handle form submission
  const onSubmit = (data: FormData) => {
    if (!data.selectedTab) {
      alert("Please choose a tab for your list!");
      return;
    }
    setFirstStepDone(true);
  };

  const handleSelectTab = (tab: Tab) => {
    setValue("selectedTab", tab);
  };

  // // Handle input changes for list name
  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setListName(event.target.value);
  // };

  // // Handle template selection
  // const handleChooseTemplate = (template: string) => {
  //   setTemplate(template);
  // // };

  // // Handle template hover to show the preview video
  // const handleHover = (template: string) => {
  //   setHoveredTemplate(template);
  // };

  // // Proceed to adding goals
  // const handleAddSomeGoals: React.FormEventHandler<HTMLFormElement> = (
  //   event
  // ) => {
  //   event.preventDefault();
  //   if (!listName) {
  //     alert("Please give your list a name");
  //     return;
  //   }
  //   if (!template) {
  //     alert("Please choose a template");
  //     return;
  //   }
  //   if (!selectedTab) {
  //     alert("Please choose a tab for your list");
  //     return;
  //   }
  //   setFirstStepDone(true);
  // };

  // // Handle selecting a tab from global state
  // const handleSelectTab = (selectedTabIcon: Tab) => {
  //   setSelectedTab(selectedTabIcon);
  //   console.log(selectedTab);
  // };

  return (
    <>
      <div className="new-list-container">
        <form id="create-new-list" onSubmit={handleSubmit(onSubmit)}>
          <span className="form-text">NAME YOUR LIST:</span>
          <input
            type="text"
            id="name-your-list"
            {...register("listName", { required: "List name is required" })}
          />
          {errors.listName && <p>{errors.listName.message}</p>}
          <span className="form-text">CHOOSE TEMPLATE:</span>
          <div className="template-options">
            {listTypes.map((type) => (
              <>
                <span
                  className={`${
                    template === type ? "template-item-chosen" : "template-item"
                  }`}
                  onClick={() => setValue("template", type)}
                  onMouseEnter={() => setHoveredTemplate(type)}
                >
                  {type}
                </span>
              </>
            ))}
          </div>
          {errors.template && <p>Please choose a template</p>}
          <span className="form-text">ADD TO:</span>
          <div className="chosen-tab">
            {tabs.length > 0 ? (
              tabs.map((tab) => (
                <img
                  key={tab.id}
                  src={`/icons/${tab.icon_name}`}
                  className={`nav-icon ${
                    selectedTab?.id === tab.id ? "chosen-tab-selected" : ""
                  }`}
                  onClick={() => handleSelectTab(tab)}
                />
              ))
            ) : (
              <p>No existing tabs!</p>
            )}
          </div>
          {errors.selectedTab && <p>Please choose a tab</p>}
          <button id="add-goals-to-list" type="submit">
            Add Goal Data &rarr;
          </button>
        </form>
      </div>

      {!firstStepDone ? (
        <div className="preview-list-container">
          <div className="preview-items">
            {hoveredTemplate === "Simple List" ? (
              <>
                <div className="preview-text-wrap">
                  <PreviewVideo video={SimpleListVideo} />
                  Create a classic check-list and mark to-do items as you
                  complete them
                </div>
                <span className="great-for-text">
                  Great for: black-and-white goals, grocery lists, errands, and
                  morning routines.
                </span>
              </>
            ) : hoveredTemplate === "Progress Bar" ? (
              <>
                <div className="preview-text-wrap">
                  <PreviewVideo video={ProgressBarVideo} />
                  Increment progress by filling up a bar at your own pace
                </div>
                <span className="great-for-text">
                  Great for: goals that can be measured in units, e.g. write
                  1000 words, drink 2000 ml of water, or study for 45 minutes.
                </span>
              </>
            ) : hoveredTemplate === "Levels" ? (
              <>
                <div className="preview-text-wrap">
                  <PreviewVideo video={LevelsVideo} />A three-level progress
                  tracker for goals completed in stages, or tracking whether
                  progress is low, medium, and high.
                </div>
                <span className="great-for-text">
                  Great for: a living space's level of tidiness or how much
                  general progress was made on a project.
                </span>
              </>
            ) : hoveredTemplate === "Sets" ? (
              <>
                <div className="preview-text-wrap">
                  <PreviewVideo video={SetsVideo} />
                  Track progress in sets and repetitions.
                </div>
                <span className="great-for-text">
                  Great for: exercise routines, practice schedules, and
                  habit-building.
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <AddSomeGoals
          listName={listName}
          template={template}
          selectedTab={selectedTab}
        />
      )}
    </>
  );
}
