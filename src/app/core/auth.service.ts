import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { of} from 'rxjs';
import { from } from 'rxjs'
import 'rxjs/add/operator/switchMap';

import {Users} from '../shared/models/user.model';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import { NotifyService } from '../shared/services/auth/notify.service';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";

//import { User } from './user'; 

@Injectable()
export class AuthService {

user : Observable<Users | null>;
data;
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notify: NotifyService
    ){


        /// Get auth Data, then firestore user document // null
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
              if (user) {
                return this.afs.doc<Users>(`users/${user.uid}`).valueChanges();
              } else {
                return of(null);
              }
            })
            // tap(user => localStorage.setItem('user', JSON.stringify(user))),
            // startWith(JSON.parse(localStorage.getItem('user')))
          );
    }
     
     

    ////// OAuth Methods /////

  googleLogin(){
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.oAuthLogin(provider);
        
    }  
    // facebook 
  facebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }
  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }
  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential)=>{
        this.updateUserData(credential.user)
    })
    .catch(error=> this.handleError(error));
}
private updateUserData(user:Users) {
    // sets user data to firebase on login 
    const userRef : AngularFirestoreDocument<Users> = this.afs.doc(`users/${user.uid}`);
    const data : Users ={
        uid : user.uid,
        email : user.email,
        displayName : user.displayName,
        photoURL : user.photoURL || './assets/images/an.png',
      //  roles:{user:true}
      }
return userRef.set(data, { merge: true })
}

//// Email/Password Auth ////
emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome new user!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome back!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }
   // Sends email allowing user to reset password
   resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }
// If error, console log and notify user
private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  isLoggedIn(){
    return this.afAuth.authState.pipe(first());
  }

  // Used by the http interceptor to set the auth header
  getUserIdToken(): Observable<string> {
      return from ( this.afAuth.auth.currentUser.getIdToken() );
  }

  
  ///// STRIPE CONNECT //////


  // Login popup window
  stripeLogin() {
    const popup = window.open(`${environment.functionsURL}/stripeRedirect`, '_blank', 'height=700,width=800')
  }
  // Signin with a custom token from 
  customSignIn(token) {
    return this.afAuth.auth.signInWithCustomToken(token).then(() => window.close())
  }

  

}