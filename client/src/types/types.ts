export interface Tab {}

export interface Goal {}

export interface State {
  tabs: Tab[];
  goals: Goal[];
  isLoading: boolean;
  goalXPBar: number;
  currentXP: number;
}
