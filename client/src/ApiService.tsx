import axios from "axios";
import { Goal, Tab } from "./types/types";

const BASE_URL = "http://localhost:3000/api";

// CREATION: Goals, Lists, and Tabs

export const createGoal = async (goalData: Goal) => {
  const endpoint = selectEndpoint(goalData);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalData),
    });

    if (!response.ok) {
      throw new Error("Failed to create goal");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating goal:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error creating goal:", error);
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const createTab = async (tab: Tab) => {
  const postRequest = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tab),
  };
  try {
    const response = await fetch(`${BASE_URL}/tabs/`, postRequest);
    if (!response.ok) {
      console.log("Network response when creating a tab was not OK");
      return;
    } else {
      const data = await response.json();
      console.log("Network request to create tab was sent successfully", data);
    }
  } catch (error) {
    console.log(error, "Error sending network request to create tab");
  }
};

// // Creating a service to send newly created list and it's goals to backend - Need to insert proper route
// export const createListWithGoals = async (listData) => {
//   try {
//     const response = await fetch("/api/INSERT_PROPER_ROUTE", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(listData),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || "Failed to create list with goals");
//     }

//     return { success: true, data };
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       // The error is an instance of the Error class
//       console.error("Error creating list with goals:", error.message);
//       return { success: false, error: error.message };
//     } else {
//       // Handle cases where error is not an instance of Error (e.g., string, object)
//       console.error("Unknown error creating goal:", error);
//       return { success: false, error: "An unknown error occurred" };
//     }
//   }
// };

// FETCHING STORED DATA

export const fetchAllTabs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tabs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.log("Network response when fetching tabs was not OK");
      return [];
    }
    const data = await response.json();
    console.log("Tabs fetched successfully:", data);
    return data; // This will be an array
  } catch (error) {
    console.log("Error fetching tabs:", error);
    return [];
  }
};

export const fetchAllGoals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tabs/lists/all`);
    console.log("Goals fetched!");
    return response.data;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
};

// EDIT DATA

export const updateGoalProgress = async (goal: Goal) => {
  const endpoint = selectEndpoint(goal);

  const putRequest = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  };
  try {
    const response = await fetch(
      `${endpoint}/task/${goal.id}/status`,
      putRequest
    );
    if (!response.ok) {
      console.log("Network response when storing goal progress was not ok");
      return;
    } else {
      await response.json();
      console.log("Goal progress updated successfully");
    }
  } catch (error) {
    console.log("Error storing goal progress");
  }
};

// export const insertListPosition = async (tabName, listName, col) => {
//   const postRequest = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ tabName, listName, col }),
//   };
//   try {
//     const response = await fetch(`${BASE_URL}/tabs/position`, postRequest);
//     if (!response.ok) {
//       console.log("Network response when inserting list position was not ok");
//       return;
//     } else {
//       await response.json();
//       console.log("List position posted successfully");
//     }
//   } catch (error) {
//     console.log("Error posting events");
//   }
// };

// DELETE DATA

export const deleteTab = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/tabs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.log("Failed to delete the tab");
      return;
    }
    const data = await response.json();
    console.log("Tab deleted successfully:", data);
  } catch (error) {
    console.log("Error deleting tab:", error);
  }
};

export const deleteGoal = async (goal: Goal) => {
  const endpoint = selectEndpoint(goal);

  try {
    const response = await fetch(`${endpoint}/task/${goal.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal }),
    });
    if (!response.ok) {
      console.log("Failed to delete the goal");
      return;
    }
    const data = await response.json();
    console.log("Goal deleted successfully:", data);
  } catch (error) {
    console.log("Error deleting goal:", error);
  }
};

// export const deleteListPosition = async (tabName, listName) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/tabs/${tabName}/position/${listName}`,
//       {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify({ tabName, listName })
//       }
//     );
//     if (!response.ok) {
//       console.log("Failed to delete list position");
//       return;
//     }
//     const data = await response.json();
//     console.log("List position deleted successfully:", data);
//   } catch (error) {
//     console.log("Error deleting list position:", error);
//   }
// };

// OTHER

// const resetGoals = async () => {
//   // if (readDate(new Date()) !== lastLoggedIn) {
//   // }
// };

// const readDate = (date: Date) => {
//   return date.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// };

// Select endpoint utility function:

function selectEndpoint(goal: Goal) {
  if (!goal || !goal.type) {
    throw new Error("Invalid goal data");
  }
  let endpoint = "";
  console.log(goal.type);
  // Select the appropriate endpoint based on the template type
  switch (goal.type) {
    case "Simple List":
      endpoint = `${BASE_URL}/simplelists`;
      break;
    case "Progress Bar":
      endpoint = `${BASE_URL}/progressbars`;
      break;
    case "Levels":
      endpoint = `${BASE_URL}/levels`;
      break;
    case "Sets":
      endpoint = `${BASE_URL}/sets`;
      break;
    default:
      throw new Error("Unknown template type");
  }

  return endpoint;
}
