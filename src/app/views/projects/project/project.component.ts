import { Component, OnInit,Input } from '@angular/core';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import {Featured} from '../../../shared/models/featured_artist.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestore} from 'angularfire2/firestore';
import { PARAMETERS } from '../../../../../node_modules/@angular/core/src/util/decorators';

// Share firebase artists
import { TranslateService } from '../../../../../node_modules/@ngx-translate/core';
import { isThisQuarter } from 'date-fns';
import { AuthService } from '../../../core/auth.service';
import { map,tap,shareReplay } from 'rxjs/operators';
import { followService } from '../../../shared/services/follow.service';
import { MatSnackBar } from '@angular/material';
import {DonationService} from '../../../shared/services/donation.service';
import { DataService } from 'app/shared/services/data.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  Jan:any;Feb:any;;Mar:any;Apr:any;May:any;Jun:any;Jul:any;Aug:any;Sep:any;Oct:any;Nov:any;Dec:any
  
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
       display: true,
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
 

  project :any;
  proj:any;
  path:any;
  userId:any;
  user:any;

   projectId:string ;  // to share 
   memberType:string; // to share with payment page

  followers: Observable<any>;
  followSum:Observable<any>;
  total;
  
  followerState: boolean=false;
  basicState: boolean = true;
  follower:any;


  // for comments EP63
  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>;
   // for comments EP63
  commentsRef: AngularFirestoreCollection<any>;
  comments$: Observable<any>;
  formValue: string;

  // for follower for project ES63
  pro_follower_Ref: AngularFirestoreCollection<any>;
  pro_follower$: Observable<any>
  lineChartSteppedData:Array<any>;
  response
  currentUserId
  currentProject_or_Artist:string;

  constructor(
    public fbs:FirebaseService,
    private afs:AngularFirestore,
    private route: ActivatedRoute,
    private router:Router,
    private auth:AuthService,
    private fl: followService,
    public snackBar: MatSnackBar,
    public dn:DonationService,
    private data : DataService,
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
        this.user= this.fbs.getUser(this.userId).subscribe
      } 
    })
  )
  .subscribe(user=>{
    this.user=user;
  });    

 // any to any for user
this.data.currentUserId.subscribe(currentUserId=>this.currentUserId = currentUserId) 
// share this artist Id wirh data service
this.data.currentProject.subscribe(projectId=>this.projectId=projectId);
// share membership
this.data.currentmemberType.subscribe(memberType=>this.memberType=memberType)

this.data.currentProject_or_Artist.subscribe(currentProject_or_Artist=>this.currentProject_or_Artist=currentProject_or_Artist)
  console.log(this.currentProject_or_Artist);

this.project = this.route.params.switchMap(
  param=>this.fbs.getSingleProject(param.id))
       
  // get a single project
    this.project.subscribe(proj=>{
      this.proj = proj;
      this.projectId=proj.id;
   //   this.getSingleImage(proj);


 // get a image of project
 const ref = this.storage.ref(`${this.path}`)

 if(proj.path){
   ref.getDownloadURL().subscribe(
     url=>{
       this.proj.path = url;
       console.log(proj.path)
     }, (error) => {
      // Handle error here
      // Show popup with errors or just console.error
      console.error(error);});
  
 }})


// get comments EPS63
// comments ES63
this.postRef = this.afs.doc(`projects/${this.projectId}`)
  console.log('comments add to ', this.projectId)
   // this.commentsRef = this.postRef.collection('comments', ref => ref.orderBy('createdAt', 'desc') )
   this.commentsRef=this.postRef.collection('comments'); 
   this.post$ = this.postRef.valueChanges();
   // get followers
   this.pro_follower_Ref=this.postRef.collection('followed');
   this.pro_follower$=this.postRef.valueChanges();


// fetch data
var now = new Date();
const year = now.getFullYear() 
 this.fetchdatainGraph(year);

}

fetchdatainGraph(year) {
  this.dn.GetDonationforProject(this.projectId, year).subscribe(response => {
    this.response = response
    this.lineChartSteppedData = [{
      data: [this.response.Jan, this.response.Feb, this.response.Mar, this.response.Apr, this.response.May, this.response.Jun, 
        this.response.Jul, this.response.Aug, this.response.Sep, this.response.Oct, this.response.Nov, this.response.Dec], 
      label: 'Donation',
      borderWidth: 1,
      fill: true,}, {data: [0, 0, 0, 0, 0,0,0,0, 0,0,0,0],
      label: 'New',
      borderWidth: 1,
      fill: true,
      // steppedLine: true
    }];
  });
  } 
  
