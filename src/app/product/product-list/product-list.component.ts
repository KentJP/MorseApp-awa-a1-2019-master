import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  productFormGroup: FormGroup;
  products: Observable<Product[]>;
  constructor(private productservice: ProductService) {this.productFormGroup = new FormGroup({name: new FormControl()}) }

  ngOnInit() {
    this.products = this.productservice.getProducts();
  }

deleteProduct(product: Product){
    this.productservice.deleteProduct(product.id).then(()=>{window.alert('Product was deleted')})
}

addProduct(){
    const productData = this.productFormGroup.value;
    this.productservice.addProduct(productData)
}
}
