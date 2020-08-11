import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



/*#########Aca importamos todos los componentes creados #########*/
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
/*###############################################################*/
@NgModule({
    declarations:[MenuComponent, HeaderComponent],
    imports:[IonicModule, FormsModule,ReactiveFormsModule, CommonModule, RouterModule],
    exports:[MenuComponent, HeaderComponent]
})

export class ComponentsModule{}