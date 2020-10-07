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
  AddDoc = 'ADD_DOC',
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

export const insReducer = (
  state: InsType,
  action: DocsActions | InsActions | TreatActions
) => {
  switch (action.type) {
    case Types.SetIns:
      return { ...action.payload };
    default:
      return state;
  }
};

// Treatment
export type TreatDetail = {
  treatId: number;
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

export const treatReducer = (
  state: TreatType,
  action: DocsActions | InsActions | TreatActions
) => {
  switch (action.type) {
    case Types.SetTreat:
      return { ...action.payload };
    case Types.AddTreatDetail:
      return {
        ...state,
        treatments: [...state.treatments, { ...action.payload }],
      };
    default:
      return state;
  }
};

// Docs
export type DocsType = {
  invoice?: File | string;
  medical?: File;
  miscellaneous: File[];
  temp: string;
};

type DocsPayload = {
  [Types.AddDoc]: DocsType;
};

export type DocsActions = ActionMap<DocsPayload>[keyof ActionMap<DocsPayload>];

export const docsReducer = (
  state: DocsType,
  action: DocsActions | InsActions | TreatActions
) => {
  switch (action.type) {
    case Types.AddDoc:      
      return {...action.payload};
    default:
      return state;
  }
};
