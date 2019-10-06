import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {tap, map} from 'rxjs/operators';
import { FirebaseService } from '../../shared/services/firebase.service';
import {DataService} from '../../shared/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router'
import { PARAMETERS } from '../../../../node_modules/@angular/core/src/util/decorators';
import { DonationService } from 'app/shared/services/donation.service';

@Component({
  selector: 'app-fanclub-subscription',
  templateUrl: './fanclub-subscription.component.html',
  styleUrls: ['./fanclub-subscription.component.scss']
})
export class FanclubSubscriptionComponent implements OnInit {
  // stripe source ID
  sourceId: string;
  userSubscriptions;


  fanclubId:any;
  userId:any;
  user:any;
  
  firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;

currentProject_or_Artist:string;
  
  constructor(
  public auth: AuthService,
  public data: DataService,
  private fbs :FirebaseService,
  private route : ActivatedRoute,
  private fb: FormBuilder,
  public dn: DonationService
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
    this.route.paramMap
    .subscribe((params) => {
        this.fanclubId = params.get('id');
      
    });
    // get this artitst 
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



  // set sourceId for stripe 
  setSource(e) {
    this.sourceId = e.id
  }
}
