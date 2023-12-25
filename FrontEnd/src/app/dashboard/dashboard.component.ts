import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

      window.location.reload();
      return this.http.delete<any>(`http://127.0.0.1:4000/api/usuario/${numDoc}`).subscribe(data => {

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
