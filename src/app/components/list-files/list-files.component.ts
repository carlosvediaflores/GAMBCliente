import { Component, OnInit } from '@angular/core';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  public url1: string;
  id: string | null;
  constructor(

    private _hojaService: HojarutaService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.url1 = Global.url1;
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getHojas();
    this.esId();

  }

  esId() {

    if (this.id !== null) {

       this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja=data.serverResponse;
        console.log(this.hoja)
      }, error => {
        console.log("no hay id" + error);
      })
    }
  }

  getHojas() {
    this._hojaService.getHojas().subscribe(data => {
      console.log(data.serverResponse);
      this.hojas = data.serverResponse;
    }, error => {
      console.log(error);
    })
  }
}
