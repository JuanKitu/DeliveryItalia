import { Component, OnInit } from '@angular/core';
import { ProductosPage } from '../productos/productos.page';
import { ModalController } from '@ionic/angular';
import {PedidosService} from './../../services/pedidos-service/pedidos.service'
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  pedidos : any;

  constructor(private modalController: ModalController,private pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedidosService.obtenerPedidos()
        .subscribe(
        (pedidos) => {this.pedidos= pedidos;
        console.log(pedidos);},
        (error) => {console.log(error);}
     )
  }

  async presentModal() {
    const modal = await this.modalController.create({
    component: ProductosPage,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

}

