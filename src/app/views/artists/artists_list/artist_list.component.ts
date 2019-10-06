import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, startWith } from 'rxjs/operators';

import * as firebase from 'firebase';
import { FirebaseService } from '../../../shared/services/firebase.service';
import {Artist} from '../../../shared/models/artist.model';  
import {Router,ActivatedRoute} from '@angular/router';
import {Featured} from '../../../shared/models/featured_artist.model'
// Share firebase artists
import {DataService} from "../../../shared/services/data.service";



@Component({
    selector: 'app-artistslist',
    templateUrl : './artists_list.component.html',
    styleUrls:['./artists_list.component.css']
})
export class ArtistListComponent implements OnInit {
    art:Featured[];
    artists;
    fb_artistId:string;
    
    isActive = false;
    
    constructor(
        private afs: AngularFirestore,
        private meta:Meta,
        private router:Router,
        private titleService: Title,
        public fbs: FirebaseService,
        private data:DataService,
      ){
          
        }

ngOnInit(){
   // set metatags for twitter
 
this.fbs.getFeaturedArtists().subscribe(art=>{
    this.art=art;
    // display image 
    for(let entry of art){
        let storageRef=firebase.storage().ref();
        let spaceRef=storageRef.child(`/${entry.path}`);
        if(entry.path){
          storageRef.child(entry.path).getDownloadURL().then(
            (url)=>{
             entry.path=url;
            });
            }
           }
         })
          // spotify artist data
   this.data.curentMessage.subscribe(fb_artistId=>{
    this.fb_artistId = fb_artistId;
  })
       
 }
 

  navigatetoKey(event, artist){
   // navigate to single artists
   this.fbs.getSingleArtist(artist.id);
   console.log(artist.id)
    this.router.navigate([`/artists/artist/${artist.id}`]); 
    this.data.changeMessage(artist.id);
  }

}