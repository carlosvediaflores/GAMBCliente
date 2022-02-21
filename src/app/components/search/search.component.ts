import { Component, OnInit } from '@angular/core';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  public search: string="";
  pageActual: number = 1;
  constructor(
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRouter.params.subscribe (params => {
      var search = params['search'];
      this.search = search;
      this._hojaService.buscarHoja(this.search).subscribe(
        data => {
          console.log(data.serverResponse)
          if(data.serverResponse){
            this.hojas = data.serverResponse;
            console.log(this.hojas);
          }else{
            this.hojas = [];
          }
        },
        error => {
          console.log(error);
          this.hojas = [];

        }
      )
    });
  }


}
