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
  titulo = 'Crear una Unidad';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) {
      this.hojaForm = this.fb.group({
        origen: ['', Validators.required],
        tipodoc: ['', Validators.required],
        referencia: ['', Validators.required],
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
        this.router.navigate(['/print-hr']);
      }, error => {
        console.log(error);
        this.hojaForm.reset();
      })
    }
  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Org';
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hojaForm.setValue({
          origen: data.origen,
          tipodoc: data.tipodoc,
        })

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
  imprimir(){

  }
}
