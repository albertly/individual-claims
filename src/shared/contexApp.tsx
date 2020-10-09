/* eslint-disable eqeqeq */
import React, { useReducer } from 'react';
import { Pages, Paths } from './constants';
import {
  navigationReducer,
  NavigationActions,
  NavigationType,
  Types,
  Direction,
} from './reducersApp';

// Context
type InitialStateType = {
  navigation: NavigationType;
};

const initialState: InitialStateType = {
  navigation: {
    direction: Direction.Forward,
    page: Pages[Paths.MAIN],
  },
};

const AppContext = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<NavigationActions>;
}>({ state: initialState, dispatch: async () => null });

const mainReducer = (
  { navigation }: InitialStateType,
  action: NavigationActions
) => ({
  navigation: navigationReducer(navigation, action),
});

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider, Types, Direction };
export type { NavigationType };
