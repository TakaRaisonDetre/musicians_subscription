import { Component, OnInit, Input } from '@angular/core';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import {Artist} from '../../../shared/models/artist.model';
import {Featured} from '../../../shared/models/featured_artist.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { AngularFirestore} from 'angularfire2/firestore';
import { PARAMETERS } from '../../../../../node_modules/@angular/core/src/util/decorators';


import { SpotifyArtist, SpotifyAuthorizationResponse } from '../../../shared/common.interface';
import { isNullOrUndefined } from 'util';
// Share firebase artists
import {DataService} from "../../../shared/services/data.service";

import { take } from '../../../../../node_modules/rxjs/operators';
import { followService } from '../../../shared/services/follow.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//import { totalmem } from 'os';
import { tap } from '../../../../../node_modules/rxjs/operators';
import { AuthService } from '../../../core/auth.service';
import { MatSnackBar } from '@angular/material';


import {concat} from 'rxjs/operators';
import { of} from 'rxjs';

@Component({
  selector: 'app-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.scss']
})

export class ProfilePublicComponent implements OnInit {
lang:any;
user:any;
art:any;
userId:any;
project:any;
artists:any;
projects:any;

// getting following EP63
userRef:AngularFirestoreDocument<any>;
user$:Observable<any>;
// for project 
projectRef: AngularFirestoreCollection<any>;
project$:Observable<any>;
// for artist
artistRef : AngularFirestoreCollection<any>;
artist$:Observable<any>;
RequesterId:any;
RequesterName:any;
Requestor:any;
RequesterPhotoURL:any;
uid:any;
connected:any;
connection : any;
userName:any;
userPhoto:any;
notconnected:any;
connectedState:boolean = false;

  constructor(
    public fbs: FirebaseService, 
    private afs: AngularFirestore,
    private router : Router,
    private route : ActivatedRoute,
    private data: DataService,
    private fl:followService,
    public auth:AuthService,
    public snackBar : MatSnackBar,
  ) { 
    this.connectedState= false;
   }

  ngOnInit() {
   this.auth.isLoggedIn().pipe(
     tap(user=>{
       if(user){
         this.RequesterId = user.uid;
         this.RequesterName = user.displayName;
         this.RequesterPhotoURL = user.photoURL;
         this.Requestor = this.fbs.getUser(this.RequesterId)
       }
     })
   )
   .subscribe(Requestor=>{
     this.Requestor=Requestor;
   });


   // receive user id parameter 
    this.user = this.route.params.switchMap(param=>
      this.fbs.getUser(param.id))
   // user information
   this.user.subscribe(user=>{
     this.user=user;
     this.userId=user.id;
     this.userName = user.displayName;
     this.userPhoto = user.photoURL;
  
 this.fl.getArtistsUserFollow(this.userId).subscribe(
   artists=>{
     this.artists=artists;
     this.getMultipleImage(artists)
   })  

 this.fl.getProjectUnderThisUser(this.userId).subscribe(
   projects=>{
     this.projects=projects;
     this.getMultipleImage(projects)
   })
// check to see if this user is connected with login user
console.log(this.RequesterId);
console.log(this.userId);

//this.fl.CheckToConnected(connectedId).subscribe(
this.fl.CheckToConnected(this.userId, this.RequesterId).subscribe(
connected=>{
  this.connected = connected;
  console.log(this.connected)
  console.log(this.userId)
  console.log(this.connected.requestFrom, this.connected.requestTo)
  
  if(this.connected){
   // this.connectedState=true;
    if(this.connected.connected==true && 
      (this.connected.requestFrom==this.userId && this.connected.requestTo==this.RequesterId
      || this.connected.requestFrom==this.RequesterId && this.connected.requestTo==this.userId)
      )
     {
       this.connection = 'Connected';
       this.ChangeConnctedStateToBeTrue();
     } else 
     if(this.connected.connected==false && 
      (this.connected.requestFrom==this.userId && this.connected.requestTo==this.RequesterId
      || this.connected.requestFrom==this.RequesterId && this.connected.requestTo==this.userId)
      ) 
     {
       this.connection = 'Pending';
       this.ChangeConnctedStateToBeTrue();
      } 
  } else { 
    this.changeConnectedStateToBeFalse();
   
  }
  
  });
});
}

changeConnectedStateToBeFalse(){
  this.connectedState=false;
}
ChangeConnctedStateToBeTrue(){
  this.connectedState=true;
}

getMultipleImage(list){
    for(let entry of list){
      let storageRef=firebase.storage().ref();
      let spaceRef=storageRef.child(`/${entry.path}`);
      if(entry.path){
        storageRef.child(entry.path).getDownloadURL().then(
          (url)=>{
           entry.path=url;
          });
      }
    }
}
ConnectWithUser()
{
  if(this.userId){
    let connection ={
      requestFrom : this.RequesterId,
      requestFromName : this.RequesterName,
      requestFromPhotoURL : this.RequesterPhotoURL,
      requestTo : this.userId,
      requestToName :this.userName,
      requestToPhotoURL : this.userPhoto,
      connected : false
    }
   // save information to firebase
    this.fl.ConnectwithUser(connection, this.RequesterId, this.userId); 
    this.snackBar.open('Thank you for your request to connect', 'close',
    {duration:3000})
  } else {
    this.snackBar.open('Please login first to connect this user', 'close',
    {duration: 3000});
  }
}


navigatetoKey(event, proj){
    // navigate to single artists
    this.fbs.getSingleArtist(proj.id);
    console.log(proj.id)
      this.router.navigate([`/projects/project/${proj.id}`]); 
      this.data.changeProject(proj.id)
  }



}