navigatetoKeyBronze(event, id){
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    this.data.changeProjectOrArtist('projects');
    var now = new Date();
    if(this.userId){
    let Patron ={
      userId:this.userId,
      displayName:this.user.displayName,
      photoURL:this.user.photoURL,
      email:this.user.email,
      projectId : this.projectId,
      membership:'Bronze',
      donation: 3000,
      type:'Single Charge',
      payment_status: 'pending',
      createdAt:timestamp,
      createdMonth:now.getMonth()+1,
      createdYear:now.getFullYear()      
    };
    const year = now.getFullYear();
    this.dn.GetDonationforProject(this.projectId, year).subscribe(response=>{
        this.response=response;
       // this.Nov=response.Nov;
        console.log(this.response)
      });
      console.log(this.response.Nov)
      console.log(this.projectId)
      if(now.getMonth()+1==1){
        let MontlyDonation1={Jan : this.response.Jan + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation1);
      } else 
      if(now.getMonth()+1==2){
        let MontlyDonation2={Feb : this.response.Feb + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation2);
      } else
      if(now.getMonth()+1==3){
        let MontlyDonation3={Mar : this.response.Mar + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation3);
      }else
      if(now.getMonth()+1==4){
        let MontlyDonation4={Apr : this.response.Apr + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation4);
      }  else   
      if(now.getMonth()+1==5){
        let MontlyDonation5={May : this.response.May + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation5);
      }  else      
      if(now.getMonth()+1==6){
        let MontlyDonation6={May : this.response.Jun + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation6);
      }  else    
      if(now.getMonth()+1==7){
        let MontlyDonation7={Jul : this.response.Jul + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation7);
      }  else    
      if(now.getMonth()+1==8){
        let MontlyDonation8={Aug : this.response.Aug + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation8);
      }  else   
      if(now.getMonth()+1==9){
        let MontlyDonation9={Sep : this.response.Sep + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation9);
      }  else     
      if(now.getMonth()+1==10){
        let MontlyDonation10={Oct : this.response.Oct + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation10);
      }  else    
      if(now.getMonth()+1==11){
        let MontlyDonation11={Nov : this.response.Nov + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation11);
      }  else    
      if(now.getMonth()+1==12){
        let MontlyDonation12={Dec : this.response.Dec + 3000,} 
         this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation12);
      }  
    this.dn.AddProjectsPatronMember(Patron, this.projectId, this.userId)
    // query param (/path?page=1)
    this.router.navigate([`/charge/${this.projectId}`], { queryParams: { memberType: 'Bronze' } });
    
   } else {
    this.snackBar.open('You need to login first','close', {duration : 2000});
   }
   
   
  }
  navigatetoKeySilver(event, id){
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    this.data.changeProjectOrArtist('projects');
    var now = new Date()
    if(this.userId){
      let Patron ={
        userId:this.userId,
        displayName:this.user.displayName,
        photoURL:this.user.photoURL,
        email:this.user.email,
        projectId : this.projectId,
        membership:'Silver',
        donation: 5000,
        type:'Single Charge',
        payment_status: 'pending',
        createdAt:timestamp,
        createdMonth:now.getMonth()+1,
        createdYear:now.getFullYear()       
      }
      const year = now.getFullYear();
      this.dn.GetDonationforProject(this.projectId, year).subscribe(response=>{
          this.response=response;
         // this.Nov=response.Nov;
          console.log(this.response)
        });
        console.log(this.response.Nov)
        console.log(this.projectId)
        if(now.getMonth()+1==1){
          let MontlyDonation1={Jan : this.response.Jan + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation1);
        } else 
        if(now.getMonth()+1==2){
          let MontlyDonation2={Feb : this.response.Feb + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation2);
        } else
        if(now.getMonth()+1==3){
          let MontlyDonation3={Mar : this.response.Mar + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation3);
        }else
        if(now.getMonth()+1==4){
          let MontlyDonation4={Apr : this.response.Apr + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation4);
        }  else   
        if(now.getMonth()+1==5){
          let MontlyDonation5={May : this.response.May + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation5);
        }  else      
        if(now.getMonth()+1==6){
          let MontlyDonation6={May : this.response.Jun + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation6);
        }  else    
        if(now.getMonth()+1==7){
          let MontlyDonation7={Jul : this.response.Jul + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation7);
        }  else    
        if(now.getMonth()+1==8){
          let MontlyDonation8={Aug : this.response.Aug + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation8);
        }  else   
        if(now.getMonth()+1==9){
          let MontlyDonation9={Sep : this.response.Sep + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation9);
        }  else     
        if(now.getMonth()+1==10){
          let MontlyDonation10={Oct : this.response.Oct + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation10);
        }  else    
        if(now.getMonth()+1==11){
          let MontlyDonation11={Nov : this.response.Nov + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation11);
        }  else    
        if(now.getMonth()+1==12){
          let MontlyDonation12={Dec : this.response.Dec + 5000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation12);
        }  
      this.dn.AddProjectsPatronMember(Patron, this.projectId, this.userId)
      // query param (/path?page=1)
      this.router.navigate([`/charge/${id}`], { queryParams: { memberType: 'Silver' } });
      
    }else {
      this.snackBar.open('You need to login first','close', {duration : 2000});
     }
   
  }
  // navigate to payment page after saving Patron Information 
  navigatetoKeyGold(event, id){
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    this.data.changeProjectOrArtist('projects');
   var now = new Date();
    if(this.user){
      let Patron ={
        userId:this.userId,
        projectId : this.projectId,
        email:this.user.email,
        membership:'Gold',
        donation: 15000,
        type:'Single Charge',
        payment_status: 'pending',
        createdAt:timestamp,
        createdMonth:now.getMonth()+1,
        createdYear:now.getFullYear()       
      }; 
      const year = now.getFullYear();
      this.dn.GetDonationforProject(this.projectId, year).subscribe(response=>{
          this.response=response;
         // this.Nov=response.Nov;
          console.log(this.response)
        });
        console.log(this.response.Nov)
        console.log(this.projectId)
        if(now.getMonth()+1==1){
          let MontlyDonation1={Jan : this.response.Jan + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation1);
        } else 
        if(now.getMonth()+1==2){
          let MontlyDonation2={Feb : this.response.Feb + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation2);
        } else
        if(now.getMonth()+1==3){
          let MontlyDonation3={Mar : this.response.Mar + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation3);
        }else
        if(now.getMonth()+1==4){
          let MontlyDonation4={Apr : this.response.Apr + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation4);
        }  else   
        if(now.getMonth()+1==5){
          let MontlyDonation5={May : this.response.May + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation5);
        }  else      
        if(now.getMonth()+1==6){
          let MontlyDonation6={May : this.response.Jun + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation6);
        }  else    
        if(now.getMonth()+1==7){
          let MontlyDonation7={Jul : this.response.Jul + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation7);
        }  else    
        if(now.getMonth()+1==8){
          let MontlyDonation8={Aug : this.response.Aug + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation8);
        }  else   
        if(now.getMonth()+1==9){
          let MontlyDonation9={Sep : this.response.Sep + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation9);
        }  else     
        if(now.getMonth()+1==10){
          let MontlyDonation10={Oct : this.response.Oct + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation10);
        }  else    
        if(now.getMonth()+1==11){
          let MontlyDonation11={Nov : this.response.Nov + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation11);
        }  else    
        if(now.getMonth()+1==12){
          let MontlyDonation12={Dec : this.response.Dec + 15000,} 
           this.dn.AddMonthlyDonationForProject(this.projectId, year, MontlyDonation12);
        }  
      this.dn.AddProjectsPatronMember(Patron, this.projectId, this.userId)
      // query param (/path?page=1)
      this.router.navigate([`/charge/${id}`], { queryParams: { memberType: 'Gold' } });
     
    }else{
      this.snackBar.open('You need to login first','close', {duration : 2000});
    }
    
  }

