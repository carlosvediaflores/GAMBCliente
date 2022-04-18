import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import swal from 'sweetalert';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public identity: any;
  public users: User[] = [];
  userForm: FormGroup;
  titulo = 'Editar Usuario';
  id: string="";
  emal: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute) {
      this.userForm = this.fb.group({
        username: ['', Validators.required],
        surnames: ['', Validators.required],
        numberphone: [''],
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
    this.emal = this.aRouter.snapshot.paramMap.get('email');
    this.loadUser();
  }

  ngOnInit(): void {
    this.getUs();
  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  registerUser() {
    const USER: User = {
      username: this.userForm.get('username')?.value,
      surnames: this.userForm.get('surnames')?.value,
      email: this.userForm.get('email')?.value,
      numberphone: this.userForm.get('numberphone')?.value,
      password: this.userForm.get('password')?.value,

    }

    if (this.id !== null) {
      //ediar usuario
      this._usuarioService.EditarUser(this.id, USER).subscribe(data => {
        //Alerta
        swal(
          'Usuario Editado!!',
          'El usuario se ha editado correctamente',
          'success'
        );
        this.router.navigate(['/panels']);
      }, error => {
        //Alerta
        swal(
          'Edición fallida!!',
          'El Usuario no se ha modificado correctamente',
          'error'
        );
        console.log(error);
        this.userForm.reset();
      })
    } else {
      //agregar usuario
      this._usuarioService.register(USER).subscribe(data => {
        //Alerta
        swal(
          'Usuario Creado!!',
          'El usuario se ha creado correctamente',
          'success'
        );
        this.router.navigate(['/panels']);
      }, error => {
        //Alerta
        swal(
          'Creacion fallida!!',
          'El Usuario no se ha creado correctamente',
          'error'
        );
        console.log(error);
        this.userForm.reset();
      })
    }
  }

  getUs() {

    if (this.emal !== null) {
      this.titulo = 'Editar Usuario';
      this._usuarioService.obtenerUserEm(this.emal).subscribe(data => {
        this.id = data.serverResponse._id;

        this.userForm.setValue({
          username: data.serverResponse.username,
          surnames: data.serverResponse.surnames,
          email: data.serverResponse.email,
          numberphone: data.serverResponse.numberphone,
          password: data.serverResponse.password,

        })
      }, error => {
        console.log(error);
      })
    }
  }

}
