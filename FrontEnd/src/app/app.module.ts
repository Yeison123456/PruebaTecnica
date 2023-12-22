import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormularioRegistrarComponent } from './formulario-registrar/formulario-registrar.component';
import { FormularioActualizarComponent } from './formulario-actualizar/formulario-actualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormularioRegistrarComponent,
    FormularioActualizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
