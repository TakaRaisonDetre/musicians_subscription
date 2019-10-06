import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import {Artist} from '../../../shared/models/artist.model';
import {Featured} from '../../../shared/models/featured_artist.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { AngularFirestore} from 'angularfire2/firestore';

// Share firebase artists
import {DataService} from "../../../shared/services/data.service";

import {followService} from "../../../shared/services/follow.service";
//import { totalmem } from 'os';
import { tap } from '../../../../../node_modules/rxjs/operators';
import { from } from 'rxjs';
import { AuthService } from '../../../core/auth.service';
import { MatSnackBar } from '@angular/material';

import {FirebaseService} from '../../../shared/services/firebase.service';
import {DonationService} from '../../../shared/services/donation.service';

import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { months } from 'moment';
import { redirect } from '../../../../../functions/src/app/connect';
import { map } from 'rxjs/operators';
import { fromTask } from 'angularfire2/storage';


import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-funding-artist',
  templateUrl: './funding-artist.component.html',
  styleUrls: ['./funding-artist.component.css']
})

export class FundingArtistComponent implements OnInit {
  Jan:any;Feb:any;;Mar:any;Apr:any;May:any;Jun:any;Jul:any;Aug:any;Sep:any;Oct:any;Nov:any;Dec:any
  
  datum:any;
  currentUserId : string; 
  artistUrl:Observable<string | null>;

// public lineChartLabels:Array<any> =['Jan', 'Feb', 'Mar']
 public lineChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
  /*
  * Full width Chart Options
  */
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          //color: 'rgba(0,0,0,0.02)',
           color: 'rgba(0,0,0,0.2)',
           zeroLineColor: 'rgba(0,0,0,0.3)'
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0,0,0,0.2)',
          zeroLineColor: 'rgba(0,0,0,0.3)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  };

  public lineChartColors: Array<any> = [{
    backgroundColor: 'rgba(63, 81, 181, 0.16)',
    borderColor: 'rgba(0,0,0,0)',
    pointBackgroundColor: 'rgba(63, 81, 181, 0.4)',
    pointBorderColor: 'rgba(0, 0, 0, 0)',
    pointHoverBackgroundColor: 'rgba(63, 81, 181, 1)',
    pointHoverBorderColor: 'rgba(148,159,177,0)'
  }, {
    backgroundColor: 'rgba(0, 0, 0, .08)',
    borderColor: 'rgba(0,0,0,0)',
    pointBackgroundColor: 'rgba(0, 0, 0, 0.06)',
    pointBorderColor: 'rgba(0, 0, 0, 0)',
    pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.1)',
    pointHoverBorderColor: 'rgba(0, 0, 0, 0)'
  }];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  
  
private id: string = 'qDuKsiwS5xw';
  
  lang :any;
  artistId:any;
  memberType:any;
  artist:any;
  art:any;
  path:any;
  userId:any;
  user:any;
  Member:any;
  flr:any;
  artist_patron_count:number;
  artist_patron_amount:number;
  artistName:any;
  isActive = false;

  followers: Observable<any>;
  followSum:Observable<any>;
  total;
  createdMonth:any;
  createdYear:any;

  followerState: boolean=false;
  basicState: boolean = true;
  featured:boolean = false;
  donation:any;
  // for comments EP63
  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>;
   // for comments EP63
  commentsRef: AngularFirestoreCollection<any>;
  comments$: Observable<any>;
  formValue: string;

  // for follower for project ES63
  art_follower_Ref: AngularFirestoreCollection<any>;
  art_follower$: Observable<any>

  lineChartSteppedData:Array<any>;
  response
  patron:any;
  patronId:any;
  donate:any;

  currentProject_or_Artist:string;

  constructor(
    public fbs:FirebaseService,
    public dn:DonationService,
    private afs:AngularFirestore,
    private route: ActivatedRoute,
    private router:Router,
    private dataService: DataService,
    private fl:followService,
    private auth:AuthService,
    public snackBar: MatSnackBar,
    private storage : AngularFireStorage

  ) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });
   }

