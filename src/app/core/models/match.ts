import { Equipe } from './equipe';
export interface Match {
  id?:string;
  stade?:string;
  ville?: string;
  equipe1?:Equipe;
  equipe2?:Equipe;
  horaire?:Date;
}
