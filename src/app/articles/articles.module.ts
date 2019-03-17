import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesAllComponent } from './components/articles-all/articles-all.component';
import { ArticlesNewComponent } from './components/articles-new/articles-new.component';
import { ArticlesEditComponent } from './components/articles-edit/articles-edit.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AuthGuard } from '../../../src/app/admin/guards/auth.guard';
import { IsAdminGuard } from '../../../src/app/admin/guards/is-admin.guard';
import { ArticlesShowComponent } from './components/articles-show/articles-show.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    PdfViewerModule,
    RouterModule.forChild([
      { path: 'articles', component: ArticlesAllComponent },
      { path: 'articles/:titleSlug/show/:id', component: ArticlesShowComponent },
      {
        path: 'articles/new', component: ArticlesNewComponent, canActivate: [AuthGuard, IsAdminGuard]
      },
      {
        path: 'articles/:id/edit', component: ArticlesEditComponent, canActivate: [AuthGuard, IsAdminGuard]
      },
      // { path: "login", component: LoginComponent },

      // { path: "articles", component: ArticlesComponent },
      // { path: 'payments/:i', component: MakePaymentComponent },
      // { path: '**', component: HomeComponent }
    ])
  
  ],
  declarations: [
    ArticlesAllComponent, 
    ArticlesNewComponent, 
    ArticlesEditComponent, ArticlesShowComponent]
})
export class ArticlesModule { }
