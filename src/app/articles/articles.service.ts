import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

// import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorage } from '@angular/fire/storage';

// import { switchMap } from 'rxjs/internal/operators/switchMap';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
// import { take } from 'rxjs/internal/operators/take';
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  uploadProgress: Observable<number>;
  products$: Observable<any>;
  task;
  ref;
  downloadUrl: Observable<string | null>;
  
  constructor(
    private db: AngularFireDatabase,
    private afStorage: AngularFireStorage
  ) {

    this.products$ = this.db.list('/articles').snapshotChanges()
      .pipe( map(actions => {
        return actions.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      }))
      

   }

  getProducts() {
    return this.products$;
  }


  addNewProduct(product) {
    product.dateAddedToDatabase = Date.now();
    return this.db.list('/articles').push(product);
    // return this.productsCollection.add(listing).then(result => {
    //   // this.flashMessagesService.show("Successfully added artist", {
    //   //   cssClass: "alert-success",
    //   //   timeout: 6000
    //   // });
    //   // this.router.navigate(["artists"]);
    // })
    //   .catch(err => console.log(err));
  }

  showProduct(id: string) {
    // this.coin$ = this.afs.object("/coins/" + id) as Coin;
    // return this.coin$;
    return this.db.object("/articles/" + id).snapshotChanges()
      .pipe(map(actions => {
        return { key: actions.payload.key, ...actions.payload.val() }
      }))
    // this.productDoc = this.afs.doc("/products/" + id);
    // return this.productDoc.snapshotChanges().pipe(map(item => {
    //   const data = item.payload.data() as Product;
    //   const id = item.payload.id;

    //   return { id, ...data };
    // }))
  }

  updateProduct(id: string, product) {
    return this.db.object("/articles/" + id).update(product)
      // .then(() => {
      //   this.flashMessagesService.show("Successfully updated event", { cssClass: "alert-success", timeout: 6000 });
      //   this.router.navigate([`events`]);

      // })
      .catch(err => { console.log(err) });
  }

  uploadImage(id, event: any) {
    const file = event.target.files[0];
    this.ref = this.afStorage.ref(`images/articles/${id}/${file.name}`);
    this.task = this.ref.put(file)
    this.uploadProgress = this.task.percentageChanges()
    setTimeout(() => {

      this.downloadUrl = this.ref.getDownloadURL();
      return this.downloadUrl
        .pipe(switchMap(downloadURL => {
          return this.db.object(`/articles/${id}/images`).update({
            image: downloadURL,
            imageName: `${file.name}`
          })
        }))
        .subscribe()
    }, 10000);

  }
  uploadPdf(id, event: any) {
    const file = event.target.files[0];
    this.ref = this.afStorage.ref(`pdf/articles/${id}/${file.name}`);
    this.task = this.ref.put(file)
    this.uploadProgress = this.task.percentageChanges()
    setTimeout(() => {

      this.downloadUrl = this.ref.getDownloadURL();
      return this.downloadUrl
        .pipe(switchMap(downloadURL => {
          return this.db.object(`/articles/${id}/pdf`).update({
            pdfUrl: downloadURL,
            pdfName: `${file.name}`
          })
        }))
        .subscribe()
    }, 10000);

  }


  deleteProduct(id, imageName) {
    // TODO delete all associated images aswell
    // delete from database
    this.db.object("/articles/" + id)
      .remove()
      .catch(err => {
        console.log(err);
      });

    if (imageName !== undefined) {
      firebase.storage().ref(`images/articles/${id}/${imageName}`)
        .delete()
        .catch(err => {
          console.log(err);
        })
    }
  }


}
