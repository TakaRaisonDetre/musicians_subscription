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
  selector: 'charge-card',
  templateUrl: './charge-card.component.html',
  styleUrls: ['./charge-card.component.css']
})
export class ChargeCardComponent {
  pid:any;
  Project_or_Artist:any; 
  projectId:any;
  memberType:any;
  ticket_price:any;
  price:any;

  userId:any;
  user:any;

firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
charge:any;
totalAmount:number;
currentProject_or_Artist:string;

  constructor(
  public auth: AuthService,
  public data: DataService,
  private fbs :FirebaseService,
  private route : ActivatedRoute,
  private fb: FormBuilder,
  public dn: DonationService) { }

  ngOnInit(){

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
  // get Id of projects or artists for single charge
  this.route.paramMap
    .subscribe((params) => {
        this.projectId = params.get('id');
      
    });
  // get membership of project  
    this.route.queryParamMap
    .subscribe((params) => {
       this.memberType = this.route.snapshot.queryParamMap.get('memberType');
    //   this.ticket_price=this.route.snapshot.queryParamMap.get('ticket_price')
      if(this.memberType=='Bronze'){
        this.totalAmount=3000;
      } 
      if(this.memberType=='Silver'){
        this.totalAmount =5000;
      }
      if(this.memberType=='Gold'){
        this.totalAmount =15000;
      }
 
    });


    this.data.currentProject_or_Artist.subscribe(currentProject_or_Artist=>
      this.currentProject_or_Artist=currentProject_or_Artist)
      console.log(this.currentProject_or_Artist);

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
 
/// status change control ////  projectId = artistId
confirmPayment(){
  if(this.userId){
    let status = {
      payment_status : 'confirmed-pending'
    }
  if(this.currentProject_or_Artist=='artists'){
    this.dn.UpdateArtistsPaymentStatus(status, this.projectId, this.userId) ; 
  } else
  if(this.currentProject_or_Artist=='projects') {
    this.dn.UpdateProjectPaymentStatus(status, this.projectId, this.userId) ; 
  }
  } 


} 

completePayment(){
if(this.userId){
  let status = {
    payment_status :'completed'
  }
  if(this.currentProject_or_Artist=='artists'){
    this.dn.UpdateArtistsPaymentStatus(status, this.projectId, this.userId) ; 
  } else
  if(this.currentProject_or_Artist=='projects') {
    this.dn.UpdateProjectPaymentStatus(status, this.projectId, this.userId) ; 
  } 
}
}

}
