import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v3.1'
  private baseUrlv2: string = 'https://restcountries.com/v2'
  private _continentes: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get continentes(): string[] {
    return [ ...this._continentes ];
  }

  constructor( private http: HttpClient ) { }
  
  
  getPaisesPorContinenete(region: string){
    return this.http.get(`${ this.baseUrl }/region/${ region }?fields=name,cca3`);
  }

  getPaisPorCodigo( codigo: string): Observable<Pais | null> {
    if( !codigo ){
      //of permite devolver un observable
      return of( null )
    }

    const url = ` ${ this.baseUrlv2 }/alpha/${ codigo }`;
    return this.http.get<Pais>(url);

  }
}
