import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TotalscoreComponent } from './totalscore/totalscore.component';
import { QuantverbalscoreComponent } from './quantverbalscore/quantverbalscore.component';


@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule ],
  declarations: [ 
    AppComponent,
    TotalscoreComponent,
    QuantverbalscoreComponent
    ],
  bootstrap:[ AppComponent ]
})
export class AppModule { }
