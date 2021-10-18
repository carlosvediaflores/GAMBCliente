import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { Organizacion } from 'src/app/models/Organizacion';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css'],
  providers:[OrganizacionService]
})
export class OrganizacionComponent implements OnInit {

  public orgs: Organizacion[] = [];

  constructor(
    private _orgService: OrganizacionService
  ) { }

  ngOnInit(): void {
    this.getOrgs();
  }
  getOrgs(){
    this._orgService.getOrg().subscribe(data => {
      console.log(data);
      this.orgs = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUser(id: any) {
    this._orgService.eliminarOrg(id).subscribe(data => {
     //this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.getOrgs();
    }, error => {
      console.log(error);
    })
  }
}
