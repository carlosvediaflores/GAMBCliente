import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {
  userForm: FormGroup;
  titulo = 'Crear Usuario';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }
  registerUser() {
    const USER: User = {
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
    }

    if (this.id !== null) {
      //ediar usuario
      console.log(USER);
      this._usuarioService.EditarUser(this.id, USER).subscribe(data =>{
        this.router.navigate(['/usuario']);
      }, error => {
        console.log(error);
        this.userForm.reset();
      })
    } else {
      //agregar usuario
      console.log(USER);
      this._usuarioService.register(USER).subscribe(data => {
        this.router.navigate(['/usuario']);
      }, error => {
        console.log(error);
        this.userForm.reset();
      })
    }



  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._usuarioService.obtenerUser(this.id).subscribe(data => {
        this.userForm.setValue({
          username: data.username,
          email: data.email,
          password: data.password,
        })
      }, error => {
        console.log("no hay id" + error);
      })
    }
  }

}

