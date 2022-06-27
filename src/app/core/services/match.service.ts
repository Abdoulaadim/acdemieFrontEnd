import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService extends DataService {

  constructor(http: HttpClient) {
    super('https://academiebackend.herokuapp.com/match', http);
   }
}
