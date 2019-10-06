import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {MatSnackBar,MatDialog} from '@angular/material';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import {Users} from '../../../shared/models/user.model';
import {Router,ActivatedRoute} from '@angular/router';

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

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';
import { isThisSecond } from 'date-fns';
import { ProfileArtImageComponent } from '../profile-art-image/profile-art-image.component';
import { DataService } from 'app/shared/services/data.service';

// this component is used to add artists user manages

@Component({
  selector: 'app-profile-blank',
  templateUrl: './profile-blank.component.html',
  styleUrls: ['./profile-blank.component.css'],
  animations: egretAnimations
})
export class ProfileBlankComponent implements OnInit {
private userDetails : firebase.User=null;


//// file upload 
// Main task 
task: AngularFireUploadTask;
// Progress monitoring
percentage: Observable<number>;
snapshot: Observable<any>;
// Download URL
downloadURL: Observable<string>;
// State for dropzone CSS toggling
isHovering: boolean;
/////

currentLang:string; 
// for list 
artists: Artist[];
editState: boolean = false;
artistToEdit: Artist;
ArtistToAdd:boolean = false;
funding_status: boolean = false;
// add and edit 
artist: Artist ={
  userId:'',
  roles:{artist : true},
  short_description_en:'',
  short_description_jp:'',
  objective:'',
  objective_jp:'',
  bronze_reward:'',
  bronze_reward_jp:'',
  silver_reward:'',
  silver_reward_jp:'',
  gold_reward:'',
  gold_reward_jp:'',
  firstName:'',
  lastName:'',
  artistName:'',
  labelName:'',
  path:'',
  twitterpage:'',
  website:'',
  facebookpage:'',
  isOpen:false,
  isFunding:false,
  isMonthlySubscribed:false,
  artist_patron_amount:0,
  artist_patron_count:0,
  artist_follower_count:0,
  videoquery:'',
  artist_patron_target_amount:0,

  }

shortIntro?:string;
expectation?:string;
userId:any;
user:any;
//artists:any
artistName:any;
firstName:any;
lastName:any;
labelName:any;
facebookpage:any;
twitterpage:any;
website:any;
short_description_en:any;
short_description_jp:any;
lang:any;

ArtistRef: AngularFirestoreDocument<any>;
Artist$:Observable<any>;
followersRef: AngularFirestoreCollection<any>;
followers$:Observable<any>;
DonorRef : AngularFirestoreCollection<any>;
donors$:Observable<any>

  constructor(
    public auth:AuthService,
    private afs:AngularFirestore,
    private fbs:FirebaseService,
    private router:Router,
    private ImageDialog: MatDialog,
    private route: ActivatedRoute,
    private storage:AngularFireStorage,
    private db: AngularFirestore,
    private data : DataService, 
  ) { 
   
  }

