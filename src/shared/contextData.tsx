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
}

export type IIns = {
  insured: string;
  mobile: string;
  email: string;
};

export type ITreat = {
  invoice: number;
  doctorId?: number;
};

type Payload = {
  [Types.SetIns]: IIns;
  [Types.SetTreat]: ITreat;
};

type InitialStateType = {
  insured: IIns;
  treatment: ITreat;
};

export type InsActions = ActionMap<Payload>[keyof ActionMap<Payload>];

interface IAction {
  type: string;
  payload: IIns | ITreat;
}

const initialState: InitialStateType = {
  insured: {
    insured: '',
    mobile: '',
    email: '',
  },
  treatment: {
    invoice: 0,
    doctorId: undefined,
  },
};

const InsContext = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const insReducer = (state: IIns, action: InsActions) => {
  switch (action.type) {
    case Types.SetIns:
      return { ...action.payload };
    default:
      return state;
  }
};

const treatReducer = (state: ITreat, action: InsActions) => {
  switch (action.type) {
    default:
      return state;
  }
};

const mainReducer = (
  { insured, treatment }: InitialStateType,
  action: InsActions
) => ({
  insured: insReducer(insured, action),
  treatment: treatReducer(treatment, action)
});

const setData = (dispatch: React.Dispatch<InsActions>, state: IIns) => {};

// eslint-disable-next-line react/prop-types
const ContextInsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <InsContext.Provider value={{ state, dispatch }}>
      {children}
    </InsContext.Provider>
  );
};

export { InsContext, ContextInsProvider, setData };
