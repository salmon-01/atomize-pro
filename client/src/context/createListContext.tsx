import React, { createContext, useContext, ReactNode } from "react";
import { FormData } from "../types/types";

// Create a form context
const CreateListContext = createContext<FormData | null>(null);

export const useFormContext = () => {
  const context = useContext(CreateListContext);
  if (!context) {
    throw new Error("useFormContext must be used within a CreateListProvider");
  }
  return context;
};

interface CreateListProviderProps {
  children: ReactNode;
  formData: FormData;
}

export const CreateListProvider: React.FC<CreateListProviderProps> = ({
  children,
  formData,
}) => {
  return (
    <CreateListContext.Provider value={formData}>
      {children}
    </CreateListContext.Provider>
  );
};
