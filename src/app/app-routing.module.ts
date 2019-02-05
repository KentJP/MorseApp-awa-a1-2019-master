import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {MessageComponent} from './message/message.component';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';


const routes: Routes = [
  { path: 'message', component: MessageComponent},
  {path: 'x', component: AppComponent},
  {path: '', component: WelcomeComponent }]

// @ts-ignore
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
   exports: [RouterModule]



})
export class AppRoutingModule { }

