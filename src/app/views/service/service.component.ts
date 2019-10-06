import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../../core/auth.service';

@Component({
    selector:'service',
    templateUrl:'./service.component.html',
    styleUrls:['./service.component.css']

})
export class ServiceComponent implements OnInit{
    lang:any;
    isActive = false;
    totalDonation:Observable<any>;
    Donation: Observable<any>;
    userRecords:number;
    artistRecords:number;
    projectRecords:number;
    eventRecords:number;

constructor(
private router: Router,  
public auth: AuthService,
private fbs: FirebaseService){}
       
ngOnInit() {
  // get number of records 
this.fbs.getUsersNumber().subscribe(userRecords=>{
    this.userRecords = userRecords.length;
})
this.fbs.getArtistNumber().subscribe(artistRecords=>{
    this.artistRecords = artistRecords.length;
})
this.fbs.getProjectNumber().subscribe(projectRecords=>{
    this.projectRecords =  projectRecords.length;
})
this.fbs.getEventNumber().subscribe(eventRecords=>{
    this.eventRecords=eventRecords.length;
})
}

NavigateFservice(){
this.router.navigate(['service/foreign-artists-service'])


}

// login by facebook
loginfb(){
  
    this.auth.facebookLogin();
    //this.router.navigate([`/events/event/${eventId}`]);
    this.router.navigate(['/profile/overview']);
  }
  logingoogle(){
   
    this.auth.googleLogin();
    //this.router.navigate([`/events/event/${eventId}`]);
    this.router.navigate(['/profile/overview']);
  }

}