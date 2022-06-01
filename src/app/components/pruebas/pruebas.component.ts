import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  date:Date=new(Date)
  intt:number=0;
  constructor() { }

  ngOnInit( ): void{
    
  }

}
