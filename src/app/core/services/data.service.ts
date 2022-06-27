import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';//gestion des erreurs
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app-error';


// @Injectable({
//   providedIn: 'root'
// })
export class DataService {


  constructor(private url : string ,private  http: HttpClient) { }

  getALL(){
    return  this.http.get(this.url)
                .map((response: any) => response)
                .catch(this.handleError)
  }

  create(resource :any){
    return this.http.post(this.url, resource)
        .catch(this.handleError)
  }

  update(resource :any){
    return  this.http.put(this.url+'/'+resource.id, resource)
        .catch(this.handleError)
  }

  delete(resource : any ){

    return this.http.delete(this.url+'/'+resource.id)
        .catch(this.handleError)
  }



  private handleError (error:Response): Observable<never>{

    if(error.status === 404){
      return Observable.throw(new NotFoundError);
    }
    if(error.status === 400){
      return Observable.throw(new BadInput);
    }
    return Observable.throw(new AppError)

  }
}