ngOnInit() {
   // get a curent user 
   this.auth.isLoggedIn().pipe(
    tap(user=>{
      if(user){
        this.userId = user.uid;
        console.log(user.uid)
        this.user= this.fbs.getUser(this.userId)
      } 
    })
  )
  .subscribe(user=>{
    this.user=user;
    this.userId = user.uid
  // disable button if user already patron <-- need to check 
  console.log(this.artistId);
 
   this.dn.CheckPatronList(this.artistId, this.userId).subscribe(patron=>{
     //this.patron = patron.map(patronId=>{this.patronId=this.patron.userId}); 
    if(patron.length>0){
      this.patron=patron
      console.log(this.patron.length)
    }
  })
}); 
  

 // any to any for user
this.dataService.currentUserId.subscribe(currentUserId=>this.currentUserId = currentUserId) 
// share this artist Id wirh data service
this.dataService.currentProject.subscribe(artistId=>this.artistId=artistId);
// share membership
this.dataService.currentmemberType.subscribe(memberType=>this.memberType=memberType)

this.dataService.currentProject_or_Artist.subscribe(currentProject_or_Artist=>this.currentProject_or_Artist=currentProject_or_Artist)
  console.log(this.currentProject_or_Artist);

this.artist= this.route.params.switchMap(
  param=>this.fbs.getSingleArtist(param.id))

this.artist.subscribe(art=>{
  this.art=art;
  this.featured = art.featured;
  
  console.log(this.art)



  
 // get a image of project
 //const ref = this.storage.ref(`${this.path}`)
 let storageRef=firebase.storage()
 if(art.path){
  storageRef.refFromURL(`${art.path}`).getDownloadURL()
  .then(
    (url)=>{
      art.path=url;
    }
  )
    //  url=>{
    //    this.art.path = url;
    //    console.log(art.path)
    //  }, (error) => {
    //   // Handle error here
    //   // Show popup with errors or just console.error
    //   console.error(error);});
  
 }})

// get coments ESP63
// comments ES63
this.postRef = this.afs.doc(`artists/${this.artistId}`)
console.log('comments add to ', this.artistId)
this.commentsRef = this.postRef.collection('comments');
this.post$=this.postRef.valueChanges();
// get followers
this.art_follower_Ref = this.postRef.collection('followed');
this.art_follower$=this.postRef.valueChanges();

// fetch data
var now = new Date();
const year = now.getFullYear() 
 this.fetchdatainGraph(year);
}

fetchdatainGraph(year) {
this.dn.GetDonationforArtist(this.artistId, year).subscribe(response => {
  this.response = response
  
  this.lineChartSteppedData = [{
    data: [this.response.Jan, this.response.Feb, this.response.Mar, this.response.Apr, this.response.May, this.response.Jun, 
      this.response.Jul, this.response.Aug, this.response.Sep, this.response.Oct, this.response.Nov, this.response.Dec], 
    label: 'Donation',
    borderWidth: 1,
    fill: true,}, {data: [6000, 6000, 6000, 6000, 6000,6000,6000,6000, 6000,6000,6000,6000],
    label: 'New',
    borderWidth: 1,
    fill: true,
    // steppedLine: true
  }];
});
} 


