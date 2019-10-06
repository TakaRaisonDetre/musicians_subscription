import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { followService } from '../../services/follow.service';
import {tap} from 'rxjs/operators'
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../../core/auth.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;
  list:any;
  user:any;
  userId:any;
  notifications:any;
  
  // Dummy notifications
  // notifications = [{
  //   message: 'New contact added',
  //   icon: 'assignment_ind',
  //   time: '1 min ago',
  //   route: '/inbox',
  //   color: 'primary'
  // }, {
  //   message: 'New message',
  //   icon: 'chat',
  //   time: '4 min ago',
  //   route: '/chat',
  //   color: 'accent'
  // }, {
  //   message: 'Server rebooted',
  //   icon: 'settings_backup_restore',
  //   time: '12 min ago',
  //   route: '/charts',
  //   color: 'warn'
  // }]

  constructor(private router: Router,
    private fl: followService,
    private fbs: FirebaseService,
    private auth:AuthService) {}

  ngOnInit() {
    // this.router.events.subscribe((routeChange) => {
    //     if (routeChange instanceof NavigationEnd) {
    //       this.notificPanel.close();
    //     }
    // });
    if(this.user)
    this.auth.isLoggedIn().pipe(
   
      tap(user=>{
        this.userId=user.uid;
        console.log(user.uid);
        this.user=this.fbs.getUser(this.userId).subscribe

        this.fl.ConnectionRequestList(this.userId).subscribe(notifications=>{
          this.notifications=notifications;
          console.log(notifications)
        });
      })
    )
    .subscribe(user=>{this.user=user});




  }
  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}