  ngOnInit() {
    // to get user id 
    this.auth.isLoggedIn().pipe(
      tap(user=>{
        if(user){
          this.userId = user.uid;
          console.log(user.uid)

          // get user associated with this user 
          this.fbs.getArtistsUnderUser(this.userId).subscribe(artists=>{
            this.artists=artists;
            
           
          
            console.log(this.artists);
             // display image 
             for(let entry of artists){
              let storageRef=firebase.storage().ref();
              let spaceRef=storageRef.child(`artists/${entry.path}`);
              if(entry.path){
                storageRef.child(entry.path).getDownloadURL().then(
                  (url)=>{
                   entry.path=url;
                  });
                  }
                 }
          });
       } 
      })
     ).subscribe();
    this.ArtistToAdd=false;
    
    if (this.artist.isFunding==true){
      this.funding_status=true; 
    } else {
      this.funding_status=false;

    }
    
   
}

// episode 63
loadMoreFollower(){
this.followers$ = this.followersRef.valueChanges();

}
toggleHover(event: boolean) {
  this.isHovering = event;
}

// Open Dialog for Image new startUpload
OpenImageUploadModal(event, artName){
  const dialogRef = this.ImageDialog.open(ProfileArtImageComponent);
  const userId = this.userId
  console.log(this.userId)
  dialogRef.afterClosed().subscribe(result=>{});
// share mail data with modal 
this.data.changeProjectOrArtist(artName);
this.data.changeCurrentUserId(this.userId);

}





// image uploading functions
startUpload(event: FileList, artName) {
  // The File object
  const file = event.item(0)
  
  // Client-side validation example
  if (file.type.split('/')[0] !== 'image') { 
    console.error('このファイルタイプはサポートされません ')
    return;
  }
  // The storage path
  //const path = `artists/${new Date().getTime()}_${file.name}`;
  const path =`artists/${file.name}`
  // Totally optional metadata
  const customMetadata = { app: 'Raison Detre Artists Image' };
  // The main task
  this.task = this.storage.upload(path, file, { customMetadata })
  // Progress monitoring
  this.percentage = this.task.percentageChanges();
  this.snapshot   = this.task.snapshotChanges();
  // The file's download URL
this.snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();

  ////saving data in artist node to firestore <-- need fix artistID or name is required
const image ={
  userId:this.userId, 
  roles: {artist:true},
  // storage path
  //path:`artists/${new Date()}_${file.name}`
  path:`artists/${file.name}`
 };

const imagePathToArtists = `artists/${this.userId}_${artName}`
const imagePathToUser = `users/${this.userId}/managed_artists/${this.userId}_${artName}`
//const imagePathToArtists =`artists/${this.userId}_artist`

// add additional data to the existing data 
 this.afs.doc(imagePathToArtists).set(image, { merge: true });
 this.afs.doc(imagePathToUser).set(image, {merge:true}); 
}


// Determines if the upload task is active
isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
}
// add state manipulation 
AddNewArtist(){
this.ArtistToAdd=true;
this.editState=false;

}
AddCrowdFundingState(){
  this.ArtistToAdd = false;
  this.editState=true;

  

  this.funding_status=true; 
}

ArtistAdd(){
  var now = new Date();
  const year = now.getFullYear() 
  const userId = this.userId;
  this.artist.userId = userId;
  console.log(this.userId)
if(this.artist.artistName!='' && this.artist.firstName){

  this.fbs.AddArtist(this.artist, year, userId, this.artist.artistName);
  // blank out all field to null
  this.artist.artistName='',
  this.artist.firstName='',
  this.artist.lastName='',
  this.artist.labelName='',
  this.artist.facebookpage='',
  this.artist.twitterpage='',
  this.artist.website='',
  this.artist.short_description_en='',
  this.artist.short_description_jp='',
  this.artist.objective='',
  this.artist.objective_jp='',
  this.artist.bronze_reward='',
  this.artist.bronze_reward_jp='',
  this.artist.silver_reward='',
  this.artist.silver_reward_jp='',
  this.artist.gold_reward='',
  this.artist.gold_reward_jp='',
  this.artist.isOpen=false,
  this.artist.isFunding=false,
  this.artist.isMonthlySubscribed=false,
  this.artist.videoquery='',
  this.artist.artist_patron_target_amount=0
  //this.artist.video_three='',
  //this.artist.video_four=''
}
this.clearState();
}
editArtist(event, Artist){
  this.editState=true;
  this.ArtistToAdd=false;
  this.artistToEdit = Artist;

 // list the follower 
  this.ArtistRef = this.afs.doc(`artists/${Artist.id}`)
  console.log(Artist.id)
  this.followersRef = this.ArtistRef.collection('followed',
   ref=>ref.orderBy('createdAt', 'desc'));
  //this.followersRef = this.ArtistRef.collection('followed')
  this.Artist$ =this.ArtistRef.valueChanges();

// list donors
//this.ArtistRef = this.afs.doc(`artists/${Artist.id}`)
this.DonorRef  = this.ArtistRef.collection('patrons', 
ref=>ref.orderBy('createdAt', 'desc'));
//this.Artist$=this.ArtistRef.Value

}
navigateToUser(event, userId){
  this.router.navigate([`profile/user-public/${userId}`])
}
ArtistUpdate(artist){
  this.fbs.updateArtist(artist, this.userId);
//  this.clearState();
}
clearState(){
  this.editState=false;
  this.artistToEdit = null;
}
CancelAddNewArtist(){
  this.ArtistToAdd=false;
  this.clearState();
}


}