getMultipleImage(list){
  for(let entry of list){
    let storageRef = firebase.storage().ref();
    let spaceRef = storageRef.child(`${entry.path}`);
    if(entry.path){
      storageRef.child(entry.path).getDownloadURL().then(
        (url)=>{
          entry.path = url;
        }
      )
    }
  }
}
navigatetoKeyBronze(event, id){
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  this.dataService.changeProjectOrArtist('artists');
  var now = new Date()
  if(this.userId){
    let Patron ={
      userId:this.userId,
      displayName:this.user.displayName,
      photoURL:this.user.photoURL,
      email:this.user.email,
      artistId : this.artistId,
      membership:'Bronze',
      donation: 3000,
      type:'Single Charge',
      payment_status: 'pending',
      createdAt:timestamp,   
      createdMonth:now.getMonth()+1,
      createdYear:now.getFullYear()
    };
    const year = now.getFullYear();
    this.dn.GetDonationforArtist(this.artistId, year).subscribe(response => {
      this.response = response;
    });
    console.log(this.response.Nov)
    if(now.getMonth()+1==1){
      let MontlyDonation1={Jan : this.response.Jan + 3000,} 
     
       this.dn.AddMonthlyDonationForArtist(this.artistId, year, MontlyDonation1);
    } else 
    if(now.getMonth()+1==2){
      let MontlyDonation2={Feb : this.response.Feb+ 3000, } 
     
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation2);
    } else
    if(now.getMonth()+1==3){
      let MontlyDonation3={Mar : this.response.Mar + 3000,} 
     
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation3);
    }else
    if(now.getMonth()+1==4){
      let MontlyDonation4={Apr : this.response.Apr + 3000,} 
    
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation4);
    }  else   
    if(now.getMonth()+1==5){
      let MontlyDonation5={May : this.response.May + 3000,} 
     
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation5);
    }  else      
    if(now.getMonth()+1==6){
      let MontlyDonation6={May : this.response.Jun + 3000,} 
      
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation6);
    }  else    
    if(now.getMonth()+1==7){
      let MontlyDonation7={Jul : this.response.Jul + 3000,} 
     
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation7);
    }  else    
    if(now.getMonth()+1==8){
      let MontlyDonation8={Aug : this.response.Aug + 3000,} 
    
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation8);
    }  else   
    if(now.getMonth()+1==9){
      let MontlyDonation9={Sep : this.response.Sep + 3000,} 
    
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation9);
    }  else     
    if(now.getMonth()+1==10){
      let MontlyDonation10={Oct : this.response.Oct + 3000,} 
    
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation10);
    }  else    
    if(now.getMonth()+1==11){
      let MontlyDonation11={Nov : this.response.Nov + 3000,} 
   
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation11);
    }  else    
    if(now.getMonth()+1==12){
      let MontlyDonation12={Dec : this.response.Dec + 3000,} 
     
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation12);
    }  
 
   // save information to firebase 
   this.dn.AddArtistsPatronMember(Patron, this.artistId, this.userId)
    // query param (/path?page=1)
   this.router.navigate([`/charge/${this.artistId}`], { queryParams: { memberType: 'Bronze' } });
  
  // this.router.navigate([`/charge/${this.artistId}`])
  } else {
    this.snackBar.open('You need to login first', 'close', { duration: 2000 });
  }  
}
navigatetoKeySilver(event, id){
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  this.dataService.changeProjectOrArtist('artists');
  var now = new Date();
  const year = now.getFullYear()
  if(this.userId){
    let Patron ={
      userId:this.userId,
      displayName:this.user.displayName,
      photoURL:this.user.photoURL,
      email:this.user.email,
      artistId : this.artistId,
      membership:'Silver',
      donation: 5000,
      type:'Single Charge',
      payment_status: 'pending',
      createdAt:timestamp,
      createdMonth:now.getMonth()+1,
      createdYear:now.getFullYear()        
    } 
    const year = now.getFullYear();
    this.dn.GetDonationforArtist(this.artistId, year).subscribe(response => {
      this.response = response
      
    })
    if(now.getMonth()+1==1){
      
      let MontlyDonation1={Jan : this.response.Jan + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId, year, MontlyDonation1);
    } else 
    if(now.getMonth()+1==2){
      let MontlyDonation2={Feb : this.response.Feb+ 5000, } 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation2);
    } else
    if(now.getMonth()+1==3){
      let MontlyDonation3={Mar : this.response.Mar + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation3);
    }else
    if(now.getMonth()+1==4){
      let MontlyDonation4={Apr : this.response.Apr + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation4);
    }  else   
    if(now.getMonth()+1==5){
      let MontlyDonation5={May : this.response.May + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation5);
    }  else      
    if(now.getMonth()+1==6){
      let MontlyDonation6={May : this.response.Jun + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation6);
    }  else    
    if(now.getMonth()+1==7){
      let MontlyDonation7={Jul : this.response.Jul + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation7);
    }  else    
    if(now.getMonth()+1==8){
      let MontlyDonation8={Aug : this.response.Aug + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation8);
    }  else   
    if(now.getMonth()+1==9){
      let MontlyDonation9={Sep : this.response.Sep + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation9);
    }  else     
    if(now.getMonth()+1==10){
      let MontlyDonation10={Oct : this.response.Oct + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation10);
    }  else    
    if(now.getMonth()+1==11){
      if(this.response.Nov==null){
        let MontlyDonation11={Nov : 5000,} 
        this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation11);
      } else
      if(this.response.Nov){
        let MontlyDonation11={Nov : this.response.Nov + 5000,} 
        this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation11);
      }
    }  else    
    if(now.getMonth()+1==12){
      let MontlyDonation12={Dec : this.response.Dec + 5000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation12);
    }  
    // save information to firebase 
    this.dn.AddArtistsPatronMember(Patron, this.artistId, this.userId)

    

    // query param (/path?page=1)
    this.router.navigate([`/charge/${id}`], { queryParams: { memberType: 'Silver' } });
   
  } else {
    this.snackBar.open('You need to login first','close', {duration : 2000});
  }
 
}
navigatetoKeyGold(event, id){
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  this.dataService.changeProjectOrArtist('artists');
  var now = new Date()
 if(this.userId){
  let Patron ={
    userId:this.userId,
    displayName:this.user.displayName,
    photoURL:this.user.photoURL,
    email:this.user.email,
    artistId : this.artistId,
    membership:'Gold',
    donation: 15000,
    type:'Single Charge',
    payment_status: 'pending',
    createdAt:timestamp,
    createdMonth:now.getMonth()+1,
    createdYear:now.getFullYear()
  } 
  const year = now.getFullYear();
  this.dn.GetDonationforArtist(this.artistId, year).subscribe(response => {
    this.response = response
  })
    if(now.getMonth()+1==1){
      let MontlyDonation1={Jan : this.Jan + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId, year, MontlyDonation1);
    } else 
    if(now.getMonth()+1==2){
      let MontlyDonation2={Feb : this.response.Feb+ 15000, } 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation2);
    } else
    if(now.getMonth()+1==3){
      let MontlyDonation3={Mar : this.response.Mar + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation3);
    }else
    if(now.getMonth()+1==4){
      let MontlyDonation4={Apr : this.response.Apr + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation4);
    }  else   
    if(now.getMonth()+1==5){
      let MontlyDonation5={May : this.response.May + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation5);
    }  else      
    if(now.getMonth()+1==6){
      let MontlyDonation6={May : this.response.Jun + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation6);
    }  else    
    if(now.getMonth()+1==7){
      let MontlyDonation7={Jul : this.response.Jul + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation7);
    }  else    
    if(now.getMonth()+1==8){
      let MontlyDonation8={Aug : this.response.Aug + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation8);
    }  else   
    if(now.getMonth()+1==9){
      let MontlyDonation9={Sep : this.response.Sep + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation9);
    }  else     
    if(now.getMonth()+1==10){
      let MontlyDonation10={Oct : this.response.Oct + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation10);
    }  else    
    if(now.getMonth()+1==11){
      let MontlyDonation11={Nov : this.response.Nov + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation11);
    }  else    
    if(now.getMonth()+1==12){
      let MontlyDonation12={Dec : this.response.Dec + 15000,} 
       this.dn.AddMonthlyDonationForArtist(this.artistId,year, MontlyDonation12);
    }  
  // save information to firebase 
  this.dn.AddArtistsPatronMember(Patron, this.artistId, this.userId)

  // query param (/path?page=1)
  this.router.navigate([`/charge/${id}`], { queryParams: { memberType: 'Gold' } });
 
 }else{
  this.snackBar.open('You need to login first','close', {duration : 2000});
 }
  
}


