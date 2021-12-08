import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';
import { Organizacion } from 'src/app/models/Organizacion';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { SubdirService } from 'src/app/services/subdir.service';
import { Segui } from 'src/app/models/seguimiento';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
@Component({
  selector: 'app-seguimiento-add',
  templateUrl: './seguimiento-add.component.html',
  styleUrls: ['./seguimiento-add.component.css']
})
export class SeguimientoAddComponent implements OnInit {
  subscription: Subscription = new Subscription;
  params = "";
  orgselec: any []=[] ;
  public org: Organizacion[] = [];
  public segui: Segui[] = [];
  seguiForm: FormGroup;
  titulo = 'derivar documento';
  id: string | null;

  origenen: string = "ENVIADO";
  public hojas: Hojaruta[] = [];
  public hoja: any  = [];
  idh: string = "";
  origenreg: string = "REGISTRADO";

  constructor(private fb: FormBuilder,
    private _hojaService: HojarutaService,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _orgService: OrganizacionService,
    private _subdirService: SubdirService,
    private aRouter: ActivatedRoute) {
      this.seguiForm = this.fb.group({
        destino: ['', Validators.required],
       // origen: ['', Validators.required],
        detalles: ['', Validators.required],
        instrucciones: ['', Validators.required],
        fecharecepcion: ['', Validators.required],
        //estado: ['', Validators.required],
        //post: ['', Validators.required],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.getOrga();
    //this.esEditar();
    this.getSub();

  }


  registerSegui() {
    const SEGUI: Segui = {
      destino: this.seguiForm.get('destino')?.value,
      //origen: this.seguiForm.get('origen')?.value,
      detalles: this.seguiForm.get('detalles')?.value,
      instrucciones: this.seguiForm.get('instrucciones')?.value,
      //fechaderivado: this.seguiForm.get('fechaderivado')?.value,
      fecharecepcion: this.seguiForm.get('fecharecepcion')?.value,
      //sestado: this.seguiForm.get('estado')?.value,
    }
    const HOJA: Hojaruta = {
      estado:this.origenen,
    }
    if (this.id !== null) {
      //ediar Hoja de Ruta
      console.log(SEGUI);
      this._seguiService.EditarSegui(this.id, SEGUI).subscribe(data =>{
        this.router.navigate(['/hoja-ruta']);
      }, error => {
        console.log(error);
        this.seguiForm.reset();
      })
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja = data.serverResponse;
        this.idh= this.hoja._id;
        console.log(this.hoja.serverResponse)
        this._hojaService.EditarHoja  (this.idh, HOJA).subscribe(data =>{
          console.log(HOJA);
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
    } else {
      //
      console.log(SEGUI);
      this._seguiService.register(SEGUI).subscribe(data => {
        this.router.navigate(['/seguimiento']);
      }, error => {
        console.log(error);
        this.seguiForm.reset();
      })
    }
  }
  getOrga(){
    this.subscription =  this._orgService.getOrg().subscribe(data => {
      console.log(data);
      this.org = data;

    }, error => {
      console.log(error);
    })
  }
  getSub() {

    if (this.params !== null) {
      this.subscription = this._orgService.obtenerOrg(this.params).subscribe(data => {
        console.log(data);
        this.orgselec = data.subdirecciones;

      }, error => {
        console.log(error);
      })
    }
  }

  instruccions: any[] = [
    { value: 'Informar a la MAE ', nombre: 'Informar a la MAE '},
    { value: 'Dar el curso al trámite', nombre: 'Dar el curso al trámite'},
    { value: 'Supervisé', nombre: 'Supervisé'},
    { value: 'Prepare el informe', nombre: 'Prepare el informe'},
    { value: 'Prepare el documento', nombre: 'Prepare el documento'},
    { value: 'Revíse', nombre: 'Revíse'},
    { value: 'Resuelva', nombre: 'Resuelva'},
    { value: 'Para su conocimiento', nombre: 'Para su conocimiento'},
    { value: 'Otros', nombre: 'Otros'},
]
}
