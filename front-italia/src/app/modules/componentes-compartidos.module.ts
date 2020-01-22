import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProductosComponent } from '../components/modal-productos/modal-productos.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ModalProductosComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ModalProductosComponent] 
})
export class ComponentesCompartidosModule { }
