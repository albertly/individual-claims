import treatments from './treatments.json';

export type Treatment = {
  id: number;
  kind: number;
  item: string;
};

export function getTreatments(): Treatment[] {
  return treatments;
}
