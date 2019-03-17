import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { SeoService } from '../../../../../src/app/core/services/seo.service';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isChecked = false;
  jsonLD;
  constructor(
    private http: HttpClient,
    private router: Router,
    private seo: SeoService,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Contact Brighthill Lawyers',
      description: 'Contact Brighthill Lawyers. Brisbane Commercial litigation and property law firm defending businesses. Practical commercial legal services for the client’s business.',
      image: '/assets/nav-logo2.png',
      slug: 'contact',
      keywords: 'Contact Lawyer, Construction, Manufacturing, commercial litigation, property, brisbane, legal services, budget, cost-effective'
    })

    this.jsonLD = `<script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "ContactPage",
          "author": "Gavin Beard",
            "provider":{  
      "@type":"LocalBusiness",
      "name":"Brighthill Lawyers",
      "telephone":"+610401508472",
      "priceRange":"0-10000000",
      "image":{
            "@type":"imageObject",
            "url":"https://firebasestorage.googleapis.com/v0/b/brighthill-8bd9c.appspot.com/o/favicon.png?alt=media&token=dd4f0374-d860-45a4-a48b-264128eabaf3"
            },
       "address":{  
      "@type":"PostalAddress",
      "addressLocality":"Brisbane",
      "addressRegion":"QLD",
      "postalCode":"4003",
      "streetAddress":"PO BOX 12639"
       }
   },
          "publisher": {
            "@type": "Organization",
            "name": "Brighthill Lawyers",
            "logo":{
            "@type":"imageObject",
            "url":"https://firebasestorage.googleapis.com/v0/b/brighthill-8bd9c.appspot.com/o/favicon.png?alt=media&token=dd4f0374-d860-45a4-a48b-264128eabaf3"
            }
          }
          }</script>`

  }
 
  
  sendEmail(value) {
    // firebase plan must be upgraded to blaze for function to work
    const url = `https://us-central1-brighthill-ssr.cloudfunctions.net/contactPage`;
    const params = new HttpParams()
      .set("contactPageEmail", value.contactPageEmail)
      .set("name", value.name)
      .set("subject", value.subject)
      .set("message", value.message);
    this.router.navigate([""]);
    this.flashMessagesService.show("Thank you. Message successfully sent.", {
      cssClass: "alert-success",
      timeout: 6000
    });
    this.http
      .post(url, {}, { params: params })
      .pipe(take(1))
      // { params: new HttpParams().set("text", value.subscribersEmail) }
      .subscribe(
        data => data,
        err => {
          // tslint:disable-next-line:max-line-length
          console.log(
            // tslint:disable-next-line:max-line-length
            "Something went wrong! or .end() canceled the functions, withouth .end() in the function it keeps looping and sending emails",
            err
          );
        }
      )
  }
}
