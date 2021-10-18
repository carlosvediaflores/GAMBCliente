import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { Organizacion } from 'src/app/models/Organizacion';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [OrganizacionService]
})
export class UsuarioAddComponent implements OnInit {
  public org: Organizacion[] = [];
  public users: User[] = [];
  userForm: FormGroup;
  titulo = 'Crear Usuario';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private _orgService: OrganizacionService,
    private aRouter: ActivatedRoute) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      surnames: ['', Validators.required],
      ci: ['', Validators.required],
      email: ['', Validators.required],
      numberphone: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      post: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getOrga();
    this.esEditar();
  }
  registerUser() {
    const USER: User = {
      username: this.userForm.get('username')?.value,
      surnames: this.userForm.get('surnames')?.value,
      ci: this.userForm.get('ci')?.value,
      email: this.userForm.get('email')?.value,
      numberphone: this.userForm.get('numberphone')?.value,
      password: this.userForm.get('password')?.value,
      birthdate: this.userForm.get('birthdate')?.value,
      post: this.userForm.get('post')?.value,
    }

    if (this.id !== null) {
      //ediar usuario
      console.log(USER);
      this._usuarioService.EditarUser(this.id, USER).subscribe(data =>{
        console.log("no entro");
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
        console.log(data)
        this.userForm.setValue({
          username: data.username,
          surnames: data.surnames,
          ci: data.ci,
          email: data.email,
          numberphone: data.numberphone,
          password: data.password,
          birthdate: data.birthdate,
          post: data.post,
        })
      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
  getOrga(){
    this._orgService.getOrg().subscribe(data => {
      console.log(data);
      this.org = data;
    }, error => {
      console.log(error);
    })
  }
}

