import { Equipe } from "./equipe";

export interface Entrainement {
  id?:string;
  stade?:string;
  ville?:string;
  description?:string;
  date_entrainement?:Date;
  date_Fin?:Date;
  equipe?:Equipe;
}
