import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { Hojaruta } from 'src/app/models/hojaruta';


@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.css']
})
export class AsociarComponent implements OnInit {
  public org: Hojaruta[] = [];
  public hoja: any = [];
  cant: string = "";
  total: string = "";
  nuitA: string = "";
  hojaForm: FormGroup;
  titulo = 'ASOCIAR HOJA DE RUTA';
  nuit: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) {
      this.hojaForm = this.fb.group({
        nuit: ['', Validators.required]
      })
      this.nuit = this.aRouter.snapshot.paramMap.get('nuit');
    }

  ngOnInit(): void {
  }
  asociar(){
      this.nuitA= this.hojaForm.get('nuit')?.value
      console.log(this.nuit)
      console.log(this.nuitA)
    if(this.nuit !== null && this.nuitA !== null ){
      console.log(" no es null")
      console.log(this.nuit)
      console.log(this.nuitA)
      this._hojaService.Asociar(this.nuit, this.nuitA).subscribe(data =>{
        this.router.navigate(['/hoja-ruta']);
      }, error => {
        console.log(error);
        this.hojaForm.reset();
      })
    }
  }

}
