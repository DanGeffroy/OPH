import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent, DialogContent} from './app.component';
import { MaterialModule } from '@angular/material';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,DialogContent
  ],
  entryComponents: [
   DialogContent
 ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
