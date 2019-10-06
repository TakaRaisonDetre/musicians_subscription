import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {MatSnackBar} from '@angular/material';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import {Users} from '../../../shared/models/user.model';
import {Router,ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '../../../../../node_modules/angularfire2/firestore';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import {Artist} from '../../../shared/models/artist.model'
// file import 
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '../../../../../node_modules/@ngx-translate/core';
import { isObject } from 'util';
import * as firebase from 'firebase/app';
import { followService } from '../../../shared/services/follow.service';
import {MatSidenav, MatDialog} from '@angular/material';
import { ProfileMailComposeComponent } from '../profile-mail-compose/profile-mail-compose.component';
import { DataService } from '../../../shared/services/data.service';

@Component({
    selector:'app-profile-connection',
    templateUrl:'./profile-connections.component.html',
    styleUrls:['./profile-connections.component.css'],
    animations:egretAnimations
})
export class ProfileConnectionsComponent implements OnInit {
   isMoible;
   screenSizeWatcher : Subscription;
   isSidenavOpen : Boolean = true;
  // selectToggleFlag = false; 
 
    isActive = false;
    user:any;
    userId:any;
    uid:any;
    connectedTo:any;
    connectedFrom:any;
    receiver:string;
    senser:string;
    recieverid;
    recieverName; 
    reciverPhoto

constructor( public auth:AuthService,
    private fl:followService,
    private fbs:FirebaseService,
    private router:Router,
    private composeDialog : MatDialog,
    private data : DataService ){}

ngOnInit(){
    
  this.auth.isLoggedIn().pipe(
    tap(user=>{
      if(user){
        this.userId = user.uid;
        console.log(user.uid)
      } 
    })
  )
  .subscribe(user=>{
    this.user=user;
    this.userId = user.uid;
  
    this.fl.getConnectionTo(this.userId).subscribe(connectedTo=>{
      this.connectedTo = connectedTo;
     
    })
    this.fl.getConnectionFrom(this.userId).subscribe(connectedFrom=>{
      this.connectedFrom = connectedFrom;

    })

  });



}
gotoindividual(event, userId){
    this.router.navigate([`/profile/user-public/${userId}`])
}

openComposeDialog(event, recieverid, recieverName, reciverPhoto){
  const dialogRef = this.composeDialog.open(ProfileMailComposeComponent);
  dialogRef.afterClosed().subscribe(result=>{})
    console.log(recieverid, recieverName ,reciverPhoto)
    // share with modal
    this.data.changeMailtoID(recieverid);
    this.data.changeMailtoName(recieverName);
    this.data.changeMailtoPhoto(reciverPhoto);
}



}