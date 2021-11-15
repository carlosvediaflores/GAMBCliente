import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Segui } from 'src/app/models/seguimiento';
@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  subscription: Subscription = new Subscription;
  fecharesepcion: string='';
  nuit: string='';
  origen: string ='';
  tipodoc: string= '';
  referencia: string = '';
  id: string | null;
  titulo = 'Crear una Unidad';
  segui: any [] = [];
  ruta: any [] = [];
  constructor(private fb: FormBuilder,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) {
      this.id = this.aRouter.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Org';
      this.subscription= this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.segui=data.seguimiento;
        this.nuit=data.nuit;
        this.fecharesepcion=data.fecharesepcion;
        this.origen=data.origen;
        this.tipodoc=data.tipodoc;
        this.referencia=data.referencia;


      }, error => {
        console.log("no hay id" + error);
      })
    }
  }

}
