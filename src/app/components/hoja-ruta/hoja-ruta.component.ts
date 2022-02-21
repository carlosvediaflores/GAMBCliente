import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';


@Component({
  selector: 'app-hoja-ruta',
  templateUrl: './hoja-ruta.component.html',
  styleUrls: ['./hoja-ruta.component.css']
})
export class HojaRutaComponent implements OnInit {
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  idh: string = "";
  cant: string = "";
  estadoreg: string = "REGISTRADO";
  estadorec: string = "RECIBIDO";
  estadoenv: string = 'ENVIADO';
  pageActual: number = 1;
  constructor(
    private _hojaService: HojarutaService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getHojas();
    //this.getHoja("61ba347a921bc4001520366f");
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
      console.log(data.serverResponse);
      console.log(data.serverResponse.length + " " + "esto es el cantidad de documentos");
      this.hojas = data.serverResponse;
      this.cant = data.serverResponse.length

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
