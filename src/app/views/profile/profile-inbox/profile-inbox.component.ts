import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';
import {MediaChange, ObservableMedia } from '@angular/flex-layout';
import {MatSidenav, MatDialog} from '@angular/material';
import { ProfileMailComposeComponent } from '../profile-mail-compose/profile-mail-compose.component';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {AuthService} from '../../../core/auth.service';
import { InboxService } from '../../../shared/services/inbox.service';
import {tap, map} from 'rxjs/operators';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-profile-inbox',
  templateUrl: './profile-inbox.component.html',
  styleUrls: ['./profile-inbox.component.scss']
})
export class ProfileInboxComponent implements OnInit {
  userId :any;
  user:any;
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  selectToggleFlag = false;

  // state management
  IncomingMailScreen_State : boolean = true;
  OutgoingMailScreen_State : boolean = false;

  @ViewChild(MatSidenav) private sideNav: MatSidenav;
 
  incomingMail : any;
  outgoingMail : any;
  recieverid;
  recieverName; 
  reciverPhoto

  constructor(
    private auth : AuthService,
    private router : Router,
    private route : ActivatedRoute,
    private media : ObservableMedia,
    private composeDialog: MatDialog,
    private inboxService: InboxService,
    private fbs : FirebaseService,
    private data : DataService, 
  ) { }

  ngOnInit() {
    this.inboxSideNavInit();
    //this.messages = this.inboxService.getIncomingMail;

    this.auth.isLoggedIn().pipe(
      tap(user=>{
        if(user){
          this.userId = user.uid;
          this.user=this.fbs.getUser(this.userId)
        }
      })
    ).subscribe(user=>{
      this.user=user;
      console.log(this.user)

     this.inboxService.getIncomingMail(this.userId).subscribe(incomingMail=>{
        this.incomingMail = incomingMail;
      
      

     });
    });
    
  }

ngOnDestroy(){
  if(this.screenSizeWatcher){
    this.screenSizeWatcher.unsubscribe()
  }
}
openComposeDialog(event, recieverid, recieverName, reciverPhoto){
   const dialogRef = this.composeDialog.open(ProfileMailComposeComponent);
   dialogRef.afterClosed().subscribe(result=>{})
   // share mail data with modal
   this.data.changeMailtoID(recieverid);
   this.data.changeMailtoName(recieverName);
   this.data.changeMailtoPhoto(reciverPhoto);

 }
selectToggleAll(){
  this.selectToggleFlag  =  !this.selectToggleFlag;
  this.incomingMail.forEach((msg)=>{
    msg.selected = this.selectToggleFlag
  })
} 

stopProp(e) {
  e.stopPropagation()
}
updateSidenav() {
  let self = this;
  setTimeout(() => {
    self.isSidenavOpen = !self.isMobile;
    self.sideNav.mode = self.isMobile ? 'over' : 'side';
  })
}
inboxSideNavInit() {
  this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
  this.updateSidenav();
  this.screenSizeWatcher = this.media.subscribe((change: MediaChange) => {
    this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
    this.updateSidenav();
  });
}

OutgoingMail_Screen(event){
  this.OutgoingMailScreen_State = true;
  this.IncomingMailScreen_State = false;

  this.inboxService.getOutGoingMail(this.userId).subscribe(outgoingMail=>{
    this.outgoingMail = outgoingMail;
  });
}
IncomingMail_Screen(event){
  this.IncomingMailScreen_State = true;
  this.OutgoingMailScreen_State = false;
}

deleteMail(event, messageid){
 this.inboxService.deleteMessage(messageid);
}
}
