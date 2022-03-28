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
import { HojaAddComponent } from './components/hoja-add/hoja-add.component';
import { PrintHrComponent } from './components/print-hr/print-hr.component';
import { SeguimientoAddComponent } from './components/seguimiento-add/seguimiento-add.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { CorrespondenciaComponent } from './components/correspondencia/correspondencia.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { AddFilesComponent } from './components/add-files/add-files.component';
import { SearchComponent } from './components/search/search.component';
import { CredencialesComponent } from './components/credenciales/credenciales.component';

const routes: Routes = [
  {path: '', component: ContenidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path:'hoja-ruta',component:HojaRutaComponent,canActivate:[AuthGuard]},
  {path:'organizacion',component:OrganizacionComponent,canActivate:[AuthGuard]},
  {path:'organizacion-add',component:OrganizacionAddComponent,canActivate:[AuthGuard]},
  {path:'organizacion-add/:id',component:OrganizacionAddComponent,canActivate:[AuthGuard]},
  {path:'subdir',component:SubdirComponent,canActivate:[AuthGuard]},
  {path:'subdir/:id',component:SubdirComponent,canActivate:[AuthGuard]},
  {path:'subdir-add',component:SubdirAddComponent,canActivate:[AuthGuard]},
  {path:'subdir-add/:id',component:SubdirAddComponent,canActivate:[AuthGuard]},
  {path:'usuarioAdd',component:UsuarioAddComponent,canActivate:[AuthGuard]},
  {path:'usuarioAdd/:id', component:UsuarioAddComponent,canActivate:[AuthGuard]},
  {path: 'usuario', component: UsuarioComponent,canActivate:[AuthGuard]},
  {path:'hoja-add',component:HojaAddComponent,canActivate:[AuthGuard]},
  {path:'list-files/:id',component:ListFilesComponent,canActivate:[AuthGuard]},
  {path:'add-files/:id',component:AddFilesComponent,canActivate:[AuthGuard]},
  {path:'hoja-add/:id',component:HojaAddComponent,canActivate:[AuthGuard]},
  {path:'print-hr',component:PrintHrComponent,canActivate:[AuthGuard]},
  {path:'print-hr/:id',component:PrintHrComponent,canActivate:[AuthGuard]},
  {path:'seguimiento/:id',component:SeguimientoComponent},
  {path:'credenciales/:id',component:CredencialesComponent},
  {path:'search/:search',component:SearchComponent},
  {path:'seguimiento',component:SeguimientoComponent,canActivate:[AuthGuard]},
  {path:'seguimiento-add',component:SeguimientoAddComponent,canActivate:[AuthGuard]},
  {path:'seguimiento-add/:id',component:SeguimientoAddComponent,canActivate:[AuthGuard]},
  {path:'seguimiento-add/:id/:ids',component:SeguimientoAddComponent,canActivate:[AuthGuard]},
  {path:'correspondencia',component:CorrespondenciaComponent,canActivate:[AuthGuard]},
  {path: 'panels', component: PanelsComponent,
                    canActivate:[AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
