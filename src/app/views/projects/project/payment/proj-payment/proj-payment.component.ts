import { Component, OnInit,Input } from '@angular/core';
import {FirebaseService} from '../../../../../shared/services/firebase.service';
import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import {Artist} from '../../../../../shared/models/artist.model';
import {Featured} from '../../../../../shared/models/featured_artist.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestore} from 'angularfire2/firestore';
import { PARAMETERS } from '../../../../../../../node_modules/@angular/core/src/util/decorators';

// check to see if user is login
import {first, tap} from 'rxjs/operators';

// Share firebase artists
import {DataService} from "../../../../../shared/services/data.service";
import { TranslateService } from '../../../../../../../node_modules/@ngx-translate/core';
import { isThisQuarter } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/auth.service';

@Component({
  selector: 'app-proj-payment',
  templateUrl: './proj-payment.component.html',
  styleUrls: ['./proj-payment.component.css']
})
export class ProjPaymentComponent implements OnInit {
 lang:any;
 project:any;
 memberType:any;

 firstFormGroup: FormGroup;
 secondFormGroup: FormGroup;
 first_name : string;
 last_name :string;
 telephone:string;
 email:string;
user:any;
userId:any; 
//project:any;
params:any;
proj:any;
projectId:any
  constructor(
    public fbs:FirebaseService,
    private afs:AngularFirestore,
    public route: ActivatedRoute,
   
    private fb: FormBuilder,
    public auth:AuthService,
    private data:DataService
  ) {
  
   }

  ngOnInit() {

// share the project ID with data service 
this.data.currentProject.subscribe(projectId=>this.projectId=projectId)
console.log(this.projectId)
this.data.currentmemberType.subscribe(memberType=>this.memberType=memberType);

// stepper 
   this.firstFormGroup = this.fb.group({
    email:['',[
      Validators.required,
      Validators.email
    ]],
    telephone:['',[
      Validators.required,
    ]],
    first_name:['',[
      Validators.required,
    ]],
    last_name:['',[
      Validators.required,
    ]],
  });
  this.secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required]
  });
  ////
  this.auth.isLoggedIn().pipe(
    tap(user=>{
      if(user){
        this.userId = user.uid;
        console.log(user.uid)
       
      } 
    })
  )
  .subscribe();
　this.user= this.fbs.getUser(this.userId).subscribe(user=>{
  this.user=user;
});

    
  }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }
 
  googleSignIn(){
    this.auth.googleLogin();
  }

  facebookSingIn(){
    this.auth.facebookLogin();
  }

savePatron(): void {
  this.auth.isLoggedIn().pipe(
    tap(user=>{
      if(user){
        this.userId = user.uid;
        console.log(user.uid)
       
      } 
    })
  )
  .subscribe();
　
 // console.log(this.project.id)
  console.log(this.userId)
  console.log(this.projectId)
  console.log(this.projectId)
  let patron ={
    userId:this.userId,
    projectId:this.projectId,
    first_name : this.first_name,
    last_name : this.last_name,
    telephone : this.telephone,
    email : this.email,
    memberType : this.memberType
  }
this.fbs.AddProjectPatron(patron, this.projectId, this.userId)
// console.log( this.projectId, this.userId)
}


}
