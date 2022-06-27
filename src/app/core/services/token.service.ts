import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  set(data: any) {
    localStorage.setItem('token', data.token);// enregistrer Token dans local storage
    localStorage.setItem('id',data.id); // enregistrer id dans local storage

  }

  //créer token && id dans localstorage
  handle(data: any){
    this.set(data);
  }

  //recuperer token dans local storage
  getToken(){
    return localStorage.getItem('token');
  }
  //recuperer id dans local storage
  getId(){
    return localStorage.getItem('id');
  }
  //supprimer l'element token && id
  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
  //atob() : base64 to ascii
  //recupurer le token et le decoder en ascii  et le mettre dans payload  et le retourner  en json
  decode(payload : any){
    //console.log('payload', payload);
    return JSON.parse(atob(payload));
  }

  // recuperer le payload
  payload(token : any){
    const payload =token.split('.')[1];
    console.log('payload : ', payload);
    return this.decode(payload);
  }
  //verifier si le token est valide
  isValid(){
    const token = this.getToken();
    const id = this.getId();

    if(token){

      const payload = this.payload(token);
      if(payload){
        return id == payload.id;
      }
    }
    return false;

  }

  //recuperer les information de payload
  getInfos(){

    const token =this.getToken();
    if (token){
      const payload =this.payload(token);
      return payload ? payload : null ;
    }
    return null;
  }

  //vérifier si le token est valide
  loggedIn(){
    return this.isValid();
  }
}

