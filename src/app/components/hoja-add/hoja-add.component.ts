import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';

@Component({
  selector: 'app-hoja-add',
  templateUrl: './hoja-add.component.html',
  styleUrls: ['./hoja-add.component.css']
})
export class HojaAddComponent implements OnInit {
  public org: Hojaruta[] = [];
  public hoja: any = [];
  cant: string = "";
  total: string = "";
  ceros: string = "0";
  hojaForm: FormGroup;
  titulo = 'GENERAR HOJA DE RUTA';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) {
      this.hojaForm = this.fb.group({
        origen: ['', Validators.required],
        referencia: ['', Validators.required],

      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.esEditar();
    this.getHojas();
  }
  registerHojas() {
    this.cant= this.cant+1
    this.total= this.cant+"-22";
    const HOJA: Hojaruta = {
      origen: this.hojaForm.get('origen')?.value,
      tipodoc: this.hojaForm.get('tipodoc')?.value,
      referencia: this.hojaForm.get('referencia')?.value,
      fechadocumento: this.hojaForm.get('fechadocumento')?.value,
      nuit:this.total

    }

    if (this.id !== null) {
      //ediar usuario
      console.log(HOJA);
      this._hojaService.EditarHoja  (this.id, HOJA).subscribe(data =>{
        this.router.navigate(['/hoja-ruta']);
      }, error => {
        console.log(error);
        this.hojaForm.reset();
      })
    } else {
      //agregar usuario
      console.log(HOJA);
      this._hojaService.register(HOJA).subscribe(data => {
        this.router.navigate(['/hoja-ruta']);
      }, error => {
        console.log(error);
        this.hojaForm.reset();
      })
    }
  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Hoja de Ruta';
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        console.log(data.serverResponse)
        this.hojaForm.setValue({
          origen: data.serverResponse.origen,
          tipodoc: data.serverResponse.tipodoc,
          referencia: data.serverResponse.referencia,
          fechadocumento: data.serverResponse.fechadocumento,
        })

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
  getHojas() {
    this._hojaService.getHojas().subscribe(data => {
      console.log(data.serverResponse);
      console.log(data.serverResponse.length + " " + "esto es el cantidad de documentos");
      this.cant = data.serverResponse.length

    }, error => {
      console.log(error);
    })
  }

  imprimir(){

  }
}
