import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
  idCiudadFKUsuario: any= 1;
  fechaNacimientoUsuario: any;
  emailUsuario: string='';
  telefonoUsuario: any;
  idOcupacionFKUsuario: any= 1;


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
      alert("Se registro correctamente")

    } else {
      this.modal
      window.location.reload();
      alert("hubo un error al registrar el usuario")
    }});


 }

}
