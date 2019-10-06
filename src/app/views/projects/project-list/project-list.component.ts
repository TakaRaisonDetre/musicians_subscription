import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from '../../../core/auth.service';
import {FirebaseService} from '../../../shared/services/firebase.service';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import { DataService } from '../../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  lang:string;
  userId:string;
  user:any;
  npo:any;
  artEvent:any;
  film:any;
  projectId:any;
  featured:any;
  isActive = false;
  
  constructor(
    public auth : AuthService,
    private router:Router,
    private fbs:FirebaseService,
    private data:DataService,
   
  ) {
   
   }

  ngOnInit() {
// share the project ID with data service 
 this.data.currentProject.subscribe(projectId=>this.projectId=projectId)

    this.auth.isLoggedIn().pipe(
      tap(user=>{
        if(user){
          this.userId = user.uid;
          console.log(user.uid)
          this.user= this.fbs.getUser(this.userId).subscribe
        } 
      })
    )
    .subscribe(user=>{
      this.user=user;
    });   　
  // get a project based npo query 
  this.fbs.getNPOProjects().subscribe(npo=>{
    this.npo=npo;
    for(let entry of npo){
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(`/${entry.path}`);
      if(entry.path){
        storageRef.child(entry.path).getDownloadURL().then(
          (url)=>{
            entry.path=url;
          });
      }
    }
});

 
    // get a project media art 
  this.fbs.getMediaArtProjects().subscribe(artEvent=>{
    this.artEvent=artEvent
    　　　for(let entry of artEvent){
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
    });
    // get film art 
    this.fbs.getFilmProjects().subscribe(film=>{
      this.film=film;
    　　　for(let entry of film){
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
});

}

navigatetoKey(event, proj){
  // navigate to single artists
  this.fbs.getSingleArtist(proj.id);
  console.log(proj.id)
   this.router.navigate([`/projects/funding-project/${proj.id}`]); 
   this.data.changeProject(proj.id)
 }



}
