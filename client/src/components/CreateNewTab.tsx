import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createTab } from "../ApiService.js";
import { useAppContext } from "../AppContext.js";
import { State, Action, Tab } from "../types/types.js";

type FormData = {
  name: string;
  icon_name: string;
};

export default function CreateNewTab() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext() as {
    state: State;
    dispatch: (action: Action) => void;
  };
  const { tabs } = state;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const allIcons = [
    "rocket-icon.png",
    "sprout-icon.png",
    "book-icon.png",
    "meal-icon.png",
    "moneybag-icon.png",
    "star-icon.png",
    "barbell-icon.png",
    "sun-icon.png",
    "piggybank-icon.png",
    "lightning-icon.png",
    "lightbulb-icon.png",
    "plane-globe-icon.png",
  ];

  const watchIconName = watch("icon_name");

  const findPath = (name: string) => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    if (!data.name || !data.icon_name) {
      alert("Please fill in all of the fields");
      return;
    }

    const newTab: Omit<Tab, "id"> = {
      name: data.name,
      icon_name: data.icon_name,
    };

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const createdTab = await createTab(newTab);
      if (createdTab) {
        dispatch({ type: "CREATE_TAB", payload: createdTab });
        console.log("New tab created successfully: ", createdTab);
        // Navigate to the new tab's path
        const path = findPath(data.name);
        navigate(`/${path}`);
      } else {
        throw new Error("Failed to create tab");
      }
    } catch (error) {
      console.error("Error submitting tab:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Handle icon selection
  const handleIconSelect = (icon: string) => {
    setValue("icon_name", icon); // Manually update the form data with the icon name.
  };

  return (
    <div className="new-tab-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="create-tab-text">Name your tab</span>
        <input
          type="text"
          id="name-tab"
          {...register("name", { required: "Tab name is required" })}
          placeholder="Enter tab name"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <span className="create-tab-text">Choose your tab icon:</span>
        <div className="icon-list">
          {allIcons.map((icon) => (
            <img
              src={`/icons/${icon}`}
              className={`icon-choice ${
                watchIconName === icon ? "icon-chosen" : ""
              }`}
              onClick={() => handleIconSelect(icon)}
              alt={icon}
            />
          ))}
        </div>
        {errors.icon_name && <p>Please choose an icon</p>}
        <button id="submit-new-tab" type="submit">
          Create Tab
        </button>
      </form>
    </div>
  );
}
