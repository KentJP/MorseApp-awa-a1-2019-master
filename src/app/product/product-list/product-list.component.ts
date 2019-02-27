import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../../files/shared/file.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  productFormGroup: FormGroup;
  products: Observable<Product[]>;
  fileToUpload: File;
  constructor(private productservice: ProductService, private fileservice: FileService) {this.productFormGroup = new FormGroup({name: new FormControl()}) }

  ngOnInit() {
    this.products = this.productservice.getProducts();
  }

deleteProduct(product: Product){
    this.productservice.deleteProduct(product.id).then(()=>{window.alert('Product was deleted')})
}

addProduct(){
  const productData = this.productFormGroup.value;
    if (this.fileToUpload){
      this.fileservice.upload(this.fileToUpload)
        .pipe(
          switchMap(metadata=>{debugger;
            productData.pictureId = metadata.id;
            return  this.productservice.addProduct(productData);

          } )

        )
        .subscribe(product=>{window.alert('Product succesfully added!')}, error1 => {debugger;});
    }

}

uploadFile(event){
    this.fileToUpload = event.target.files[0];

}
}
