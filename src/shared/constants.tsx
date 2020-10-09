//ToDo: An index signature parameter type cannot be a union type. Consider using a mapped object type instead.
// https://stackoverflow.com/questions/54438012/an-index-signature-parameter-type-cannot-be-a-union-type-consider-using-a-mappe

// enum Options {
//   ONE = 'one',
//   TWO = 'two',
//   THREE = 'three',
// }
// interface OptionRequirement {
//   someBool: boolean;
//   someString: string;
// }
// type OptionRequirements = {
//   [key in Options]: OptionRequirement; // Note that "key in".
// }

// ???type PagesPathEnum = Record<PagesPath, PagesPathEnum>

export enum Paths {
  MAIN = '/',
  INSURED = '/insured',
  TREATMENT = '/treatments',
  DOCS = '/docs',
  PAYMENT = '/payment',
  FINISH = '/finish',
}

type PagesType = {
  [key in Paths]: number; // Note that "key in".
};

export const Pages: PagesType = {
  [Paths.MAIN]: 0,
  [Paths.INSURED]: 1,
  [Paths.TREATMENT]: 2,
  [Paths.DOCS]: 3,
  [Paths.PAYMENT]: 4,
  [Paths.FINISH]: 5,
};

//ToDo: make type
// export const Pages:  PagesType = {
//   Paths.MAIN: {value:0},
//    Paths.MAIN: 0,
//   '/second': 1,
//   '/second/treatdetails': 2,
//   '/second/docs': 3,
//   '/second/payment': 4,
//   '/second/finish': 5,
// };
