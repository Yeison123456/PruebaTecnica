import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  usuarios: any[] = [];
  ciudades: any[] = [];
  ocupaciones: any[] = [];
  constructor(private http: HttpClient, private router: Router){}

  async ngOnInit() {

      // Realiza la solicitud HTTP con el encabezado de autorización
      this.http.get<any>('http://127.0.0.1:4000/api/usuario/').subscribe(data => {
        console.log(data);
        if(data.exito == true){
        this.usuarios=data.resultado
        }});


    }
    async CambiarEstado(numDoc: any){

      this.http.delete<any>(`http://127.0.0.1:4000/api/usuario/${numDoc}`).subscribe(data => {
      console.log(data);
      if(data.exito == true){
          Swal.fire({
            title: "Perfecto!",
            text: "Se cambio el estado correctamente!",
            icon: "success"
          });
          setTimeout(()=>{
            window.location.reload();
          }, 2000)

        } else {
          Swal.fire({
            title: "Hubo un error!",
            text: "Hubo un error en el cambio de estado :(",
            icon: "error"
          });
          setTimeout(()=>{
            window.location.reload();
          }, 2000)

        }
    })

    };


    enviarDato(numDoc: any){
      this.router.navigate(['/receptor', numDoc]);

    }

    itemsPorPagina = 5;
    paginaActual = 1;

    get datosPaginados() {
      const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
      const fin = inicio + this.itemsPorPagina;
      return this.usuarios.slice(inicio, fin);
    }

    get paginas(): number[] {
      const totalPaginas = Math.ceil(this.usuarios.length / this.itemsPorPagina);
      return Array.from({ length: totalPaginas }, (_, index) => index + 1);
    }

    cambiarPagina(pagina: number) {
      this.paginaActual = pagina;
    }
  }
