import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-registrar',
  templateUrl: './formulario-registrar.component.html',
  styleUrls: ['./formulario-registrar.component.css']
})
export class FormularioRegistrarComponent {
  modal: boolean=false;
  numeroDocumentoUsuario: any;
  nombresUsuario: string='';
  apellidosUsuario: string='';
  idCiudadFKUsuario: any;
  fechaNacimientoUsuario: any;
  emailUsuario: string='';
  telefonoUsuario: any;
  idOcupacionFKUsuario: any;

  errorCampo: String='';


  ciudades: any[] = [];
  ocupaciones: any[] = [];
  constructor(private http: HttpClient){}

  async ngOnInit() {

    try{
      await this.ciudadesCarga()
      await this.ocupacionesCarga()
    } catch(err){
      console.log(err)
    }



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


  abrirModalRegistrar(){
    this.modal=true;
    console.log(this.ciudades, this.ocupaciones)
  }

  cerrarModal(){
    this.modal=false;
}


 registrar(){
  // Expresión regular para validar el formato del correo electrónico
  const regexCorreo = /^[a-zA-Z0-9._-]+@gmail\.com$/;

/* Validación de campos */
if(this.numeroDocumentoUsuario.toString=='' || this.nombresUsuario.toString()==''
|| this.apellidosUsuario.toString()=='' || this.emailUsuario.toString()=='' || this.telefonoUsuario.toString()==''){
  this.errorCampo='Hay algunos campos vacios'
} else{
      if(this.numeroDocumentoUsuario.toString().length<5==true ||  this.numeroDocumentoUsuario<0){
        this.errorCampo=`El numero de documento debe tener almenos 5 caracteres y mayor a 0, ${this.numeroDocumentoUsuario.toString()}`
      } else if(this.nombresUsuario.toString().length<3) {
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
          let body={
            "numeroDocumentoUsuario": this.numeroDocumentoUsuario,
            "nombresUsuario": this.nombresUsuario,
            "apellidosUsuario": this.apellidosUsuario,
            "idCiudadFKUsuario": this.idCiudadFKUsuario,
            "fechaNacimientoUsuario": this.fechaNacimientoUsuario,
            "emailUsuario": this.emailUsuario,
            "telefonoUsuario": this.telefonoUsuario,
            "idOcupacionFKUsuario": this.idOcupacionFKUsuario
        }

        this.http.post<any>('http://127.0.0.1:4000/api/usuario/', body).subscribe(data => {
          console.log(data, body);
          if(data.exito == true){
            this.modal
            window.location.reload();
            alert('Se registro correctamete')
            Swal.fire({
              title: 'Se registro correctamente',
              icon: 'success',
            })

          } else {
            this.modal
            window.location.reload();
            alert('Hubo un error al momento de registrar')
            Swal.fire({
              title: 'Se registro correctamente',
              icon: 'error',
            })
          }});


        }
    }
  }
}
