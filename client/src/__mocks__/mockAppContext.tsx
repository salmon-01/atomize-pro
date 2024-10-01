import React from "react";
import { AppContext } from "../AppContext";
import { vi } from "vitest";
import { AppContextType } from "../types/types";
import { mockTabData } from "./mockTabData";
import { mockSimpleListData } from "./mockSimpleList";

// Assuming this matches your actual initialState
const mockInitialState = {
  goals: mockSimpleListData,
  tabs: mockTabData,
  isLoading: false,
  goalXPBar: 0,
  currentXP: 0,
};

// Create a mock dispatch function
const mockDispatch = vi.fn();

// Create a mock context value
export const mockAppContextValue: AppContextType = {
  state: mockInitialState,
  dispatch: mockDispatch,
};

export const MockAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppContext.Provider value={mockAppContextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Utility function to get the mock context value (useful in tests)
export const getMockAppContextValue = () => mockAppContextValue;
