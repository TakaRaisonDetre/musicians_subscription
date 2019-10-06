import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogClose} from '@angular/material';
import {FormGroup, FormControl, Validators, FormBuilder ,AbstractControl} from '@angular/forms';
import {DataService} from '../../../shared/services/data.service';
import {InboxService} from '../../../shared/services/inbox.service';
import {AuthService} from '../../../core/auth.service';
import  {tap } from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile-mail-compose',
  templateUrl: './profile-mail-compose.component.html',
  styleUrls: ['./profile-mail-compose.component.scss']
})
export class ProfileMailComposeComponent implements OnInit {
newMailData ={};
mailForm:FormGroup;
mail;
recieverid;
recieverName;
recieverPhoto;
senderId;
senderName;
senderPhoto;

  constructor(
   public snackBar: MatSnackBar,
   private afs : AngularFirestore,
   private fb: FormBuilder,
   private composeDialog: MatDialog,
   private data : DataService,
   public auth : AuthService,
   private inbox : InboxService,
   

   ) { }

  ngOnInit() {
    this.mailForm = this.fb.group({
      subject: ['',[
         Validators.required,
      ]],
      message: ['',[
        Validators.required,
      ]],
    });
    // this.mailForm = new FormGroup({
    //  to : new FormControl('', [
    //    Validators.required,
    //    Validators.email
    //  ]),
    //  subject: new FormControl('', [
    //    Validators.requiredTrue
    //  ]),
    //  message: new FormControl('', [
    //    Validators.required
    //  ])
    // })
  
 // sender informamtion 
 this.auth.isLoggedIn().pipe(
  tap(user=>{
    if(user){
      this.senderId = user.uid;
      this.senderName = user.displayName;
      this.senderPhoto = user.photoURL;
      console.log(user.uid)
    } 
  })
)
.subscribe(user=>{});

  // receive reciever 
  this.data.currentMailRecieverid.subscribe(recieverid=>{
    this.recieverid = recieverid
  })
  this.data.currentMailRecieverName.subscribe(recieverName=>{
    this.recieverName = recieverName
  })
  this.data.currentMailRecieverPhoto.subscribe(recieverPhoto=>{
    this.recieverPhoto = recieverPhoto
  })
  }
// use getters for clear HTML code 
get subject(){
  return this.mailForm.get('subject')
} 
get message(){
  return this.mailForm.get('message')
}
sendEmail(){
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  console.log(this.mailForm.value);

  let  mailData ={
    // from mail form 
    message:this.message.value,
    subject:this.subject.value,
    // from data
    senderId:this.senderId,
    senderName:this.senderName,
    senderPhoto:this.senderPhoto,
    recieverid:this.recieverid,
    recieverName :this.recieverName,
    recieverPhoto:this.recieverPhoto,
    sendAt : timestamp
  }
this.inbox.SaveMail(mailData);

this.snackBar.open('Your mail is successfully sent', 'close', {duration:2500});

}
closeDialog(){
 
}
}
