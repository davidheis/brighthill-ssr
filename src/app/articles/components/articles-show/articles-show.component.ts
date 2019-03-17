import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../../src/app/admin/admin.service';
import { ArticlesService } from '../../../../../src/app/articles/articles.service';
import { SafeHtml, DomSanitizer, SafeScript } from '@angular/platform-browser';
import { SeoService } from '../../../../../src/app/core/services/seo.service';
import { AngularFireObject } from '@angular/fire/database';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';

// export interface Data {
//   title: string,
//   description: string,
//   image: string,
//   keywords: string,
//   slug: string
// }

@Component({
  selector: 'app-articles-show',
  templateUrl: './articles-show.component.html',
  styleUrls: ['./articles-show.component.scss']
})


export class ArticlesShowComponent implements OnInit {
  paramsId: string;
  product$: Observable<any>;

  jsonLD: SafeScript;
  // title: string;
  // description: string;
  // image: string;
  // keywords: string;
  // products$: Observable<Capo[]>;
  isLoggedIn = false;
  loggedInUserId: Observable<any>;

  ref: AngularFireObject<any>;
  data$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService,
    private authService: AdminService,
    private seo: SeoService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.paramsId = params.get('id');
    });
    // provide observable to view plus get data here to add to meta tags
    this.product$ = this.articlesService.showProduct(this.paramsId)

      .pipe(take(1), map(data => {
        const data1: any = data
        const title = data1.product.title
        const description1 = data1.product.description1
        const description2 = data1.product.description2
        const description3 = data1.product.description3
        const description4 = data1.product.description4
        const image = data1.images.image
        const datePublished = new Date
          (data1.dateAddedToDatabase).toISOString()
        const keywords = data1.product.keywords
        // const slug = data1.product.title.replace(/\s/g, '-')

        this.seo.generateTags({
          title: title,
          description: description1,
          image: image,
          keywords: keywords,
          slug: title.replace(/\s/g, '-')
        })

        // add json ld for seo
        this.jsonLD = `<script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "Article",
          "mainEntityOfPage": "${title}",
          "author": "Gavin Beard",
          "datePublished": "${datePublished}",
          "headline": "${title}",
          "image": "${image}",
          "dateModified": "${datePublished}",
          "articleBody": "${description1}. ${description2}. ${description3}. ${description4}",
          "publisher": {
            "@type": "Organization",
            "name": "Brighthill Lawyers",
            "logo":{
            "@type":"imageObject",
            "url":"https://firebasestorage.googleapis.com/v0/b/brighthill-8bd9c.appspot.com/o/favicon.png?alt=media&token=dd4f0374-d860-45a4-a48b-264128eabaf3"
            }
          }
          }</script>`

        return data
      }))


    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUserId = auth.uid;
        // this.loggedinUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

  }
  editProduct() {
    this.router.navigate([`articles/${this.paramsId}/edit`])
  }

  deleteProduct(imageName) {

    if (confirm("Completely delete product and all its associated images and data?")) {
      this.articlesService.deleteProduct(this.paramsId, imageName);
      this.router.navigate([`articles`])
    }
  }

}