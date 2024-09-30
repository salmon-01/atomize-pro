import { createContext, useContext } from "react";
import { AppContextType } from "./types/types";

// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to access context easily
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
