import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {Product} from '../../product/shared/product.model';
import {map} from 'rxjs/operators';
import {order} from './order.model';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

  getOrders(): Observable<order[]> {
    return this.db.collection<order>('Orders').snapshotChanges()
      .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as order
            {
              return {id: action.payload.doc.id, name: data.name};
            }
          });
        })
      );
  }

  deleteOrder(id: string): Promise<void>{
    return this.db.doc<order>('Orders/' +id)
      .delete();
  }
}
