
import {Component, EventEmitter, OnInit, Output, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  public identity: any ;
  public token: any ;

  constructor(public _authService: AuthService,) {
    this.loadUser();

  }
  ngDoCheck(): void {
    this.loadUser();
  }

  ngOnInit(): void {
  }

  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
