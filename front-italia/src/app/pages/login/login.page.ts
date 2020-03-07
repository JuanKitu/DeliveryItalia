import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Login, Cuentas } from '../../models/Cuentas';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formularioLogin = this.formBuilder.group({
    email: ['',[
      Validators.required,
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
    ]],
    password: ['', Validators.required]
  })

  public errorMessages = {
    email: [
      { type: 'required', message: 'Es necesario ingresar el correo electrónico'},
      { type: 'pattern', message: 'Por favor, ingrese un correo electrónico válido'}
    ],
    password: [
      { type: 'required', message: 'Es necesario ingresar una contraseña'}
    ]
  }

  passwordType: string = 'password';
  passwordShown: boolean = false;

  public togglePassword(){
    if (this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  constructor(public formBuilder: FormBuilder, private loginService: LoginService) {
  }

  registrarUsuario(value){
    this.loginService.registarUsuario(value)
        .subscribe(
        (pedidos) => {
       },
        (error) => {console.log(error);}
     )
  }

}
