import { Component, OnInit } from '@angular/core';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  public identity: any ;
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  public files: any = [];
  public url: string;
  id: string | null;
  constructor(
    public _authService: AuthService,
    private _hojaService: HojarutaService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.url = Global.url;
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.loadUser();
   }

  ngOnInit(): void {
    this.getHojas();
    this.esId();

  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  esId() {

    if (this.id !== null) {

       this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja=data.serverResponse;
        this.files=data.serverResponse.archivo;
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
