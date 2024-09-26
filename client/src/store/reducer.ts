

export Type Action =
| { type: 'SET_TABS'; payload: Tab[] }
| { type: 'SET_GOALS'; payload: Goals[] }
| { type: 'CREATE_TAB'; payload: Tab }
| { type: 'CREATE_GOAL'; payload: Goal }
| { type: 'UPDATE_GOAL'; payload: UNSURE_YET }
| { type: 'UPDATE_LIST'; payload: UNSURE_YET }
| { type: 'DELETE_TAB'; payload: UNSURE_YET };
| { type: 'DELETE_GOAL'; payload: UNSURE_YET };
| { type: 'DELETE_LIST_POSITION'; payload: UNSURE_YET };
| { type: 'SET_LOADING'; payload: boolean };

export const initialState = {
  tabs: [] as Destination[],
  goals: [] as Triptype[],
  isLoading: false,
};

export function reducer(state: typeof initialState = initialState, action: Action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}