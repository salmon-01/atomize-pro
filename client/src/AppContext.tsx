import { createContext, useContext } from "react";

// Create the context
export const AppContext = createContext();

// Custom hook to access context easily
export const useAppContext = () => useContext(AppContext);
