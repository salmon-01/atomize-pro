export interface Tab {
  name: string;
  icon: string;
  order_no: number;
}

export interface Goal {
  id: number;
  name: string;
  list: string;
  tab: string;
  color: string;
  order_no: number;
  active: boolean;
  complete: boolean;
  last_completed: string | null;
  type: string;
}

export interface State {
  tabs: Tab[];
  goals: Goal[];
  isLoading: boolean;
  goalXPBar: number;
  currentXP: number;
}
