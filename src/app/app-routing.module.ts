import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'editCliente/:id', component:HomeComponent},
  {path: 'listac', component:ListarClienteComponent},
  {path: '**', pathMatch:'full',redirectTo:'home'},
  { path: 'buscar/:termino', component: ListarClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
