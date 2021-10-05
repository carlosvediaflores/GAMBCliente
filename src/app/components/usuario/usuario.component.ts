import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

  public users: User[] = [];

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this._usuarioService.getusers().subscribe(data => {
      console.log(data);
      this.users = data;
    }, error => {
      console.log(error);
    })
  }
  eliminarUser(id: any) {
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
     //this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.getUsers();
    }, error => {
      console.log(error);
    })
  }


}
