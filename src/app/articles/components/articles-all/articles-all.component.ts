import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../../../src/app/articles/articles.service';
import { AdminService } from '../../../../../src/app/admin/admin.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { SeoService } from '../../../../../src/app/core/services/seo.service';

@Component({
  selector: 'app-articles-all',
  templateUrl: './articles-all.component.html',
  styleUrls: ['./articles-all.component.scss']
})
export class ArticlesAllComponent implements OnInit {
  products$: Observable<any[]>;
  // items: any;
  loggedInUserId;
  // subscription: Subscription;

  constructor(

    private authService: AdminService,
    private articleService: ArticlesService,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Check out our articles updated regularly',
      description: 'Read the latest articles that can help your legal issue. A property law firm in Brisbane for commercial businesses. Litigation & Dispute Resolution. Insolvency & Debt Recovery. Wills & Estates & Trusts. Retaining wall disputes.',
      image: '/assets/nav-logo2.png',
      slug: 'news',
      keywords: 'Retaining Wall Dispute, Defence Lawyer, Debt recovery, Construction, Lease, Trusts, Wills and Estates, Manufacturing, Commercial Litigation, Property, Brisbane, Legal Services'
    })

    this.products$ = this.articleService.getProducts();
    // need auth to confirm if user is owner of a post, then show edit button
    this.loggedInUserId = this.authService.getAuth()
    // .subscribe(auth => {
    //   if (auth) {
    //     // this.isLoggedIn = true;
    //     return  auth.uid;
    //     // this.loggedinUser = auth.email;
    //   } else {
    //     return null
    //     // this.isLoggedIn = false;
    //   }
    // });

  }

}
