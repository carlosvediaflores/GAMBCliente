import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';


@Component({
  selector: 'app-hoja-ruta',
  templateUrl: './hoja-ruta.component.html',
  styleUrls: ['./hoja-ruta.component.css']
})
export class HojaRutaComponent implements OnInit {
  public identity: any ;
  public hojas: any = [];
  public hoja: any = [];
  idh: string = "";
  cant: number = 0;
  canten:number = 0;
  estadoreg: string = "REGISTRADO";
  estadorec: string = "RECIBIDO";
  estadoenv: string = 'ENVIADO';
  pageActual: number = 1;
  constructor(
    public _authService: AuthService,
    private _hojaService: HojarutaService,
    private router: Router,

  ) {this.loadUser();  }

  ngOnInit(): void {
    this.getHojas();
  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');
  }
  getHoja(id: any) {
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.hoja = data;
      this.cant = this.hoja.asociado.length
    }, error => {
      console.log(error);
    })
  }
  getHojas() {
    this._hojaService.getHojas().subscribe(data => {
      this.hojas = data.serverResponse;
    }, error => {
      console.log(error);
    })
  }
  eliminarHoja(id: any) {
    //Alerta
    swal({
      title: "¿Estás seguro?",
      text: "Una vez borrado no podrás recuperarlo!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._hojaService.eliminarHoja(id).subscribe(
            data => {
              swal("La Unidad ha sido borrado!", {
                icon: "success",
              });
              this.getHojas();
            },
            error => {
              console.log(error);
            }
          );

        } else {
          swal("Tranquilo, nada se ha borrado!");
        }
      });
  }
  cambiarestado(id: any) {
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.hoja = data.serverResponse;
      this.idh = this.hoja._id;

    const HOJA: Hojaruta = {
      estado: this.estadorec,
    }
    if (this.hoja.estado === "REGISTRADO") {
    swal({
      title: "¿Estás seguro Recibir???",
      text: "Esta seguro de reciber el trámite?????????",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
              this._hojaService.EditarHoja(this.idh, HOJA).subscribe(data => {
                swal("El tramite fue finalizado", {
                  icon: "success",
                });
                console.log(HOJA);
                this.router.navigate(['/hoja-ruta']);

                this.getHojas();
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
