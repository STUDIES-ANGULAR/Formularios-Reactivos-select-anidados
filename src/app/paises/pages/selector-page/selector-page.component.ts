import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {
  
  miFormulario: FormGroup = this.fb.group({
    continente: ['', Validators.required],
    pais: ['', Validators.required],
  })

  //llenar selectores
  continentes: string [] = [];
  paises: any;

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.continentes = this.paisesService.continentes;

    this.miFormulario.get('continente')?.valueChanges
        .subscribe( continente => {
          console.log(continente);

          this.paisesService.getPaisesPorContinenete( continente )
              .subscribe( paises => {
                this.paises = paises;
                console.log(this.paises)
              })
        })
  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
