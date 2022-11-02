import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v3.1'
  private _continentes: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get continentes(): string[] {
    return [ ...this._continentes ];
  }

  constructor( private http: HttpClient ) { }
  
  
  getPaisesPorContinenete(region: string){
    return this.http.get(`${ this.baseUrl }/region/${ region }?fields=name,cca3`);
  }
}
