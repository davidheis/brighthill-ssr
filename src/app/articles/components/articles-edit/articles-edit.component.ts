import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../articles.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss']
})
export class ArticlesEditComponent implements OnInit {
  paramsId: string;
  product$: Observable<any>;
  // isLoading = false;
  // uploadProgress: Observable<number>;
  paramsObservable;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService
    
  ) { }

  ngOnInit() {
    this.paramsObservable = this.route.paramMap.subscribe(params => {
      this.paramsId = params.get('id');
    });

    this.product$ = this.articlesService.showProduct(this.paramsId);


  }
  updateProduct(updatedProduct) {
    // console.log(updatedProduct)
    updatedProduct.seoFriendlyTitle = updatedProduct.title.replace(/\W/g, '-')
    this.articlesService.updateProduct(this.paramsId, { product: updatedProduct })
      .then(() => {
        // this.isLoading = false;
        this.router.navigate([`articles/${this.paramsId}/show`])
      }

      )
  }

  uploadImages(image) {
    this.articlesService.uploadImage(this.paramsId, image)

    // this.router.navigate([`articles/${this.paramsId}/show`])
    // setTimeout(() => {
    //   this.uploadProgress = this.capoService.getUploadProgress()
    //   //  this.downloadUrl = this.capoService.downloadUrl
    // }, 200);
  }
  uploadPdf(pdf) {
    this.articlesService.uploadPdf(this.paramsId, pdf)

    // this.router.navigate([`articles`])
  }

}
