import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubdirService } from 'src/app/services/subdir.service';
import { Subdir } from 'src/app/models/subdir';

@Component({
  selector: 'app-subdir',
  templateUrl: './subdir.component.html',
  styleUrls: ['./subdir.component.css']
})
export class SubdirComponent implements OnInit {
  public subdir: Subdir[] = [];
  subdirForm: FormGroup;
  titulo = 'Crear Sub Direccion';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _subdirService: SubdirService,
    private aRouter: ActivatedRoute) {
      this.subdirForm = this.fb.group({
        nombredir: ['', Validators.required],
        nombrecargo: ['', Validators.required],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.esEditar();
  }
  registerOrg() {
    const SUBDIR: Subdir = {
      nombredir: this.subdirForm.get('nombredir')?.value,
      nombresubdir: this.subdirForm.get('nombresubdir')?.value,

    }

    if (this.id !== null) {
      //ediar usuario
      console.log(SUBDIR);
      this._subdirService.EditarOrg(this.id, SUBDIR).subscribe(data =>{
        this.router.navigate(['/organizacion']);
      }, error => {
        console.log(error);
        this.subdirForm.reset();
      })
    } else {
      //agregar usuario
      console.log(SUBDIR);
      this._subdirService.register(SUBDIR).subscribe(data => {
        this.router.navigate(['/organizacion']);
      }, error => {
        console.log(error);
        this.subdirForm.reset();
      })
    }
  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Org';
      this._subdirService.obtenerOrg(this.id).subscribe(data => {
        this.subdirForm.setValue({
          nombredir: data.nombredir,
          nombrecargo: data.nombrecargo,
        })

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
}
