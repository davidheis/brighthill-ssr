import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AdminModule } from '../../src/app/admin/admin.module';
import { ArticlesModule } from '../../src/app/articles/articles.module';
import { HomeComponent } from '../../src/app/core/components/home/home.component';
import { CoreModule } from '../../src/app/core/core.module';
import { environment } from '../../src/environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    LayoutModule,
    ArticlesModule,
    AdminModule,
    CoreModule,
    RouterModule.forRoot([
      { path: '**', component: HomeComponent }
      // { path: 'contact', component: ContactComponent },
      // { path: "login", component: LoginComponent },

      // { path: "articles", component: ArticlesComponent },
      // { path: 'payments/:i', component: MakePaymentComponent },
      // { path: '**', component: HomeComponent }
  ])
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
