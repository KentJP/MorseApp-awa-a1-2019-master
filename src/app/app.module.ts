import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import {MessageService} from './message/shared/message.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { MessageComponent } from './message/message.component';
import {MzButtonModule, MzTextareaModule} from 'ngx-materialize';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';



@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    MomentModule,
    MzButtonModule,
    MzTextareaModule,
    AppRoutingModule,



  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


