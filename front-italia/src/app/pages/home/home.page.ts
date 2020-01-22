import { Component, NgModule } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  get nombre(){
    return this.formularioCliente.get('nombre');
  }
  
  get apellido(){
    return this.formularioCliente.get('apellido');
  }
  
  get email(){
    return this.formularioCliente.get('email');
  }
  
  get password(){
    return this.formularioCliente.get('password');
  }
  
  get passwordConfirmation(){
    return this.formularioCliente.get('passwordConfirmation');
  }

  public errorMessages = {
    nombre: [
      { type: 'required', message: 'Es necesario ingresar el nombre'},
      { type: 'maxlenght', message: 'El nombre no puede tener mas de 100 caracteres'}
    ],
    apellido: [
      { type: 'required', message: 'Es necesario ingresar el apellido'},
      { type: 'maxlenght', message: 'El apellido no puede tener mas de 100 caracteres'}
    ],
    email: [
      { type: 'required', message: 'Es necesario ingresar el correo electrónico'},
      { type: 'pattern', message: 'Por favor, ingrese un correo electrónico válido'}
    ],
    password: [
      { type: 'required', message: 'Es necesario ingresar una contraseña'}
    ],
    passwordConfirmation: [
      { type: 'required', message: 'Es necesario reescribir la contraseña'}
    ]

  };

  formularioCliente = this.formBuilder.group({
    nombre: ['', [Validators.required,Validators.maxLength(100)]],
    apellido: ['',[Validators.required,Validators.maxLength(100)]],
    email: ['',[
      Validators.required,
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
    ]],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
    });

  constructor(public formBuilder: FormBuilder) {}

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

public submit(){  
  console.log(this.formularioCliente.value);
  }

}
