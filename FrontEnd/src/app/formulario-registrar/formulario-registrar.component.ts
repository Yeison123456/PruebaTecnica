// Importa módulos necesarios desde Angular y otras bibliotecas
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

// Declara el componente Angular y especifica su selector, plantilla y estilos
@Component({
  selector: 'app-formulario-registrar',
  templateUrl: './formulario-registrar.component.html',
  styleUrls: ['./formulario-registrar.component.css']
})
export class FormularioRegistrarComponent {
  // Variables para manejar el estado del modal y los datos del formulario
  modal: boolean = false;
  numeroDocumentoUsuario: any;
  nombresUsuario: string = '';
  apellidosUsuario: string = '';
  idCiudadFKUsuario: any = 1;
  fechaNacimientoUsuario: any;
  emailUsuario: string = '';
  telefonoUsuario: any;
  idOcupacionFKUsuario: any = 1;

  // Mensaje de error para campos de formulario
  errorCampo: String = '';

  // Arreglos para almacenar datos de ciudades y ocupaciones
  ciudades: any[] = [];
  ocupaciones: any[] = [];

  // Constructor del componente que recibe una instancia de HttpClient
  constructor(private http: HttpClient) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit() {
    try {
      // Carga datos de ciudades y ocupaciones al iniciar el componente
      await this.ciudadesCarga();
      await this.ocupacionesCarga();
    } catch (err) {
      console.log(err);
    }
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

  // Método para abrir el modal de registro y mostrar datos de ciudades y ocupaciones
  abrirModalRegistrar() {
    this.modal = true;
    console.log(this.ciudades, this.ocupaciones);
  }

  // Método para cerrar el modal y mostrar un mensaje de cancelación
  cerrarModal() {
    this.modal = false;
    Swal.fire({
      title: "Cerrado!",
      text: "Se canceló la acción!",
      icon: "error"
    });
  }

  // Método para registrar un nuevo usuario mediante una solicitud POST a la API
  registrar() {
    // Expresión regular para validar el formato del correo electrónico
    const regexCorreo = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    /* Validación de campos */
    if (
      this.numeroDocumentoUsuario.toString() == '' ||
      this.nombresUsuario.toString() == '' ||
      this.fechaNacimientoUsuario.toString() == '' ||
      this.apellidosUsuario.toString() == '' ||
      this.emailUsuario.toString() == '' ||
      this.telefonoUsuario.toString() == ''
    ) {
      this.errorCampo = 'Hay algunos campos vacíos';
    } else {
      if (this.numeroDocumentoUsuario.toString().length < 5 == true || this.numeroDocumentoUsuario < 0) {
        this.errorCampo = `El número de documento debe tener al menos 5 caracteres y ser mayor a 0`;
      } else if (this.nombresUsuario.toString().length < 3) {
        this.errorCampo = "El nombre debe tener al menos 3 caracteres";
      } else if (this.apellidosUsuario.toString().length < 3) {
        this.errorCampo = "El apellido debe tener al menos 3 caracteres";
      } else if (this.fechaNacimientoUsuario.toString() == '00-00-0000') {
        this.errorCampo = "Debes poner una fecha de nacimiento";
      } else if (regexCorreo.test(this.emailUsuario) == false) {
        this.errorCampo = "El correo electrónico debe ser del dominio @gmail.com";
      } else if (this.telefonoUsuario.toString().length < 10) {
        this.errorCampo = "El número de teléfono debe tener al menos 10 dígitos";
      } else {
        // Crea un objeto con los datos del usuario a registrar
        let body = {
          "numeroDocumentoUsuario": this.numeroDocumentoUsuario,
          "nombresUsuario": this.nombresUsuario,
          "apellidosUsuario": this.apellidosUsuario,
          "idCiudadFKUsuario": this.idCiudadFKUsuario,
          "fechaNacimientoUsuario": this.fechaNacimientoUsuario,
          "emailUsuario": this.emailUsuario,
          "telefonoUsuario": this.telefonoUsuario,
          "idOcupacionFKUsuario": this.idOcupacionFKUsuario
        };

        // Realiza una solicitud POST para registrar el usuario
        this.http.post<any>('http://127.0.0.1:4000/api/usuario/', body).subscribe(data => {
          console.log(data, body);
          // Muestra un mensaje de éxito o error al registrar el usuario
          if (data.exito == true) {
            this.modal = false;
            window.location.reload();
            Swal.fire({
              title: "¡Perfecto!",
              text: "Se registró correctamente!",
              icon: "success"
            });
          } else {
            this.modal = false;
            window.location.reload();
            Swal.fire({
              title: "Hubo un error!",
              text: "Hubo un error en el registro :(",
              icon: "error"
            });
          }
        });
      }
    }
  }
}
