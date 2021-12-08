import { Component, OnInit } from '@angular/core';
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
  public hoja: any  = [];
  idh: string = "";
  origenreg: string = "REGISTRADO";
  origenen: string = "ENVIADO";
 // estados: string = 'REGISTRADO';

  constructor(
    private _hojaService: HojarutaService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getHojas();
    //this.getHoja();
  }
  mostrar=true;
  getHoja(id:any){
    this._hojaService.obtenerHoja(id).subscribe(data => {
      console.log(data.serverResponse);
      this.hoja = data;
      if(this.hoja.esatado == "ENVIADO"){
        console.log(this.hoja.esatado)
        this.mostrar = !this.mostrar;
      }

    }, error => {
      console.log(error);
    })
  }
  getHojas(){
    this._hojaService.getHojas().subscribe(data => {
      console.log(data);

      this.hojas = data.serverResponse;

    }, error => {
      console.log(error);
    })
  }
  eliminarUser(id: any) {
    this._hojaService.eliminarHoja(id).subscribe(data => {
     //this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.getHojas();
    }, error => {
      console.log(error);
    })
  }
  cambiarestado(id:any){
    const HOJA: Hojaruta = {
      estado:this.origenreg,
    }
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.hoja = data.serverResponse;
      this.idh= this.hoja._id;
      console.log(this.hoja)
      this._hojaService.EditarHoja  (this.idh, HOJA).subscribe(data =>{
        console.log(HOJA);
        this.router.navigate(['/hoja-ruta']);

        this.getHojas();
      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })

  }

}
