import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CAuthService } from './services/auth.service';
import { DefaultComponent } from './shared/default/default.component';
import { AuthInterceptor } from './interceptors/global.interceptor';
import { CModalService } from './services/modal-popup.service';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule

  ],
  providers: [
    CModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
