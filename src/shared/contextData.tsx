/* eslint-disable eqeqeq */
import React, { useReducer } from 'react';

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

export enum Types {
  SetIns = 'SET_DATA_INS',
  SetTreat = 'SET_DATA_TREAT',
  AddTreatDetail = 'ADD_TREAT_DETAIL',
}

// Insured
export type InsType = {
  insured: string;
  mobile: string;
  email: string;
};

type InsPayload = {
  [Types.SetIns]: InsType;
};

export type InsActions = ActionMap<InsPayload>[keyof ActionMap<InsPayload>];

const insReducer = (state: InsType, action: InsActions | TreatActions) => {
  switch (action.type) {
    case Types.SetIns:
      return { ...action.payload };
    default:
      return state;
  }
};

// Treatment
export type TreatDetail = {
  id: number;
  treatDate: Date;
  cost: number;
  notes: string;
  tooth?: number;
  CL_V?: boolean;
  L_P?: boolean;
  B?: boolean;
  D?: boolean;
  M?: boolean;
  O?: boolean;
};

export type TreatType = {
  invoice: number;
  doctorId?: number;
  treatments: TreatDetail[];
};

type TreatPayload = {
  [Types.SetTreat]: TreatType;
  [Types.AddTreatDetail]: TreatDetail;
};

export type TreatActions = ActionMap<TreatPayload>[keyof ActionMap<
  TreatPayload
>];

const treatReducer = (state: TreatType, action: InsActions | TreatActions) => {
  
  switch (action.type) {
    case Types.SetTreat:
      return { ...action.payload };
    case Types.AddTreatDetail:
      return {...state, treatments: [...state.treatments, {...action.payload}]};
    default:
      return state;
  }
};

// Context
export type InitialStateType = {
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

export { DataContext, DataProvider };
