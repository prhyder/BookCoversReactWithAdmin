/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookCoverService } from './services/book-cover.service';
import { PremadeService } from './services/premade.service';
import { GenreService } from './services/genre.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

export function tokenGetter() {
  var tokenLS = localStorage.getItem("auth_app_token");
  if (tokenLS) {
    return JSON.parse(tokenLS).value;
  }
  return "";
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5235", "localhost:44306"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    BookCoverService,
    PremadeService,
    GenreService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
