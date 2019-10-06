import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { FirebaseService } from '../../../shared/services/firebase.service';
// check to see if user is login
import {first, tap} from 'rxjs/operators';

import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import {Artist} from '../../../shared/models/artist.model';
import {Featured} from '../../../shared/models/featured_artist.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestore} from 'angularfire2/firestore';
import { PARAMETERS } from '../../../../../node_modules/@angular/core/src/util/decorators';
import { SpotifyArtist, SpotifyAuthorizationResponse } from '../../../shared/common.interface';
import { isNullOrUndefined } from 'util';
// Share firebase artists
import {DataService} from "../../../shared/services/data.service";
import { TranslateService } from '../../../../../node_modules/@ngx-translate/core';
import { take } from '../../../../../node_modules/rxjs/operators';
import { followService } from '../../../shared/services/follow.service';


@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {
  currentLang:string; 
  mediaEvent:any;
  isActive:any;
  notification
  
  activityData = [{
    month: 'January',
    spent: 240,
    opened: 8,
    closed: 30
  }, {
    month: 'February',
    spent: 140,
    opened: 6,
    closed: 20
  }, {
    month: 'March',
    spent: 220,
    opened: 10,
    closed: 20
  }, {
    month: 'April',
    spent: 440,
    opened: 40,
    closed: 60
  }, {
    month: 'May',
    spent: 340,
    opened: 40,
    closed: 60
  }];

  tasks = [{
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }]

  tickets = [{
    img: 'assets/images/face-1.jpg',
    name: 'Mike Dake',
    text: 'Excerpt pipe is used.',
    date: new Date('07/12/2017'),
    isOpen: true
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Doe',
    text: 'My dashboard is not working.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-3.jpg',
    name: 'Jhonson lee',
    text: 'Fix stock issue',
    date: new Date('04/10/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-4.jpg',
    name: 'Mikie Jyni',
    text: 'Renew my subscription.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Dake',
    text: 'Payment confirmation.',
    date: new Date('04/10/2017'),
    isOpen: false
  }]

  photos = [{
    name: 'Photo 1',
    url: 'assets/images/sq-15.jpg'
  }, {
    name: 'Photo 2',
    url: 'assets/images/sq-8.jpg'
  }, {
    name: 'Photo 3',
    url: 'assets/images/sq-9.jpg'
  }, {
    name: 'Photo 4',
    url: 'assets/images/sq-10.jpg'
  }, {
    name: 'Photo 5',
    url: 'assets/images/sq-11.jpg'
  }, {
    name: 'Photo 6',
    url: 'assets/images/sq-12.jpg'
  }]

// @Input() UserId : string  

userId:string;
user:any;
art:any;
user_managing_artist_count:any;
  constructor(
    public auth:AuthService,
    public fbs:FirebaseService,
    public data:DataService,
  
    private fl:followService,
    private router: Router

   ) { }

  ngOnInit() {
   
   
this.auth.isLoggedIn().pipe(
  tap(user=>{
    if(user){
      this.userId = user.uid;
      console.log(user.uid)
      this.data.changeCurrentUserId(this.userId)
    } 
  })
)
.subscribe(user=>{
  this.user=user;
  this.userId = user.uid;
 
  this.fl.ConnectionRequestList(this.userId).subscribe(notification=>{
    this.notification = notification;
    console.log(this.userId)
    console.log(notification)
  })
});
　//this.user= this.fbs.getUser(this.userId).subscribe(user=>{
  //this.user=user;
  //
  


this.fbs.getMediaArtProjects().subscribe(mediaEvent=>{
  this.mediaEvent = mediaEvent;
  take(6);
  this.getImage(mediaEvent);
});
  // get new artist image
  this.fbs.getArtists().subscribe(art=>{
    this.art=art;
    take(6);
   this.getImage(art);
  })

 

}


getImage(list){
  
  for(let entry of list){
    let storageRef=firebase.storage()
    //  let spaceRef = storageRef.child(`${entry.path}`);
       if(entry.path){
        storageRef.refFromURL(`${entry.path}`).getDownloadURL()
       .then(
         (url)=>{
            entry.path=url;
          }
       )
      }
  }

}

ConfirmConnection(event, requestorId){
  const requestedId =this.userId
  console.log(this.userId)
this.fl.ConfirmConnection(requestorId, requestedId)


}

NavigatetoArtist(event, art){
  this.router.navigate([`projects/funding-artist-list`])
  //this.data.changeProject(art.id)
}

NavigatetoProject(event, art){
  this.router.navigate([`projects/funding-project-list`])
  //this.data.changeProject(art.id)
}

}
