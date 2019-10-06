import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {MatSnackBar} from '@angular/material';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import {Users} from '../../../shared/models/user.model';
import {Router} from '@angular/router';
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

// stripe 
declare var Stripe :any;
const stripe = Stripe('pk_test_7IihGruTmmTQDCzVCPYsip34')
const elements = stripe.elements();

const style={
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}
const card = elements.create('card', {style: style});
@Component({
  selector: 'app-profile-project',
  templateUrl: './profile-project.component.html',
  styleUrls: ['./profile-project.component.css'],
  animations: egretAnimations
})
export class ProfileProjectComponent implements OnInit {
@ViewChild('cardForm') cardForm :ElementRef;

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
lang:string; 
// for list 
userId:any;
user:any;
proj:any;
projects:Project[];
editProjectState: boolean = false;
projectToEdit: Project;
AddProjectState:boolean = false;
// add and edit 
from: any;

ProjectRef: AngularFirestoreDocument<any>;
Project$:Observable<any>;
followersRef: AngularFirestoreCollection<any>;
followers$:Observable<any>;
DonorRef: AngularFirestoreCollection<any>;

project : Project ={
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

  // reward_gold_en:'',
  // reward_gold_ja:'',
  // reward_silver_en:'',
  // reward_silver_ja:'',
  // reward_bronze_en:'',
  // reward_bronze_ja:'',
  // reward_black_en:'',
  // reward_black_ja:'',
  // createdAt:'',
  // path:''
}


type: string = 'Type';
projectType = [
  { value: 'EventIdea', viewValue: 'イベント案' },
  { value: 'Fanclub', viewValue: 'Fan club' },
  { value: 'npo', viewValue: '非営利団体プロジェクト' },
];


  constructor(public auth:AuthService,
    private afs:AngularFirestore,
    private fbs:FirebaseService,
    private router:Router,
    private storage:AngularFireStorage,
    private db: AngularFirestore,
    private aff: AngularFireFunctions

  ) { }
// stripe
ngAfterViewInit() {
//  card.mount(this.cardForm.nativeElement);
}
// stripe
async handleForm(e) {
  e.preventDefault();
  const { token, error } = await stripe.createToken(card);
  if (error) {
    // Inform the customer that there was an error.
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else{
    const res = await this.aff
    .httpsCallable('startProjectSubscription')({ source: token.id })
    .toPromise();
  console.log(res);
  }

}



ngOnInit() { 
this.auth.isLoggedIn().pipe(
  tap(user=>{
    if(user){
      this.userId = user.uid;
      console.log(user.uid)
     // get projects created by this user 
     this.fbs.getProjectsUnderUser(this.userId).subscribe(proj=>{
       this.proj=proj;
       console.log(this.proj);
       // display images for project
       let storageRef=firebase.storage()
       for(let entry of proj){
        if(entry.path){
          storageRef.refFromURL(`${entry.path}`).getDownloadURL()
          .then(
          (url)=>{
            entry.path=url;
           }
         )
         }
       }
     })
    } 
  })
)
.subscribe();
 　this.user= this.fbs.getUser(this.userId).subscribe(user=>{
   this.user=user;
});

}


toggleHover(event: boolean) {
  this.isHovering = event;
}

startUpload(event: FileList, projName){
  // specify file object
  const file = event.item(0)
  // Client-side validation example
  if (file.type.split('/')[0] !== 'image') { 
    console.error('unsupported file type :( ')
    return;
  }
  // The storage path
  const path =`projects/${file.name}`
  // Totally optional metadata
  const customMetadata = { app: 'Raison Detre Project Image' };
  // The main task
  this.task = this.storage.upload(path, file, { customMetadata })
  // Progress monitoring
  this.percentage = this.task.percentageChanges();
  this.snapshot   = this.task.snapshotChanges();
   // The file's download URL
this.snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
////saving data in project node to firestore <-- need fix artistID or name is required
const image : Project ={
  userId:this.userId, 
  roles: {Project_Owner:true},
  // storage path
  //path:`artists/${new Date()}_${file.name}`
  path:`projects/${file.name}`
 };
 
 const imagePathToProjects = `projects/${this.userId}_${projName}`
 const imagePathToUser = `users/${this.userId}/managed_projects/${this.userId}_${projName}`
 
 this.afs.doc(imagePathToProjects).set(image, {merge:true});
 this.afs.doc(imagePathToUser).set(image, {merge:true});
}
// Determines if the upload task is active
isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
}


ProjectAdd(){
  var now = new Date();
  const year = now.getFullYear(); 
  if(this.project.project_name!=''){
    this.fbs.AddProject(this.project, year, this.userId, this.project.project_name);
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
// Edit State Control
editProject(event, Project){
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
navigateToUser(event, userId){
  this.router.navigate([`profile/user-public/${userId}`])
}
// Update Proejct
ProjectUpdate(proj){
this.fbs.updateProject(proj, this.userId)
}


// Add State Control 
AddNewProject(){
this.AddProjectState=true;
this.editProjectState=false;
}
clearState(){
  this.editProjectState=false;
  this.projectToEdit = null;
}

CancelAddNewProject(){
  this.AddProjectState=false;
  this.clearState();
}
onValueChange(e):void{
  console.log(e.target.value);
  console.log('this.from = ', this.from);
}
}
