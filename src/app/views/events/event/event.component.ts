import { Component, OnInit } from '@angular/core';
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
// for animation
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { now } from 'moment';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  Jan:any;Feb:any;;Mar:any;Apr:any;May:any;Jun:any;Jul:any;Aug:any;Sep:any;Oct:any;Nov:any;Dec:any
 // public lineChartLabels:Array<any> =['Jan', 'Feb', 'Mar']
 
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
public lineChartType: string = 'bar';
  
userId:any
user:any;
event:any;
email:any;
eventId:any;
path:any;
displayName:any;
photoURL:any;
response;
lineChartSteppedData:Array<any>;
selected:number;
url:any;
res:any;
telephone:any;
reponse;
  constructor(
    public fbs:FirebaseService,
    private afs:AngularFirestore,
    private route: ActivatedRoute,
    private router:Router,
    private auth:AuthService,
    private fl: followService,
    public snackBar: MatSnackBar,
    public dn:DonationService,
    private storage : AngularFireStorage
  ) {
    this.afs.firestore.settings({timestampsInSnapshots:true});
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
    }))
  .subscribe(user=>{
    this.user=user;
    this.displayName = user.displayName;
    this.photoURL = user.photoURL;
    this.email = user.email;
  });    

  this.event=this.route.params.switchMap(param=>
  this.fbs.getSingleProject(param.id));
  this.event.subscribe(event=>{
    this.event=event;
    this.eventId = event.id;
  //  console.log('event Id is', this.eventId) <-ok
    // image retrieval
    for(let entry of event){
      const ref = this.storage.ref(`${entry.path}`)
      if(entry.path){
        this.url = ref.getDownloadURL();
        console.log(this.url);
      }
    }
   // fetch data 
   var now = new Date();
   const year = now.getFullYear();
   this.fetchTicketData(year, this.eventId);
  });
 
  }
  fetchTicketData(year, eventId){
    console.log('event id is', this.eventId)
    this.dn.GetTicketsforEvents(eventId, year).subscribe(response=>{
      this.response= response;
      console.log(this.response); 
      this.lineChartSteppedData =[{
        data: [this.response.Jan, this.response.Feb, this.response.Mar, this.response.Apr, this.response.May, this.response.Jun, 
          this.response.Jul, this.response.Aug, this.response.Sep, this.response.Oct, this.response.Nov, this.response.Dec], 
        label: 'Sales',
        borderWidth: 1,
        fill: true,}, {data: [30000, 30000, 30000, 30000, 30000,30000,30000,30000, 30000,30000,30000,30000],
        label: 'Max',
        borderWidth: 1,
        fill: true,
        // steppedLine: true
      }];
    })
  }


  BuyTicket(event, id){
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    var now = new Date();
    
    if(this.telephone　&& this.selected){
    let Ticket_Buyer ={
      userId:this.userId,
      displayName:this.displayName,
      photoURL:this.photoURL,
      email:this.email,
      eventId : this.eventId,
      ticketPrice:this.event.ticketprice,
      ticketAmount:this.selected,
      telephone:this.telephone,
      paidAmount:this.event.ticketprice*this.selected,
      type:'Single Charge',  
      date: timestamp,
      createdMonth:now.getMonth()+1,
      createdYear:now.getFullYear()
    }
    const year = now.getFullYear();
  
    if(now.getMonth()+1==1){
      let MonthTicket1={Jan : this.response.Jan + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket1)
    } else
    if(now.getMonth()+1==2){
      let MonthTicket2={Feb : this.response.Feb + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket2)
    } else
    if(now.getMonth()+1==3){
      let MonthTicket3={Mar : this.response.Mar + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket3)
    } else
    if(now.getMonth()+1==4){
      let MonthTicket4={Apr : this.response.Apr + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket4)
    } else
    if(now.getMonth()+1==5){
      let MonthTicket5={May : this.response.May + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket5)
    } else
    if(now.getMonth()+1==6){
      let MonthTicket6={Jun : this.response.Jun + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket6)
    } else
    if(now.getMonth()+1==7){
      let MonthTicket7={Jul : this.response.Jul + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket7)
    } else
    if(now.getMonth()+1==8){
      let MonthTicket8={Aug : this.response.Aug + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket8)
    } else
    if(now.getMonth()+1==9){
      let MonthTicket9={Sep : this.response.Sep + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket9)
    } else
    if(now.getMonth()+1==10){
      let MonthTicket10={Oct : this.response.Oct + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket10)
    }else
    if(now.getMonth()+1==11){
      let MonthTicket11={Nov : this.response.Nov + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket11)
    }else
    if(now.getMonth()+1==12){
      let MonthTicket12={Dec : this.response.Dec + this.event.ticketprice*this.selected}
      this.dn.AddMonthlyTicketForEvent(this.eventId, year, MonthTicket12)
    }


    const ticket_price = this.event.ticketprice*this.selected;
    this.dn.AddTicketBuyer(Ticket_Buyer, this.eventId, this.userId)
    // query param (/path?page=1)
    this.router.navigate([`/event-charge/${id}`], { queryParams: { ticket_price: ticket_price} });
   
  
  } else {
    this.snackBar.open('電話番号と枚数が必要です！', '閉じる', { duration: 2000 });
   }
   
  }

// login by facebook
loginfb(){
  const eventId = this.event.id
  this.auth.facebookLogin();
  //this.router.navigate([`/events/event/${eventId}`]);
  this.router.navigate(['/events']);
}
logingoogle(){
  const eventId = this.event.id
  this.auth.googleLogin();
  //this.router.navigate([`/events/event/${eventId}`]);
  this.router.navigate(['/events']);
}
loginMail(){
  
}
}
