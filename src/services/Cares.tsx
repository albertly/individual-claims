import cares from './cares.json';

export interface ICare {
  item: string;
}

export function getCares(): ICare[] {
  return cares;
}
