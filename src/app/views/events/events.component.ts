import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from '../../core/auth.service';
import {FirebaseService} from '../../shared/services/firebase.service';
// check to see if user is login
import {tap} from 'rxjs/operators';
import { DataService } from '../../shared/services/data.service';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector:'app-events',
    templateUrl: './events.component.html',
    styleUrls:['./events.component.css']
})
export class EventsComponent implements OnInit {
    userId:any;
    user:any;
    event:any;
    energy:any;
    url:any;

    constructor(
        public auth: AuthService,
        private data:DataService,
        public fbs:FirebaseService,
        private storage : AngularFireStorage,
        public router : Router,
        
    ){}

   ngOnInit(){

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
// get events 
this.fbs.getEventDunamiseProjects().subscribe(event=>{
    this.event=event;
    console.log(this.event);
    for(let entry of event){
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
// get enerigia event 

this.fbs.getEventEnergiaProjects().subscribe(energy=>{
  this.energy=energy;
  for(let entry of energy){
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
   navigateToDunamis(event, ev){
    this.router.navigate([`/events/event/${ev.id}`]);
    this.data.changeProject(ev.id)
   }
  
}