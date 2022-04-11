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
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  idh: string = "";
  cant: string = "";
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
      console.log(data.serverResponse.seguimiento);
      this.hoja = data;
    }, error => {
      console.log(error);
    })
  }
  getHojas() {
    this._hojaService.getHojas().subscribe(data => {
      this.hojas = data.serverResponse;
      this.canten = this.hojas.filter(list => list.estado === 'REGISTRADO').length;
      console.log(this.canten);
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
    const HOJA: Hojaruta = {
      estado: this.estadorec,
    }
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.hoja = data.serverResponse;
      this.idh = this.hoja._id;
      console.log(this.hoja)
      if (this.hoja.estado === "REGISTRADO") {
        this._hojaService.EditarHoja(this.idh, HOJA).subscribe(data => {
          console.log(HOJA);
          this.router.navigate(['/hoja-ruta']);

          this.getHojas();
        }, error => {
          console.log(error);
        })
      }

    }, error => {
      console.log(error);
    })
  }
}
