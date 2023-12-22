import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-formulario-actualizar',
  templateUrl: './formulario-actualizar.component.html',
  styleUrls: ['./formulario-actualizar.component.css']
})
export class FormularioActualizarComponent {

  constructor( private routerr: ActivatedRoute, /*private router: Route*/){}

  numDoc= Number;

  ngOnInit(): void{
    this.routerr.params.subscribe((params) => {
      this.numDoc = params['dato'];
    });

    console.log(this.numDoc);
  }

  cerrarModal(){
    // this.router.navigate(['7'])
  }


}











