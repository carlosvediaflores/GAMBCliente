import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';
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
     //Alerta
     swal({
      title: "¿Estás seguro?",
      text: "Una vez borrado no podrás recuperarlo!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.eliminarUsuario(id).subscribe(
          data => {
            swal("El Usuario ha sido borrado!", {
              icon: "success",
            });
            this.getUsers();
          },
          error => {
            console.log(error);
          }
        );

      } else {
        swal("Tranquilo, nada se ha borrado!");
      }
    });
  }
}
