import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  registarUsuario(datos): Observable<any>{
   
    return this.http.post('http://localhost:3000/api/cuentas/registrar/', datos);
  }
}
