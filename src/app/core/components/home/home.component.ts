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
      description: 'Wills, Estates, Trusts, Property services, Debt Recovery, Commercial litigation, in a timely and cost-effective means which is practical and resolution focused.',
      image: '/assets/nav-logo2.png',
      slug: 'Lawyer-Services',
      keywords: 'Lawyer Services, Business, Litigation & Dispute, Wills, Estates, Trusts, Construction, Property, Real Estate, Insolvency, Debt Recovery, Manufacturing, commercial litigation, property, brisbane, legal services, budget, cost-effective'
    })
  }

}
