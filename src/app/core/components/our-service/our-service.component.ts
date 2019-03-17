import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../src/app/core/services/seo.service';

@Component({
  selector: 'app-our-service',
  templateUrl: './our-service.component.html',
  styleUrls: ['./our-service.component.scss']
})
export class OurServiceComponent implements OnInit {
  jsonLD;
  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags({ 
      title: 'Lawyer Services',
      description: 'Wills, Estates, Trusts, Property services, Debt Recovery, Commercial litigation, in a timely and cost-effective means which is practical and resolution focused.',
      image: '/assets/nav-logo2.png',
      slug: 'Lawyer-Services',
      keywords: 'Lawyer Services, Business, Litigation & Dispute, Wills, Estates, Trusts, Construction, Property, Real Estate, Insolvency, Debt Recovery, Manufacturing, commercial litigation, property, brisbane, legal services, budget, cost-effective'
    })
    this.jsonLD = `<script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "Service",
           "hasOfferCatalog":{  
      "@type":"OfferCatalog",
      "name":"Legal services",
      "itemListElement":[  
         {  
            "@type":"OfferCatalog",
            "name":"Legal Services",
            "itemListElement":[  
               {  
                  "@type":"Offer",
                  "itemOffered":{  
                     "@type":"Service",
                     "name":"Litigation And Dispute Resolution"
                  }
               },
               {  
                  "@type":"Offer",
                  "itemOffered":{  
                     "@type":"Service",
                     "name":"Property And Real Estate"
                  }
               },
               {  
                  "@type":"Offer",
                  "itemOffered":{  
                     "@type":"Service",
                     "name":"Construction"
                  }
               },
               {  
                  "@type":"Offer",
                  "itemOffered":{  
                     "@type":"Service",
                     "name":"Insolvency And Debt Recovery"
                  }
               },
               {  
                  "@type":"Offer",
                  "itemOffered":{  
                     "@type":"Service",
                     "name":"Commercial And Business"
                  }
               },
               {  
                  "@type":"Offer",
                  "itemOffered":{  
                     "@type":"Service",
                     "name":"Wills And Estates And Trusts"
                  }
               }
            ]
         }
      ]
   },
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

}
