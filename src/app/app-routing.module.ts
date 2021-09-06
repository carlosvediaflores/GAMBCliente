import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { LoginComponent } from './components/login/login.component';
import { PanelsComponent } from './components/panels/panels.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: ContenidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: 'panels', component: PanelsComponent,
                    canActivate:[AuthGuard]},
  {path: '**', component: ContenidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
