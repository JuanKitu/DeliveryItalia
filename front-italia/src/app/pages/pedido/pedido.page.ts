import { Component, OnInit } from '@angular/core';
import { ProductosPage } from '../productos/productos.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
    component: ProductosPage,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

}

