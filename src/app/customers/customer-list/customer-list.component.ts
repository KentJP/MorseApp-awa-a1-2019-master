import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../shared/customer.service';
import {customer} from '../shared/customer.model';
import {Observable} from 'rxjs/internal/Observable';
import {Product} from '../../product/shared/product.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Observable<customer[]>;
  constructor(private cusservice: CustomerService) { }

  ngOnInit() {
    this.customers = this.cusservice.getCustomers();
  }

  deleteCustomer(customer: customer){
    this.cusservice.deleteCustomer(customer.id).then(()=>{window.alert('Customer was deleted')})



  }
}
