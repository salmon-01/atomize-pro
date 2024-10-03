import { useForm } from "react-hook-form";
import { useState } from "react";
import { CreateListProvider } from "../context/createListContext";
import PreviewVideo from "./PreviewVideo";
import SimpleListVideo from "../assets/vids/simplelist-animation.mp4";
import LevelsVideo from "../assets/vids/levels-animation.mp4";
import SetsVideo from "../assets/vids/sets-animation.mp4";
import ProgressBarVideo from "../assets/vids/progressbar-animation.mp4";
import "../styles/CreateNewList.css";
import AddSomeGoals from "./addtolist/AddSomeGoals";
import { useAppContext } from "../AppContext";
import { State } from "../types/types";

type FormData = {
  listName: string;
  template: string;
  selectedTab: number | null;
};

export default function CreateNewList() {
  const { state } = useAppContext() as { state: State };
  const { tabs } = state;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [hoveredTemplate, setHoveredTemplate] = useState("");
  const [selectedTab, setSelectedTab] = useState<number | null>(null);

  const listTypes = ["Simple List", "Progress Bar", "Sets", "Levels", "Mixed"];

  const template = watch("template");
  const listName = watch("listName");

  const handleSelectTab = (tabId: number) => {
    setSelectedTab(tabId);
    setValue("selectedTab", tabId, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    if (!data.selectedTab) {
      alert("Please choose a tab for your list!");
      return;
    }
    console.log("Form Data:", data);
  };

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
              <span
                key={type}
                className={`${
                  template === type ? "template-item-chosen" : "template-item"
                }`}
                onClick={() =>
                  setValue("template", type, { shouldValidate: true })
                }
                onMouseEnter={() => setHoveredTemplate(type)}
              >
                {type}
              </span>
            ))}
          </div>
          {errors.template && <p>Please choose a template</p>}

          <span className="form-text">ADD TO:</span>
          <div className="chosen-tab">
            {tabs.length > 0 ? (
              tabs.map((tab) => {
                if (!tab || tab.id === undefined) {
                  console.error("Invalid tab:", tab);
                  return null;
                }
                return (
                  <img
                    key={tab.id}
                    src={`/icons/${tab.icon_name}`}
                    className={`nav-icon ${
                      selectedTab === tab.id ? "chosen-tab-selected" : ""
                    }`}
                    onClick={() => handleSelectTab(tab.id as number)}
                    alt={`Tab ${tab.id}`}
                  />
                );
              })
            ) : (
              <p>No existing tabs!</p>
            )}
          </div>
          {errors.selectedTab && <p>Please choose a tab</p>}

          <input
            type="hidden"
            {...register("selectedTab", { required: true })}
          />

          <button id="add-goals-to-list" type="submit">
            Add Goal Data &rarr;
          </button>
        </form>
      </div>

      <div className="preview-list-container">
        <div className="preview-items">
          {hoveredTemplate === "Simple List" && (
            <>
              <div className="preview-text-wrap">
                <PreviewVideo video={SimpleListVideo} />
                Create a classic check-list and mark to-do items as you complete
                them
              </div>
              <span className="great-for-text">
                Great for: black-and-white goals, grocery lists, errands, and
                morning routines.
              </span>
            </>
          )}
          {hoveredTemplate === "Progress Bar" && (
            <>
              <div className="preview-text-wrap">
                <PreviewVideo video={ProgressBarVideo} />
                Increment progress by filling up a bar at your own pace
              </div>
              <span className="great-for-text">
                Great for: goals that can be measured in units, e.g. write 1000
                words, drink 2000 ml of water, or study for 45 minutes.
              </span>
            </>
          )}
          {hoveredTemplate === "Levels" && (
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
          )}
          {hoveredTemplate === "Sets" && (
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
          )}
        </div>
      </div>

      {selectedTab !== null && (
        <CreateListProvider
          formData={{
            selectedTab,
            listName: listName || "",
            template: template || "",
          }}
        >
          <AddSomeGoals />
        </CreateListProvider>
      )}
    </>
  );
}
