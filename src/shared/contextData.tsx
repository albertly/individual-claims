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
  Set = 'SET_DATA',
}

export type IIns = {
    insured: string;
    mobile: string;
    email: string;
};

type InsPayload = {
  [Types.Set]: IIns;
};


export type InsActions = ActionMap<InsPayload>[keyof ActionMap<InsPayload>];

interface IAction {
  type: string;
  payload: IIns;
}

const initialState: IIns = {
  insured: '',
  mobile: '',
  email: '',
};

const InsContext = React.createContext<{
  state: IIns;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const reducer = (state: IIns, action: InsActions) => {
  switch (action.type) {
    case Types.Set:
      return { ...action.payload };
    default:
      return state;
  }
};

const setData = (dispatch: React.Dispatch<IAction>, state: IIns) => {};

// eslint-disable-next-line react/prop-types
const ContextInsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InsContext.Provider value={{ state, dispatch }}>
      {children}
    </InsContext.Provider>
  );
};

export { InsContext, ContextInsProvider, setData };
