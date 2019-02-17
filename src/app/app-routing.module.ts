import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {MessageComponent} from './message/message.component';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';


const routes: Routes = [

  {
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule'
  },
  {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: 'products',
    loadChildren: './product/product-module#ProductModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }]

// @ts-ignore
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
   exports: [RouterModule]



})
export class AppRoutingModule { }

