import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer, Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CuentaServicioService {

  constructor(private http: HttpClient) {
   }
  
   public login(email, password): Observable<string>{
      return this.http.post<string>('http://localhost:3000/api/cuentas/login/',{email, password}) 
      // Esto devuelve el observable que devuelve el valor 
   }        //Este observable tiene un método llamado suscribe que toma una función que resuelve lo que se haga una vez que llega la respuesta del server

}
