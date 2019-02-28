import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import {catchError, map} from 'rxjs/operators';
import {from} from 'rxjs/internal/observable/from';
import {throwError} from 'rxjs';

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
    return Observable.create( obs =>
      this.db.collection<Product>('Products').add(
        {
          name: product.name,
          pictureId: product.pictureId
        }
      ).then(data => {obs.next(data);
      })
        .catch(err => obs.error(err))
    ).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          // handle error
        }
        return throwError(error);
      }),
      map(productRef => {
        //product.id = productRef.id;
        return product;
      })
    );


  }
}

