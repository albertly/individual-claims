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
}

// Navigation
export type NavigationType = {
  page: number;
  direction: Direction;
};

type NavigationPayload = {
  [Types.SetPage]: NavigationType; //ToDo: should be path
};

export type NavigationActions = ActionMap<NavigationPayload>[keyof ActionMap<NavigationPayload>];

export const navigationReducer = (state: NavigationType, action: NavigationActions) => {
  switch (action.type) {
    case Types.SetPage:
      if (state.page !== action.payload.page) {
        const nav =  {
            page: action.payload.page,
            direction:
                  action.payload.page - state.page > 0
                ? Direction.Forward
                : Direction.Back,
          };      
        return nav; 
      }
      return state;
    default:
      return state;
  }
};

