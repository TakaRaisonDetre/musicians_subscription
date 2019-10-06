import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from '../../../core/auth.service';
import {FirebaseService} from '../../../shared/services/firebase.service';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import { DataService } from '../../../shared/services/data.service';

import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-funding-artist-list',
  templateUrl: './funding-artist-list.component.html',
  styleUrls: ['./funding-artist-list.component.scss']
})
export class FundingArtistListComponent implements OnInit {
  lang:string;
  userId:string;
  user:any;
  artistId:any;
  artists:any;
  fartists:any;
  artistwithfans:any;
  isActive = false;
  artistUrl: Observable<string | null>
  
  constructor(
    public auth : AuthService,
    private router:Router,
     private fbs:FirebaseService,
    private data:DataService,
    private storage : AngularFireStorage
) { 
     
    }

  ngOnInit() {
    this.data.currentProject.subscribe(artistId=>this.artistId=artistId)

    if(this.user)
    this.auth.isLoggedIn().pipe(
   
      tap(user=>{
        this.userId=user.uid;
        console.log(user.uid);
        this.user=this.fbs.getUser(this.userId).subscribe
      })
    )
    .subscribe(user=>{this.user=user});
// get a project based featured artist query
this.fbs.getFeaturedArt().subscribe(artists=>{
  this.artists=artists;
   for(let entry of artists){
  
     let storageRef=firebase.storage()
   
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
this.fbs.getFundedArt().subscribe(fartists=>{
  this.fartists=fartists;
  for(let entry of fartists){
  let storageRef=firebase.storage()
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
this.fbs.getFanClubArt().subscribe(artistwithfans=>{
  this.artistwithfans=artistwithfans;
  for (let entry of artistwithfans){
    let storageRef = firebase.storage()
    if(entry.path){
      storageRef.refFromURL(`${entry.path}`).getDownloadURL()
      .then(
        (url)=>{
          entry.path=url
        }
      )
    }
  }
})

}

navigateToKey(event, art){
  this.router.navigate([`/projects/funding-artist/${art.id}`]);
  this.data.changeProject(art.id)
}

}