followthisProject(){
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  var now = new Date();
 if(this.userId){
  let follower ={
    userId: this.userId,
    displayName:this.user.displayName,
    photoURL:this.user.photoURL,
    projectId : this.projectId,
    projectName:this.proj.project_name,
  //  path:this.proj.path,
    createdAt:timestamp,
    createdMonth:now.getMonth()+1,
    createdYear:now.getFullYear()
  }
this.fl.setProjectFollow(follower, this.projectId, this.userId)
this.snackBar.open('Thank you for following', 'close', {duration:2000});
 } else {
   this.snackBar.open('You need to login first', 'close',{duration:2000});
 }
}


navigateToUser(event, id){
  this.router.navigate([`profile/user-public/${id}`])
  
}
// EP 63 add comments
addComment() {
  if(this.userId){
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.commentsRef.add({ content: this.formValue, createdAt: timestamp, userdisplayName: this.user.displayName})
    this.formValue = '';
  } else {
    this.snackBar.open('You need to login first','close', {duration : 2000});
  }
  
}
 // EP63 Lazy Load the Firestore Collection
 loadMoreComments() {
  this.comments$ = this.commentsRef.valueChanges();
}
loadMoreFollowers(){
  this.pro_follower$=this.pro_follower_Ref.valueChanges();
}


watchFollowers(){
  this.followerState=true;
  this.basicState=false;
}
watchBasic(){
  this.followerState=false;
  this.basicState=true;
}


gotoVideo(event, proj){
  this.router.navigate([`/projects/video/${proj.id}`]);
  this.data.changeProject(proj.id)
  
}
}
