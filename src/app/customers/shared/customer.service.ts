import { Injectable } from '@angular/core';
import {Product} from '../../product/shared/product.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {customer} from './customer.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private db: AngularFirestore) { }

  deleteCustomer(id: string): Promise<void>{
    return this.db.doc<customer>('Customers/' +id)
      .delete();

  }

  getCustomers() {
    return this.db.collection<customer>('Customers').snapshotChanges()
      .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as customer
            {
              return {id: action.payload.doc.id, name: data.name};
            }
          });
        })
      );

  }
}
