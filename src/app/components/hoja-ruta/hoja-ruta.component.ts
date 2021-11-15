import { Component, OnInit } from '@angular/core';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';

@Component({
  selector: 'app-hoja-ruta',
  templateUrl: './hoja-ruta.component.html',
  styleUrls: ['./hoja-ruta.component.css']
})
export class HojaRutaComponent implements OnInit {
  public hojas: Hojaruta[] = [];
  constructor(
    private _hojaService: HojarutaService
  ) { }

  ngOnInit(): void {
    this.getHojas();
  }
  getHojas(){
    this._hojaService.getHojas().subscribe(data => {
      console.log(data);
      this.hojas = data;
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

}
