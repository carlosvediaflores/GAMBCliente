import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { User } from 'src/app/models/user'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
              private aRouter: ActivatedRoute
    ) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    
  }

  register() {
    const USER: User = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
    }

    console.log(USER);
    this._authService.register(USER).subscribe(data => {
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      this.userForm.reset();
    })

  }

}
