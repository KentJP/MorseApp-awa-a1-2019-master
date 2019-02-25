import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {FilesModule} from '../files/files.module';
import {MzButtonModule, MzCardModule, MzIconMdiModule, MzIconModule, MzInputModule} from 'ngx-materialize';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    FilesModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzInputModule
  ]
})
export class ProductModule { }
