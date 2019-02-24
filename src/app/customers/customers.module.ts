import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FlexLayoutModule
  ]
})
export class CustomersModule { }
