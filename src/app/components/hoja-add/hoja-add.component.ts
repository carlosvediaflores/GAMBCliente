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
  hojaForm: FormGroup;
  titulo = 'GENERAR HOJA DE RUTA';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) {
      this.hojaForm = this.fb.group({
        origen: ['', Validators.required],
        tipodoc: ['', Validators.required],
        referencia: ['', Validators.required],
        fechadocumento: ['', Validators.required],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.esEditar();
  }
  registerHojas() {
    const HOJA: Hojaruta = {
      origen: this.hojaForm.get('origen')?.value,
      tipodoc: this.hojaForm.get('tipodoc')?.value,
      referencia: this.hojaForm.get('referencia')?.value,
      fechadocumento: this.hojaForm.get('fechadocumento')?.value,

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
        console.log(data)
        this.hojaForm.setValue({
          origen: data.origen,
          tipodoc: data.tipodoc,
          referencia: data.referencia,
          fechadocumento: data.fechadocumento,
        })

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
  imprimir(){

  }
}
