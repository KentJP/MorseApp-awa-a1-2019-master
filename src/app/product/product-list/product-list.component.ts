import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../../files/shared/file.service';
import {switchMap, tap} from 'rxjs/operators';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  productFormGroup: FormGroup;
  products: Observable<Product[]>;
  fileToUpload: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private productservice: ProductService, private fileservice: FileService) {this.productFormGroup = new FormGroup({name: new FormControl()}) }

  ngOnInit() {
    this.products = this.productservice.getProducts()
      .pipe(
        tap(products => {
          products.forEach(product => {
            if (product.pictureId) {
              this.fileservice.getFileUrl(product.pictureId)
                .subscribe(url => {
                  product.url = url;
                });
            }
          });
        })
      );
  }

deleteProduct(product: Product){
    this.productservice.deleteProduct(product.id).then(()=>{window.alert('Product was deleted')})
}

addProduct(){
  const productData = this.productFormGroup.value;
    if (this.fileToUpload){
      this.fileservice.upload(this.fileToUpload)
        .pipe(
          switchMap(metadata=>{
            productData.pictureId = metadata.id;
            return  this.productservice.addProduct(productData);

          } )

        )
        .subscribe(product=>{window.alert('Product succesfully added!')}, error1 => {'Failed to add product'});
    }

}

uploadFile(event){
    this.imageChangedEvent = event;
  this.fileToUpload = event.target.files[0];


}
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File([event.file], fileBeforeCrop.name,{type: fileBeforeCrop.type})

  }
}
