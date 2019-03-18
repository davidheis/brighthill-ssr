import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../../../src/app/admin/admin.service';
import { ArticlesService } from '../../articles.service';

@Component({
  selector: 'app-articles-new',
  templateUrl: './articles-new.component.html',
  styleUrls: ['./articles-new.component.css']
})
export class ArticlesNewComponent implements OnInit {
  productAuthorId: string;
  paramsId: string;
  newProductAdded:boolean;
  newProductId: string;
  constructor(
    private router: Router,
    private authService: AdminService,
    private articlesService: ArticlesService,
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {

      if (auth) {
        this.productAuthorId = auth.uid;
        //   this.isLoggedIn = true;
        //   // this.loggedinUser = auth.email;
      } else {
        return null;
        // this.isLoggedIn = false;
      }
    });
  }
  newProduct(product) {

    product.seoFriendlyTitle = product.title.replace(/\W/g, '-')
    this.articlesService.addNewProduct({ product: product, productAuthorId: this.productAuthorId })
      .then((res) => {
        this.newProductAdded = true;
        this.newProductId = res.key;
        // this.isLoading = false;
        // this.router.navigate(["articles"]);
      })

  }
  uploadImages(image) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    this.articlesService.uploadImage(this.newProductId, image)
    
    this.router.navigate([`articles`])
    // setTimeout(() => {
    //   this.uploadProgress = this.capoService.getUploadProgress()
    //   //  this.downloadUrl = this.capoService.downloadUrl
    // }, 200);
  }
  uploadPdf(pdf) {
    // create a random id
    this.articlesService.uploadPdf(this.newProductId, pdf)
    
    this.router.navigate([`articles`])
    // setTimeout(() => {
    //   this.uploadProgress = this.capoService.getUploadProgress()
    //   //  this.downloadUrl = this.capoService.downloadUrl
    // }, 200);
  }

}
