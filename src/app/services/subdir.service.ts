import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { Organizacion } from '../models/Organizacion';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class SubdirService {
  public URL: string;

  constructor(
    private _http: HttpClient
  ) {  this.URL=Global.url;
  }
  register(org: Organizacion): Observable<any> {
    return this._http.post(this.URL + 'org', org);
  }
  getOrg():Observable<any>{
    return this._http.get(this.URL+'org');
  }
  obtenerOrg(id: string): Observable<any> {
    return this._http.get(this.URL + 'org/' + id);
  }
  eliminarOrg(id: string): Observable<any> {
    return this._http.delete(this.URL + 'org/' + id);
  }
  EditarOrg(id: string, org:Organizacion): Observable<any> {
    return this._http.put(this.URL + 'org/' + id, org);
  }
}
