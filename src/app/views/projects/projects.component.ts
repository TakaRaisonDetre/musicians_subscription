import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from '../../core/auth.service';
import {FirebaseService} from '../../shared/services/firebase.service';
// check to see if user is login
import {tap} from 'rxjs/operators';
import { DataService } from '../../shared/services/data.service';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls:['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  lang:string;
  userId:string;
  user:any;
  projectId:any;
  featuredproject:any;
  featuredartists:any
  isActive = false;

  DefaultState : boolean = true; 


  constructor(
    public auth : AuthService,
    private router: ActivatedRoute,
    
    private route:Router,
    private data:DataService,
    public fbs:FirebaseService,
    
  ) { 
  
  }

  ngOnInit() {
    　
  // state control
  this.DefaultState = false;
   // share the project ID with data service 
   this.data.currentProject.subscribe(projectId=>this.projectId=projectId)
   
   // get a curent user 
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
    // get featured project --- just hold this part from business perspective
// this.fbs.getFeaturedProjects().subscribe(featuredproject=>{
//   this.featuredproject=featuredproject;
//   console.log(this.featuredproject);
//    for(let entry of featuredproject){
//     let storageRef=firebase.storage()
//       //  let spaceRef = storageRef.child(`${entry.path}`);
//          if(entry.path){
//           storageRef.refFromURL(`${entry.path}`).getDownloadURL()
//          .then(
//            (url)=>{
//               entry.path=url;
//             }
//          )
//         }
//      }
// });
    // get featured artist
    this.fbs.getFeaturedArt().subscribe(featuredartists=>{
      this.featuredartists=featuredartists;
      console.log(this.featuredartists);
       for(let entry of featuredartists){
         let storageRef = firebase.storage()
         
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
  navigatetoProjectKey(event, fea){
   
   this.route.navigate([`/projects/funding-project/${fea.id}`]); 
   this.data.changeProject(fea.id)
   this.DefaultState=false;

  }
  navigatetoArtistKey(event, fea){
   
    this.route.navigate([`projects/funding-artist/${fea.id}`]); 
    this.data.changeProject(fea.id)
    this.DefaultState=false;
 
   }
navigatetoProject(){
  this.route.navigate([`/projects/funding-project-list`]);
  this.DefaultState=false;
}
navigatetoArtist(){
  this.route.navigate([`/projects/funding-artist-list`]);
  this.DefaultState=false;
}


}
