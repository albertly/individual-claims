type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Direction {
  Forward = 0,
  Back = 1,
}

export enum Types {
  SetPage = 'SET_PAGE',
  SetNumber = 'SET_NUMBER'
}

// Navigation
export type NavigationType = {
  page: number;
  direction: Direction;
  sm: boolean[];
};

type NavigationPayload = {
  [Types.SetPage]: { page: number }; //ToDo: should be path
  [Types.SetNumber]: { page: number };
};

export type NavigationActions = ActionMap<NavigationPayload>[keyof ActionMap<
  NavigationPayload
>];

export const navigationReducer = (
  state: NavigationType,
  action: NavigationActions
) => {
  switch (action.type) {
    case Types.SetNumber:
      const smTmp = [...state.sm];
      smTmp[action.payload.page] = true;
      return {...state, sm: smTmp};
    case Types.SetPage:      
      if (state.page !== action.payload.page) {
          return {
            page: action.payload.page,
            direction:
              action.payload.page - state.page > 0
                ? Direction.Forward
                : Direction.Back,
            sm: [...state.sm],          
          };
      }
      return state;
    default:
      return state;
  }
};
