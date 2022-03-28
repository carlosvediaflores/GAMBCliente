import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { PanelsComponent } from './components/panels/panels.component';
import { AuthGuard } from './auth.guard';
import { TokenService } from './services/token.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component';
import { HojaRutaComponent } from './components/hoja-ruta/hoja-ruta.component';
import { OrganizacionComponent } from './components/organizacion/organizacion.component';
import { OrganizacionAddComponent } from './components/organizacion-add/organizacion-add.component';
import { SubdirComponent } from './components/subdir/subdir.component';
import { SubdirAddComponent } from './components/subdir-add/subdir-add.component';
import { HojaAddComponent } from './components/hoja-add/hoja-add.component';
import { PrintHrComponent } from './components/print-hr/print-hr.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { SeguimientoAddComponent } from './components/seguimiento-add/seguimiento-add.component';
import { CorrespondenciaComponent } from './components/correspondencia/correspondencia.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { AddFilesComponent } from './components/add-files/add-files.component';
import { SearchComponent } from './components/search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CredencialesComponent } from './components/credenciales/credenciales.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContenidoComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    PanelsComponent,
    SidebarComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    HojaRutaComponent,
    OrganizacionComponent,
    OrganizacionAddComponent,
    SubdirComponent,
    SubdirAddComponent,
    HojaAddComponent,
    PrintHrComponent,
    SeguimientoComponent,
    SeguimientoAddComponent,
    CorrespondenciaComponent,
    ListFilesComponent,
    AddFilesComponent,
    SearchComponent,
    CredencialesComponent,
    AjustesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgChartsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    AngularFileUploaderModule,


  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
