import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public identity: any ;
  public users: User[] = [];
  constructor(
    public _authService: AuthService,
    private _usuarioService: UsuarioService
  ) { this.loadUser();}

  ngOnInit(): void {
    this.getUsers();
  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  getUsers(){
    this._usuarioService.getusers().subscribe(data => {
      console.log(data);
      this.users = data;
    }, error => {
      console.log(error);
    })
  }

}
