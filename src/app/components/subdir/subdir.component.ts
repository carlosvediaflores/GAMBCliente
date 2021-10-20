import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { SubdirService } from 'src/app/services/subdir.service';
import { Subdir } from 'src/app/models/subdir';

@Component({
  selector: 'app-subdir',
  templateUrl: './subdir.component.html',
  styleUrls: ['./subdir.component.css']
})
export class SubdirComponent implements OnInit {
  public subdir: Subdir[] = [];
  id: string | null;
  titulo = 'lista de sub direcciones ';
  nombreSub = "";
  constructor(private aRouter: ActivatedRoute,
    private _subdirService: SubdirService,
    private _orgService: OrganizacionService,) {
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    //this.getSubdir();
    this.esEditar();
  }
  getSubdir(){
    this._subdirService.getSub().subscribe(data => {
      console.log(data);
      this.subdir = data;
    }, error => {
      console.log(error);
    })
  }
  esEditar() {
    if (this.id !== null) {
      //this.titulo = 'Crear Sub Direccion para ';
      this._orgService.obtenerOrg(this.id).subscribe(data => {
        console.log(data.subdirecciones);
        this.subdir = data.subdirecciones;
        this.nombreSub=data.nombredir;
        this.titulo = 'lista de sub direcciones de  '+ this.nombreSub;


      }, error => {
        console.log("no hay id" + error);
      })
    }
  }

  eliminarUser(id: any) {
    this._subdirService.eliminarOrg(id).subscribe(data => {
     //this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.getSubdir();
    }, error => {
      console.log(error);
    })
  }
}
