import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {AuthService} from '../../../core/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import {MatSnackBar} from '@angular/material';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import {Users} from '../../../shared/models/user.model';
import { FirebaseService } from '../../../shared/services/firebase.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
 
  private userDetails: firebase.User = null;
　 lang:string
  userId?:string;
  displayName?:string;
  photoURL?:string;
  language?:string; 
 
  firstName:string;
  lastName:string;
  gender:string;
  generation:string;
  country:string;
  Pref_State:string;
  city:string;
  StreetAddress:string;

  path?:string; 
  shortIntro?:string; 
  expectation?:string;
  facebookpage?:string; 
  twitterpage?:string; 
  userimage?:string;  
  username?:string; 
  contactMail?:string;
  user:any;
  website:any;
  telephone:any;
  
  selectedGender: string = 'male';
  genders = [
    { value: 'male', viewValue: 'male' },
    { value: 'female', viewValue: 'female' },
  ];

  selectedGN: string = '30s';
  generations = [
    { value: 'Teens', viewValue: 'Teens' },
    { value: '20s', viewValue: '20s' },
    { value: '30s', viewValue: '30s' },
    { value: '40s', viewValue: '40s' },
    { value: '50s', viewValue: '50s' },
    { value: '60s', viewValue: '60s' },
    { value: '70s', viewValue: '70s' },
  ];
  regisForm:FormGroup;

  constructor(
    public auth:AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private fbs: FirebaseService,
    private router:Router,
    private snack: MatSnackBar,
    
  ) { 
   
  }

  ngOnInit() {
   

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
});


  }
  
AddProfile(){
  // data to save
 let  profile : Users={
   uid:this.userId, 
   firstName:this.firstName,
   lastName:this.lastName,
   gender:this.selectedGender,
   generation:this.selectedGN,
   country:this.country,
   Pref_State: this.Pref_State,
   city:this.city,
   StreetAddress:this.StreetAddress,
   email:this.contactMail,
   website:this.website,
   telephone:this.telephone,
  // roles:{user:true},
 }
  this.auth.isLoggedIn().pipe(
    tap(user=>{
      if(user){
        this.userId = user.uid;
        console.log(user.uid)
        //save profile
        this.fbs.updateUser(profile, this.userId)
      } 
    })
  )
  .subscribe();

  this.router.navigate(['profile/overview']);
  this.snack.open('Member Updated!', 'OK', { duration: 4000 })
         
}
// add user description section 
AddSelfDescription(){
  let description ={
    shortIntro:this.shortIntro,
   // expectation:this.expectation 
  }
  this.auth.isLoggedIn().pipe(
    tap(user=>{
      if(user){
        this.userId=user.uid;
        this.fbs.updateUserDescription(description, this.userId)
      }
    })
  )
  .subscribe();
  this.router.navigate(['profile/overview']);
  this.snack.open('Member Updated!', 'OK', { duration: 4000 })
}

AddExpectation(){
  let description ={
    expectation:this.expectation,
   // expectation:this.expectation 
  }
  this.auth.isLoggedIn().pipe(
    tap(user=>{
      if(user){
        this.userId=user.uid;
        this.fbs.updateUserExpectation(description, this.userId)
      }
    })
  )
  .subscribe();
  this.router.navigate(['profile/overview']);
  this.snack.open('Member Updated!', 'OK', { duration: 4000 })
}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
