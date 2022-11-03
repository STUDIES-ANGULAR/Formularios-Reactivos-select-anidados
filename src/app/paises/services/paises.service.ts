import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v2';
  private _continentes: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get continentes(): string[] {
    return [ ...this._continentes ];
  }

  constructor( private http: HttpClient ) { }
  
  
  getPaisesPorContinenete( region: string ): Observable<PaisSmall[]>{
    
    const url =`${ this.baseUrl }/region/${ region }?fields=alpha3Code,name`;
    return this.http.get<PaisSmall[]>( url );

  }

  getPaisPorCodigo( codigo: string): Observable<Pais | null> {
    if( !codigo ){
      //of permite devolver un observable
      return of( null )
    }

    const url = ` ${ this.baseUrl }/alpha/${ codigo }`;
    return this.http.get<Pais>(url);

  }


}
