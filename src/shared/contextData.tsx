/* eslint-disable eqeqeq */
import React, { useReducer } from 'react';

import {
  insReducer,
  treatReducer,
  docsReducer,
  InsActions,
  TreatActions,
  DocsActions,
  InsType,
  TreatType,
  TreatDetail,
  DocsType,
  Types,
} from './reducersData';

// Context
type InitialStateType = {
  insured: InsType;
  treatment: TreatType;
  docs: DocsType;
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
  docs: {
    invoice: undefined,
    medical: undefined,
    miscellaneous: [],
    temp: '',
  }
};

const DataContext = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<InsActions | TreatActions | DocsActions>;
}>({ state: initialState, dispatch: () => null });

const mainReducer = (
  { insured, treatment, docs }: InitialStateType,
  action: InsActions | TreatActions | DocsActions
) => ({
  insured: insReducer(insured, action),
  treatment: treatReducer(treatment, action),
  docs: docsReducer(docs, action),
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
export type { InsType, TreatType, TreatDetail, DocsType };