navigateToKeyFanclub(event, id){
 // this.dataService.changeProjectOrArtist('artists');
  this.router.navigate([`/fan-charge/${id}`])
}


watchFollowers(){
  this.followerState=true;
  this.basicState=false;
}
watchBasic(){
  this.followerState=false;
  this.basicState=true;
}

followthisArtist(){
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  var now = new Date()
if(this.userId){
  let Member ={
    userId:this.userId,
    displayName:this.user.displayName,
    photoURL:this.user.photoURL,
    artistId:this.artistId,
    artistName:this.art.artistName,
    path:this.art.path,
    createdAt:timestamp,
    createdMonth:now.getMonth()+1,
    createdYear:now.getFullYear()
  }
    console.log(this.user.userId, this.artistId);
    console.log(this.user.photoURL);
    console.log(this.artistId)
  
    //this.fl.setFollower_artist(this.userId, this.artistId, 1)
    this.fl.setArtistFollow(Member, this.artistId, this.userId) 
    this.snackBar.open('Thank you for following', 'close',  {duration:2000}); 
} else {
  this.snackBar.open('You need to login first', 'close',{duration:2000});
}

}

navigateToUser(event, id){
  this.router.navigate([`profile/user-public/${id}`])
  
}
 // EP63 Lazy Load the Firestore Collection
 loadMoreComments() {
  this.comments$ = this.commentsRef.valueChanges();
}
loadMoreFollowers(){
  this.art_follower$=this.art_follower_Ref.valueChanges();
}

navigateToKey(event, art){
  this.router.navigate([`/projects/video/${art.id}`]);
  this.dataService.changeProject(art.id)
}



// login by facebook
loginfb(){
  
  this.auth.facebookLogin();
  //this.router.navigate([`/events/event/${eventId}`]);
 // this.router.navigate([`/projects/funding-artist/${artistId}`]);
}
logingoogle(){
  
  this.auth.googleLogin();
  //this.router.navigate([`/events/event/${eventId}`]);
 // this.router.navigate([`/projects/funding-artist/${artistId}`]);
}

}
