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
      title: 'News',
      description: 'Read the latest news that can help you win court cases',
      image: '/assets/nav-logo2.png',
      slug: 'news',
      keywords: 'news, Construction, Manufacturing, commercial litigation, property, brisbane, legal services, budget, cost-effective'
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
