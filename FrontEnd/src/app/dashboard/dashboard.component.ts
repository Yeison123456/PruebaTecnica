// Importa módulos necesarios desde Angular y otras bibliotecas
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Declara el componente Angular y especifica su selector, plantilla y estilos
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Declara variables de clase para almacenar datos de usuarios, ciudades, ocupaciones y el filtro de búsqueda
  usuarios: any[] = [];
  ciudades: any[] = [];
  ocupaciones: any[] = [];
  filtro: any = '';

  // Constructor del componente que recibe instancias de HttpClient y Router
  constructor(private http: HttpClient, private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit() {
    // Realiza una solicitud HTTP para obtener datos de usuarios desde una API
    this.http.get<any>('http://127.0.0.1:4000/api/usuario/').subscribe(data => {
      console.log(data);
      // Verifica si la solicitud fue exitosa y actualiza la lista de usuarios
      if (data.exito == true) {
        this.usuarios = data.resultado;
      }
    });
  }

  // Método para cambiar el estado de un usuario mediante una solicitud DELETE
  async CambiarEstado(numDoc: any) {
    this.http.delete<any>(`http://127.0.0.1:4000/api/usuario/${numDoc}`).subscribe(data => {
      console.log(data);
      // Muestra un mensaje de éxito o error al cambiar el estado del usuario
      if (data.exito == true) {
        Swal.fire({
          title: "Perfecto!",
          text: "Se cambio el estado correctamente!",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Hubo un error!",
          text: "Hubo un error en el cambio de estado :(",
          icon: "error"
        });
      }
      // Recarga la página después de un tiempo específico
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  // Método para navegar a una ruta específica al enviar datos
  enviarDato(numDoc: any) {
    this.router.navigate(['/receptor', numDoc]);
  }

  // Variables para paginación de datos
  itemsPorPagina = 4;
  paginaActual = 1;

  // Propiedad calculada para obtener datos paginados
  get datosPaginados() {
    const usuariosFiltrados = this.filtrarLista();
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return usuariosFiltrados.slice(inicio, fin);
  }

  // Propiedad calculada para obtener el número total de páginas
  get paginas(): number[] {
    const usuariosFiltrados = this.filtrarLista();
    const totalPaginas = Math.ceil(this.usuarios.length / this.itemsPorPagina);
    return Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }

  // Método para cambiar la página actual
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  // Método para filtrar la lista de usuarios según un criterio de búsqueda
  filtrarLista(): any[] {
    if (!this.usuarios) {
      return [];
    }
    return this.usuarios.filter(usuario =>
      Object.values(usuario).some(valor =>
        valor && valor.toString().toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
  }
}