import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {MzButtonModule, MzCardModule, MzModalModule, MzParallaxModule} from 'ngx-materialize';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MzParallaxModule,
    FlexLayoutModule,
    MzModalModule,
    MzCardModule,
    MzButtonModule




  ]
})
export class HomeModule { }
