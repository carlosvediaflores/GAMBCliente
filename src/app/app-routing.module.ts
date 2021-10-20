import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { LoginComponent } from './components/login/login.component';
import { PanelsComponent } from './components/panels/panels.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component';
import { HojaRutaComponent } from './components/hoja-ruta/hoja-ruta.component';
import { OrganizacionComponent } from './components/organizacion/organizacion.component';
import {OrganizacionAddComponent} from './components/organizacion-add/organizacion-add.component';
import { SubdirComponent } from './components/subdir/subdir.component';
import { SubdirAddComponent } from './components/subdir-add/subdir-add.component';

const routes: Routes = [
  {path: '', component: ContenidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path:'hoja-ruta',component:HojaRutaComponent},
  {path:'organizacion',component:OrganizacionComponent},
  {path:'organizacion-add',component:OrganizacionAddComponent},
  {path:'organizacion-add/:id',component:OrganizacionAddComponent},
  {path:'subdir',component:SubdirComponent},
  {path:'subdir/:id',component:SubdirComponent},
  {path:'subdir-add',component:SubdirAddComponent},
  {path:'subdir-add/:id',component:SubdirAddComponent},
  {path:'usuarioAdd',component:UsuarioAddComponent},
  {path:'usuarioAdd/:id', component:UsuarioAddComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'panels', component: PanelsComponent,
                    canActivate:[AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
