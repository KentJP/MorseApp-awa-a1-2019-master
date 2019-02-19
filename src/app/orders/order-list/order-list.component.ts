import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Product} from '../../product/shared/product.model';
import {order} from '../shared/order.model';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Observable<order[]>;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }
  deleteOrder(order: order){
    this.orderService.deleteOrder(order.id).then(()=>{window.alert('Order was deleted')})
  }
}
