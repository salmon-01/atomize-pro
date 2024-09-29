import { createContext, useContext } from "react";

// Create a form context
const CreateListContext = createContext(null);

export const useFormContext = () => useContext(CreateListContext);

export const CreateListProvider = ({ children, formData }) => {
  return (
    <CreateListContext.Provider value={formData}>
      {children}
    </CreateListContext.Provider>
  );
};
