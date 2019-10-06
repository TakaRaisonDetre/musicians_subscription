import { Component, OnInit,Input } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import {Artist} from '../../shared/models/artist.model';
import {Featured} from '../../shared/models/featured_artist.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestore} from 'angularfire2/firestore';
import { PARAMETERS } from '../../../../node_modules/@angular/core/src/util/decorators';
import { SpotifyArtist} from '../../shared/common.interface';
import { isNullOrUndefined } from 'util';
// Share firebase artists
import {DataService} from "../../shared/services/data.service";



@Component({
    selector: 'app-artist',
    templateUrl : './artist.component.html',
    styleUrls:['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  
   @Input() artists: SpotifyArtist[];
    userId:any;
    artistDoc : AngularFirestoreCollection<Artist>
    artist:any;
    lang:any;
    name:any;
    short_description_en:any
    short_description_jp:any
    path:string;
    id2:any;
    isActive = false;

    searchInput: string;
    searchResults: SpotifyArtist[];
    Spotifyauthorized: boolean;
    fid:any;


    fb_artistId:string;


    constructor( public fbs: FirebaseService, 
        private afs: AngularFirestore,
        private router : Router,
        private route : ActivatedRoute,
        private data: DataService,
       )
{}
ngOnInit(){
 
   // firebase artists data 
   this.artist=this.route.params.switchMap(param=>
        this.fbs.getSingleFeaturedArtist(param.id))
            
    // get artist user click
    this.artist.subscribe(art=>{
        this.fid =art.id,
        this.name = art.name;
        this.short_description_en = art.short_description_en;
        this.short_description_jp = art.short_description_jp;
        this.path=art.path
       
    let storageRef=firebase.storage().ref();
    let spaceRef=storageRef.child(`${this.path}`);
     if(art.path){
         storageRef.child(art.path).getDownloadURL().then(
             (url)=>{
                 this.artist.path=url;
                 console.log(art.path);
             }
         )
     }
    })
    // spotify artist data
   this.data.curentMessage.subscribe(fb_artistId=>{
     this.fb_artistId = fb_artistId;
   })

}

navigateToKey(event, art){
    this.router.navigate([`/artists/video/${art.id}`]);
    this.data.changeProject(art.id)
  }
  
}