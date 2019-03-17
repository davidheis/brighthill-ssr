import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
// import { Router } from '@angular/router';
// 
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
import * as firebase from 'firebase/app';
// import { firebase } from '@firebase/app';
// import { map } from 'rxjs/internal/operators/map';
import { of } from 'rxjs';

@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class AdminService {

  user$: Observable<any>;
  userUID; 
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,

  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState
      .pipe(switchMap(user => {
        if (user) {
          return this.db.object(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }))
      
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  // facebookLogin() {
  //   const provider = new firebase.auth.FacebookAuthProvider()
  //   return this.oAuthLogin(provider);
  // }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
        // this.flashMessagesService.show("Logged in", {
        //   cssClass: "alert-success",
        //   timeout: 10000
        // });
      })
      .catch(err => {
        // this.flashMessagesService.show(err.message, {
        //   cssClass: "alert-danger",
        //   timeout: 10000
        // });
        console.log(err)
      });
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userRef = this.db.object(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      creationTime: user.metadata.creationTime
    }
    // if doc exists then any new data will get updated , else it will create new user if update fails
    return userRef.update(data).catch((err) => {
      userRef.set(data);
      console.log(err);
    })



  }

  getAuth() {
    // return this.afAuth.authState.map(auth => auth);
    return this.user$;
  }
  logout() {
    return this.afAuth.auth.signOut().then(() => {
      // this.flashMessagesService.show("Logged out", {
      //   cssClass: "alert-success",
      //   timeout: 6000
      // });
      
    })
      .catch(err => console.log(err));
  }

}
