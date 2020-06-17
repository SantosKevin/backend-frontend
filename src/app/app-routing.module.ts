import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { Punto1Component } from "./components/punto1/punto1.component";
import { Punto2Component } from "./components/punto2/punto2.component";
import { Punto3Component } from "./components/punto3/punto3.component";
import { Punto4Component } from "./components/punto4/punto4.component";

const routes: Routes = [
  { path: 'mensajeria', component: Punto1Component },
  { path: 'asistente', component: Punto2Component },
  { path: 'home', component: HomeComponent },
  { path: 'pasajes', component: Punto3Component },
  { path: 'jugar', component: Punto4Component },
  { path: '**', pathMatch:'full',redirectTo:'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
