import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// google maps
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { environment } from '../../../src/environments/environment';
import { OurServiceComponent } from '../../../src/app/core/components/our-service/our-service.component';
import { LoginComponent } from './components/login/login.component';

// import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';


import { TrustUrlPipe } from './pipes/trust-url.pipe';
import { OrderArticlesPipe } from './pipes/order-articles.pipe';
import { SafeScriptPipe } from './pipes/safe-json-script.pipe';

import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // AngularFireDatabaseModule,

    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatChipsModule,
    MatDividerModule,
    RouterModule.forChild([
      { path: "adminlogin", component: LoginComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: "services", component: OurServiceComponent },
      

      // { path: "articles", component: ArticlesComponent },
      // { path: 'payments/:i', component: MakePaymentComponent },
      // { path: '**', component: HomeComponent }
    ]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapKey
    }),
  ],
  declarations: [
    ContactComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    OurServiceComponent,
    LoginComponent,
    TrustUrlPipe,
    OrderArticlesPipe,
    SafeScriptPipe
  ],
  exports: [
    NavComponent,
    FooterComponent,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatChipsModule,
    MatDividerModule,
    FormsModule,
    TrustUrlPipe,
    OrderArticlesPipe,
    SafeScriptPipe,
    FlashMessagesModule
  ],
})
export class CoreModule { }
