/* eslint-disable eqeqeq */
import React, { useReducer } from 'react';

import {
  insReducer,
  treatReducer,
  InsActions,
  TreatActions,
  InsType,
  TreatType,
  TreatDetail,
  Types,
} from './reducersData';

// Context
type InitialStateType = {
  insured: InsType;
  treatment: TreatType;
};

const initialState: InitialStateType = {
  insured: {
    insured: '',
    mobile: '',
    email: '',
  },
  treatment: {
    invoice: 0,
    doctorId: undefined,
    treatments: [],
  },
};

const DataContext = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<InsActions | TreatActions>;
}>({ state: initialState, dispatch: () => null });

const mainReducer = (
  { insured, treatment }: InitialStateType,
  action: InsActions | TreatActions
) => ({
  insured: insReducer(insured, action),
  treatment: treatReducer(treatment, action),
});

// eslint-disable-next-line react/prop-types
const DataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider, Types };
export type { InsType, TreatType, TreatDetail };
