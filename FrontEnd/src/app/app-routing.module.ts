import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormularioActualizarComponent } from './formulario-actualizar/formulario-actualizar.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'receptor/:dato', component: FormularioActualizarComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
