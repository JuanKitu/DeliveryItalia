import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';

@Injectable()
export class Proveedor1Provider {

    constructor(public http: HttpClient) {
        console.log('Hello provider');
    }

    obtenerDatos(){
        return this.http.get('https://jsonplaceholder.typicode.com/users');
    }
}