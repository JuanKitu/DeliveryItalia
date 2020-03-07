import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginService } from '../../services/login-service/login.service'

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage],
  providers: [LoginService]
})
export class LoginPageModule {}
