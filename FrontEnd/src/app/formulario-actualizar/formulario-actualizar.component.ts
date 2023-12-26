import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-formulario-actualizar',
  templateUrl: './formulario-actualizar.component.html',
  styleUrls: ['./formulario-actualizar.component.css']
})
export class FormularioActualizarComponent {

  constructor( private routerr: ActivatedRoute,  private router: Router, private http: HttpClient){}

  numDoc= Number;
  usuario: any[] = [];
  ciudades: any[] = [];
  ocupaciones: any[] = [];

  nombresUsuario: string='';
  apellidosUsuario: string='';
  idCiudadFKUsuario: any;
  fechaNacimientoUsuario: any;
  emailUsuario: string='';
  telefonoUsuario: any;
  estadoUsuario: any;
  idOcupacionFKUsuario: any;

  errorCampo: String='';


  async ngOnInit(){
    this.routerr.params.subscribe((params) => {
      this.numDoc = params['dato'];
    });

    this.http.get<any>(`http://127.0.0.1:4000/api/usuario/${this.numDoc}`).subscribe(data => {
      console.log(data, 'eeeeeeeeeeeee');
      if(data.exito == true){
      this.usuario=data.resultado
      console.log(this.usuario, 'aaaaaaaaaaaaaaaaaaaaaaa')
      this.nombresUsuario=this.usuario[0]['nombresUsuario']
      this.apellidosUsuario=this.usuario[0]['apellidosUsuario']
      this.idCiudadFKUsuario=this.usuario[0]['idCiudad']
      this.fechaNacimientoUsuario=this.usuario[0]['fechaNacimientoUsuario']
      this.emailUsuario=this.usuario[0]['emailUsuario']
      this.telefonoUsuario=this.usuario[0]['telefonoUsuario']
      this.idOcupacionFKUsuario=this.usuario[0]['idOcupacion']
      this.estadoUsuario=this.usuario[0]['estadoUsuario']
      }});

    await this.ciudadesCarga()
    await this.ocupacionesCarga()

  }
  private async ciudadesCarga(){
    await this.http.get<any>('http://127.0.0.1:4000/api/ciudad/').subscribe(data => {
      console.log(data);
      if(data.exito == true){
      this.ciudades=data.resultado
      }});
  }

  private async ocupacionesCarga(){
    await this.http.get<any>('http://127.0.0.1:4000/api/ocupacion/').subscribe(data => {
      console.log(data);
      if(data.exito == true){
      this.ocupaciones=data.resultado
      }});
  }

  cerrarModal(){
    // this.router.navigate(['7'])
    this.router.navigate(['/'])
    Swal.fire({
      title: "Cerrado!",
      text: "Se cancelo la accion!",
      icon: "error"
    });
  }

  actualizar(){

    // Expresión regular para validar el formato del correo electrónico
  const regexCorreo = /^[a-zA-Z0-9._-]+@gmail\.com$/;

  /* Validación de campos */
  if( this.nombresUsuario.toString()==''
  || this.apellidosUsuario.toString()=='' || this.emailUsuario.toString()=='' || this.telefonoUsuario.toString()==''
   || this.fechaNacimientoUsuario.toString()==''){
    this.errorCampo='Hay algunos campos vacios'
  } else{
       if(this.nombresUsuario.toString().length<3) {
          this.errorCampo="El nombre debe tener almenos 3 caracteres"
        } else if(this.apellidosUsuario.toString().length<3) {
          this.errorCampo="El apellido debe tener almenos 3 caracteres"
        } else if(this.fechaNacimientoUsuario.toString()=='0000-00-00') {
          this.errorCampo="debes poner una fecha de nacimineto"
        } else if(regexCorreo.test(this.emailUsuario)==false) {
          this.errorCampo="El correo electronico debe ser del dominio @gmail.com"
        }   else if(this.telefonoUsuario.toString().length<10) {
          this.errorCampo="El numero de telefono debe de ser de almenos 10 digitos"
        } else {
                const body={
                  "nombresUsuario": this.nombresUsuario,
                  "apellidosUsuario": this.apellidosUsuario,
                  "idCiudadFKUsuario": this.idCiudadFKUsuario,
                  "fechaNacimientoUsuario": this.fechaNacimientoUsuario,
                  "emailUsuario": this.emailUsuario,
                  "telefonoUsuario": this.telefonoUsuario,
                  "estadoUsuario": this.estadoUsuario,
                  "idOcupacionFKUsuario": this.idOcupacionFKUsuario
                }
                this.http.put<any>(`http://127.0.0.1:4000/api/usuario/${this.numDoc}`, body).subscribe(data => {
                  console.log(data, body);
                  if(data.exito == true){
                    this.router.navigate(['/'])
                    Swal.fire({
                      title: "Perfecto!",
                      text: "Se actualizo correctamente!!!",
                      icon: "success"
                    });

                  } else {
                    this.router.navigate(['/'])
                    Swal.fire({
                      title: "Hubo un fallo!",
                      text: "No se actualizo correctamte :(",
                      icon: "error"
                    });
                  }});

  }
}
}

}











