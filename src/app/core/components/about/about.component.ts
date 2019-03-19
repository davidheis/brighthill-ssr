import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../src/app/core/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  jsonLD;
  constructor(private seo: SeoService) { }

  ngOnInit() {

    this.seo.generateTags({
      title: 'About Brighthill Lawyers',
      description: 'A property law firm in Brisbane for commercial businesses. Litigation & Dispute Resolution. Insolvency & Debt Recovery. Wills & Estates & Trusts. Retaining wall disputes.',
      image: '/assets/nav-logo2.png',
      slug: 'about',
      keywords: 'Retaining Wall Dispute, Defence Lawyer, Debt recovery, Construction, Lease, Trusts, Wills and Estates, Manufacturing, Commercial Litigation, Property, Brisbane, Legal Services'
    })

    this.jsonLD = `<script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "AboutPage",
          "author": "Gavin Beard",
           "speakable":"Our Practice Director works with each client to provide resolution focused solutions that are best suited to satisfy the client’s existing and future business needs. Above all else, we provide practical and commercially focused legal services to resolve legal issues quickly. Our Practice Director, having worked in Commercial and Construction Manufacturing, has a strong commercial foundation to better understand your business structure and provide practical cost-effective solutions.",
            "provider":{  
      "@type":"LocalBusiness",
      "name":"Brighthill Lawyers",
      "telephone":"+610401508472",
      "priceRange":"0-10000000",
     
      "image":{
            "@type":"imageObject",
            "url":"https://firebasestorage.googleapis.com/v0/b/brighthill-ssr.appspot.com/o/favicon.png?alt=media&token=8c1f0cc9-4596-4b37-b868-4ae67f02fc14"
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
            "url":"https://firebasestorage.googleapis.com/v0/b/brighthill-ssr.appspot.com/o/favicon.png?alt=media&token=8c1f0cc9-4596-4b37-b868-4ae67f02fc14"
            }
          }
          }</script>`

  }

}
