import { Component, Input } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {tap, map} from 'rxjs/operators';
import { FirebaseService } from '../../shared/services/firebase.service';
import {DataService} from '../../shared/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router'
import { PARAMETERS } from '../../../../node_modules/@angular/core/src/util/decorators';
import { DonationService } from 'app/shared/services/donation.service';

@Component({
  selector: 'app-event-charge-card',
  templateUrl: './event-charge-card.component.html',
  styleUrls: ['./event-charge-card.component.scss']
})
export class EventChargeCardComponent  {
userId:any; 
user:any;
eventId:any;
ticketPrice:any;
totalAmount:any;
phonenumber:any;

firstFormGroup: FormGroup;
secondFormGroup: FormGroup;

  constructor(
  public auth: AuthService,
  public data: DataService,
  private fbs :FirebaseService,
  private route : ActivatedRoute,
  private fb: FormBuilder,
  public dn : DonationService
  ) { }

  ngOnInit() {
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
    });   
// get Id of events for single charge
this.route.paramMap
.subscribe((params)=>{
  this.eventId=params.get('id');
});
// get ticket price of event (total amount)
this.route.queryParamMap
.subscribe((params)=>{
  this.totalAmount = this.route.snapshot.queryParamMap.get('ticket_price');
   
});


//// stepper /////////////
this.firstFormGroup = this.fb.group({
  pledge: ['', Validators.required]
  
});
this.secondFormGroup = this.fb.group({
  terms_condtions: ['', Validators.required],
  privacy_policy: ['', Validators.required]
});
//// stepper ///////////


  }

AddTelephoneNo(){
const id = this.eventId
const userId = this.userId
let phone ={
  phonenumber:this.phonenumber
}
this.dn.UpdatePhoneforTicketBuyer(phone, id, userId);

}

}
