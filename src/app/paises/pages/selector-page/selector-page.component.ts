import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from 'rxjs/operators'
import { PaisSmall } from '../../interfaces/paises.interfaces';

import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {
  
  miFormulario: FormGroup = this.fb.group({
    continente: ['', Validators.required],
    pais      : ['', Validators.required],
    frontera  : ['', Validators.required]
  })

  //llenar selectores
  continentes: string []    = [];
  paises     : PaisSmall[]  = [];
  fronteras  : string [] = [];

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.continentes = this.paisesService.continentes;

    //
    // this.miFormulario.get('continente')?.valueChanges
    //     .subscribe( continente => {
    //       console.log(continente);

    //       this.paisesService.getPaisesPorContinenete( continente )
    //           .subscribe( paises => {
    //             this.paises = paises;
    //             console.log(this.paises)
    //           })
    //     })


    //Cuando cambia el continente
    this.miFormulario.get('continente')?.valueChanges
      .pipe(
        //con el tap me permite recibir el continente, como no me interesa lo pongo as _  (el _ es un estandar ) y al saber que cambia, reseteo el valor del pais
        tap( ( _ ) =>{
          this.miFormulario.get('pais')?.reset('');
        }),
        //con el switchMap capturamos el observable y devolvemos un nuevo observable (modificamos la salida del observable original a paises)
        switchMap( continente => this.paisesService.getPaisesPorContinenete( continente ) )
        )
        .subscribe( paises =>{
        console.log(paises);
        this.paises = paises
      });


      //Cuando cambia el país
      this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap( ( _ ) => {
            this.fronteras = [];
            this.miFormulario.get('frontera')?.reset('');
          }),

          switchMap( codigoPais => this.paisesService.getPaisPorCodigo( codigoPais ) )
        )
        .subscribe( pais => {
          this.fronteras = pais?.borders || [];
        })
  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
