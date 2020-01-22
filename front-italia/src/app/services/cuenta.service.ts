import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/Cuentas';

@Injectable({
    providedIn: 'root'
})


export class ClienteService {
    API_URL = 'http://localhost:3000/api';
    constructor(private http:HttpClient) { }

    cuentaLogin(login:Login){
        return this.http.post(`${this.API_URL}/login`, login)
    }
}