import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {FirebaseService} from '../../../shared/services/firebase.service';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import {Users} from '../../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import {Artist} from '../../../shared/models/artist.model'
// file import 
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { isObject } from 'util';
import * as firebase from 'firebase/app';
import {Project} from '../../../shared/models/project.model';

import {AngularFireFunctions} from 'angularfire2/functions'

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';
import {MatSnackBar,MatDialog} from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router';
import { DataService } from 'app/shared/services/data.service';

import {ProfileEventImageComponent} from '../profile-event-image/profile-event-image.component';

@Component({
  selector: 'app-profile-events',
  templateUrl: './profile-events.component.html',
  styleUrls: ['./profile-events.component.css']
})
export class ProfileEventsComponent implements OnInit {
  private userDetails : firebase.User=null;

  userId:any;
  event:any;
  user:any;
  projects:Project[];
  ProjectRef: AngularFirestoreDocument<any>;
  Project$:Observable<any>;
  followersRef: AngularFirestoreCollection<any>;
  followers$:Observable<any>;
  DonorRef: AngularFirestoreCollection<any>;

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

proj:any;

editProjectState: boolean = false;
projectToEdit: Project;
AddProjectState:boolean = false;
// add and edit 
from: any;

  project : Project ={
    userId:'',
    project_name:'',
    type:'',
    project_owner:'',
    short_description_en:'',
    short_description_jp:'',
    long_description_en:'',
    long_description_jp:'',
    objective_en:'',
    objective_jp:'',
    isOpen:false,
    status:false,
    date:'',
    start_at:'',
    venue:'',
    ticketprice:'',

  }



type: string = 'Type';
projectType = [
  { value: 'EventIdea', viewValue: 'イベント案' },
  { value: 'Event', viewValue: '実行可能イベント' },
 
];

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
  ) { }

  ngOnInit() {

this.auth.isLoggedIn().pipe(
  tap(user=>{
    this.userId=user.uid;
    console.log(user.uid)

    this.fbs.getProjectsUnderUser(this.userId).subscribe(event=>{
      this.event=event;
      console.log(this.event);

      // display image of events
      for (let entry of event){
        let storageRef=firebase.storage().ref();
        let spaceRef = storageRef.child(`projects/${entry.path}`);
        if(entry.path){
          storageRef.child(entry.path).getDownloadURL().then(
            url=>{
              entry.path=url;
            }
          )
        }
      }
    })
  })
).subscribe();
 　this.user= this.fbs.getUser(this.userId).subscribe(user=>{
   this.user=user;
})}

// episode 63
loadMoreFollower(){
  this.followers$ = this.followersRef.valueChanges();
  
  }
toggleHover(event: boolean) {
  this.isHovering = event;
}


// Open Dialog for Image new startUpload
OpenImageUploadModal(event, eventName){
  const dialogRef = this.ImageDialog.open(ProfileEventImageComponent);
  const userId = this.userId
  console.log(this.userId)
  dialogRef.afterClosed().subscribe(result=>{});
// share mail data with modal 
this.data.changeProjectOrArtist(eventName);
this.data.changeCurrentUserId(this.userId);

}

// image uploading functions
startUpload(event:FileList, eventName){
  const file = event.item(0);

  // client side validation example
  if (file.type.split('/')[0] !== 'image') { 
    console.error('このファイルタイプはサポートされません ')
    return;
  }
// storage Path
const path = `projects/${file.name}`
// Totally optional metadata
const customMetadata = { app: 'Raison Detre Events Image' };
 // The main task
 this.task = this.storage.upload(path, file, { customMetadata })
  // Progress monitoring
 this.percentage = this.task.percentageChanges();
 this.snapshot   = this.task.snapshotChanges();
  // The file's download URL
  this.snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
  ////saving data in project node to firestore <-- need fix projectId or name is required
  const image ={
    userId:this.userId, 
    roles: {Project_Owner:true},
    // storage path
    //path:`artists/${new Date()}_${file.name}`
    path:`projects/${file.name}`
   };

   const imagePathToEvents = `projects/${this.userId}_${eventName}`
   const imagePathToUser = `users/${this.userId}/managed_projects/${this.userId}_${eventName}`
   //const imagePathToArtists =`artists/${this.userId}_artist`
   
   // add additional data to the existing data 
    this.afs.doc(imagePathToEvents).set(image, { merge: true });
    this.afs.doc(imagePathToUser).set(image, {merge:true}); 

}

// Determines if the upload task is active
isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
}
// Evemt Add 
EventAdd(){
  var now = new Date();
  const year = now.getFullYear(); 
  const userId = this.userId;
  this.project.userId = userId;
  if(this.project.project_name!=''){
    this.fbs.AddProject(this.project, year, userId, this.project.project_name);
    console.log(this.userId)
    // clear the fields 
    this.project.project_name='',
    this.project.type='',
    this.project.project_owner='',
    this.project.short_description_en='',
    this.project.short_description_jp='',
    this.project.long_description_en='',
    this.project.long_description_jp='',
    this.project.objective_en='',
    this.project.objective_jp='',
    this.project.target_amount=0,
    this.project.isOpen=false,
    this.project.status=false,
    this.project.date='',
    this.project.venue='',
    this.project.start_at='',
    this.project.ticketprice=''
  }
  this.clearState();
}

clearState(){
  this.editProjectState=false;
  this.projectToEdit = null;
}

// Event Edit State control
editEvent(event, Project){
  this.editProjectState=true;
  this.AddProjectState=false;
  this.projectToEdit=Project;
  
  // list the follower
  this.ProjectRef = this.afs.doc(`projects/${Project.id}`);
  console.log(Project.id);
  this.followersRef = this.ProjectRef.collection('followed',
  ref=>ref.orderBy('createdAt', 'desc'));
  this.Project$=this.ProjectRef.valueChanges();
  // list donar 
  this.DonorRef  = this.ProjectRef.collection('patrons', 
  ref=>ref.orderBy('createdAt', 'desc'));
  //this.Artist$=this.ArtistRef.Value
  
  }
  // navigate to the individual users
  navigateToUser(event, userId){
    this.router.navigate([`profile/user-public/${userId}`])
  }

// Update Proejct
EventUpdate(proj){
  this.fbs.updateProject(proj, this.userId)
  }

// Add State Control 
AddNewEventProject(){
  this.AddProjectState=true;
  this.editProjectState=false;
  }


CancelAddNewEventProject(){
  this.AddProjectState=false;
  this.clearState();
}
onValueChange(e):void{
  console.log(e.target.value);
  console.log('this.from = ', this.from);
}


}
