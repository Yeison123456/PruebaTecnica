// Importa módulos necesarios desde Angular y otras bibliotecas
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

// Declara el componente Angular y especifica su selector, plantilla y estilos
@Component({
  selector: 'app-formulario-actualizar',
  templateUrl: './formulario-actualizar.component.html',
  styleUrls: ['./formulario-actualizar.component.css']
})
export class FormularioActualizarComponent {

  // Constructor del componente que recibe instancias de ActivatedRoute, Router y HttpClient
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  // Variables para manejar el número de documento, datos del usuario, ciudades y ocupaciones
  numDoc: any;
  usuario: any[] = [];
  ciudades: any[] = [];
  ocupaciones: any[] = [];

  // Variables para almacenar datos del formulario
  numeroDocumentoUsuario: any;
  nombresUsuario: string = '';
  apellidosUsuario: string = '';
  idCiudadFKUsuario: any;
  fechaNacimientoUsuario: any;
  emailUsuario: string = '';
  telefonoUsuario: any;
  estadoUsuario: any;
  idOcupacionFKUsuario: any;

  // Mensaje de error para campos de formulario
  errorCampo: String = '';

  // Método que se ejecuta al inicializar el componente
  async ngOnInit() {
    // Obtiene el número de documento del parámetro de la ruta
    this.route.params.subscribe((params) => {
      this.numDoc = params['dato'];
    });

    // Realiza una solicitud HTTP para obtener datos del usuario con el número de documento
    this.http.get<any>(`http://127.0.0.1:4000/api/usuario/${this.numDoc}`).subscribe(data => {
      console.log(data, 'eeeeeeeeeeeee');
      // Verifica si la solicitud fue exitosa y actualiza los datos del usuario
      if (data.exito == true) {
        this.usuario = data.resultado;
        console.log(this.usuario, 'aaaaaaaaaaaaaaaaaaaaaaa');
        // Asigna valores a las variables del formulario
        this.numeroDocumentoUsuario = this.usuario[0]['numeroDocumentoUsuario'];
        this.nombresUsuario = this.usuario[0]['nombresUsuario'];
        this.apellidosUsuario = this.usuario[0]['apellidosUsuario'];
        this.idCiudadFKUsuario = this.usuario[0]['idCiudad'];
        this.fechaNacimientoUsuario = this.usuario[0]['fechaNacimientoUsuario'];
        this.emailUsuario = this.usuario[0]['emailUsuario'];
        this.telefonoUsuario = this.usuario[0]['telefonoUsuario'];
        this.idOcupacionFKUsuario = this.usuario[0]['idOcupacion'];
        this.estadoUsuario = this.usuario[0]['estadoUsuario'];
      }
    });

    // Carga datos de ciudades y ocupaciones
    await this.ciudadesCarga();
    await this.ocupacionesCarga();
  }

  // Método privado para cargar datos de ciudades desde la API
  private async ciudadesCarga() {
    await this.http.get<any>('http://127.0.0.1:4000/api/ciudad/').subscribe(data => {
      console.log(data);
      // Verifica si la solicitud fue exitosa y actualiza la lista de ciudades
      if (data.exito == true) {
        this.ciudades = data.resultado;
      }
    });
  }

  // Método privado para cargar datos de ocupaciones desde la API
  private async ocupacionesCarga() {
    await this.http.get<any>('http://127.0.0.1:4000/api/ocupacion/').subscribe(data => {
      console.log(data);
      // Verifica si la solicitud fue exitosa y actualiza la lista de ocupaciones
      if (data.exito == true) {
        this.ocupaciones = data.resultado;
      }
    });
  }

  // Método para cerrar el modal y mostrar un mensaje de cancelación
  cerrarModal() {
    this.router.navigate(['/']);
    Swal.fire({
      title: "Cerrado!",
      text: "Se canceló la acción!",
      icon: "error"
    });
  }

  // Método para actualizar los datos del usuario mediante una solicitud PUT a la API
  actualizar() {
    // Expresión regular para validar el formato del correo electrónico
    const regexCorreo = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    /* Validación de campos */
    if (
      this.nombresUsuario.toString() == '' ||
      this.apellidosUsuario.toString() == '' ||
      this.emailUsuario.toString() == '' ||
      this.telefonoUsuario.toString() == '' ||
      this.fechaNacimientoUsuario.toString() == ''
    ) {
      this.errorCampo = 'Hay algunos campos vacíos';
    } else {
      if (this.nombresUsuario.toString().length < 3) {
        this.errorCampo = "El nombre debe tener al menos 3 caracteres";
      } else if (this.apellidosUsuario.toString().length < 3) {
        this.errorCampo = "El apellido debe tener al menos 3 caracteres";
      } else if (this.fechaNacimientoUsuario.toString() == '0000-00-00') {
        this.errorCampo = "Debes poner una fecha de nacimiento";
      } else if (regexCorreo.test(this.emailUsuario) == false) {
        this.errorCampo = "El correo electrónico debe ser del dominio @gmail.com";
      } else if (this.telefonoUsuario.toString().length < 10) {
        this.errorCampo = "El número de teléfono debe tener al menos 10 dígitos";
      } else {
        // Crea un objeto con los datos del usuario a actualizar
        const body = {
          "numeroDocumentoUsuario": this.numeroDocumentoUsuario,
          "nombresUsuario": this.nombresUsuario,
          "apellidosUsuario": this.apellidosUsuario,
          "idCiudadFKUsuario": this.idCiudadFKUsuario,
          "fechaNacimientoUsuario": this.fechaNacimientoUsuario,
          "emailUsuario": this.emailUsuario,
          "telefonoUsuario": this.telefonoUsuario,
          "estadoUsuario": this.estadoUsuario,
          "idOcupacionFKUsuario": this.idOcupacionFKUsuario
        };

        // Realiza una solicitud PUT para actualizar los datos del usuario
        this.http.put<any>(`http://127.0.0.1:4000/api/usuario/${this.numDoc}`, body).subscribe(data => {
          console.log(data, body);
          // Muestra un mensaje de éxito o error al actualizar el usuario
          if (data.exito == true) {
            this.router.navigate(['/']);
            Swal.fire({
              title: "¡Perfecto!",
              text: "Se actualizó correctamente!!!",
              icon: "success"
            });
          } else {
            this.router.navigate(['/']);
            Swal.fire({
              title: "Hubo un fallo!",
              text: "No se actualizó correctamente :(",
              icon: "error"
            });
          }
        });
      }
    }
  }
}










