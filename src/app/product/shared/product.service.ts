import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {Product} from './product.model';
import {map} from 'rxjs/operators';
import {from} from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private db: AngularFirestore) { }

    getProducts(): Observable<Product[]> {
return this.db.collection<Product>('Products').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product
          {
            return {id: action.payload.doc.id, name: data.name};
          }
        });
      })
      );
}

  deleteProduct(id: string): Promise<void> {
     return this.db.doc<Product>('Products/' +id)
      .delete();
}

  addProduct(product: Product): Observable<Product> {
    return from(
      this.db.collection('Products').add(
        {
          name: product.name,
        }
      )
    ).pipe(
      map(productRef => {
        product.id = productRef.id;
        return product;
      })
    );


  }
}

