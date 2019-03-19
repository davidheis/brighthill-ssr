import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../src/app/core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Brighthill Lawyers Services',
      description: 'A property law firm in Brisbane for commercial businesses. Retaining wall disputes. Litigation & Dispute Resolution. Insolvency & Debt Recovery. Wills & Estates & Trusts. ',
      image: '/assets/nav-logo2.png',
      slug: 'Lawyer-Services',
      keywords: 'Retaining Wall Dispute, Defence Lawyer, Debt recovery, Construction, Lease, Trusts, Wills and Estates, Manufacturing, Commercial Litigation, Property, Brisbane, Legal Services'
    })
  }

}
