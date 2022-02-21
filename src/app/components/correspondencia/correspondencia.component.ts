import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Segui } from 'src/app/models/seguimiento';
@Component({
  selector: 'app-correspondencia',
  templateUrl: './correspondencia.component.html',
  styleUrls: ['./correspondencia.component.css']
})
export class CorrespondenciaComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  subscription: Subscription = new Subscription;
  public seguis: Segui[] = [];
  segui: any = [];
  hoja: any = [];
  seguiss: any = [];
  ruta: any[] = [];
  today = new Date();
  estadorec: string = "RECIBIDO";
  estadofin: string = "FINALIZADO";
  ids: string = "";
  pageActual: number = 1;
  public identity: any;
  public token: any;
  constructor(private fb: FormBuilder,
    private router: Router,

    private _seguiService: SeguimientoService,
    private _hojaService: HojarutaService,
    public _authService: AuthService,
    private aRouter: ActivatedRoute) {
    this.loadUser();
  }
  ngOnInit(): void {

    this.getSegui();
    this.getHoja();
  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  getSegui() {
    this._seguiService.getsegui().subscribe(data => {
      console.log(data);

      this.segui = data;

    }, error => {
      console.log(error);
    })
  }
  getHoja() {
    this._hojaService.getHojas().subscribe(data => {
      console.log(data);

      this.hoja = data.serverResponse;

    }, error => {
      console.log(error);
    })
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  cambiarestado(id: any) {
    const SEGUI: Segui = {
      fecharecepcion: this.today,
      estado: this.estadorec,
    }
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguiss = data;
      this.ids = this.seguiss._id;
      if (this.seguiss.fecharecepcion === "SIN RESEPCIONAR") {
        this._seguiService.EditarSeguis(this.ids, SEGUI).subscribe(data => {
          console.log(SEGUI);
          this.router.navigate(['/correspondencia']);

          this.getSegui();
        }, error => {
          console.log(error);
        })
      }
    }, error => {
      console.log(error);
    })
  }
  finalizar(id: any) {

    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguiss = data;
      this.ids = this.seguiss._id;

    const SEGUI: Segui = {
      estado: this.estadofin,
    }
    if (this.seguiss.estado === "RECIBIDO") {
    swal({
      title: "¿Estás seguro finalizar???",
      text: "Esta seguro de finalizar el trámite?????????",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
              this._seguiService.EditarSeguis(this.ids, SEGUI).subscribe(data => {
                swal("El tramite fue finalizado", {
                  icon: "success",
                });
                console.log(SEGUI);
                this.router.navigate(['/correspondencia']);

                this.getSegui();
              }, error => {
                console.log(error);
              })
        } else {
          swal("Ha cancelado la finalizacion del tramite");
        }
      });
    }
    }, error => {
      console.log(error);
    })
  }
}
