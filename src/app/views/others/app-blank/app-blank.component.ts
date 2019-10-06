import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/auth.service';
import { FirebaseService } from '../../../shared/services/firebase.service';



@Component({
  selector: 'app-blank',
  templateUrl: './app-blank.component.html',
  styleUrls: ['./app-blank.component.css']
})

export class AppBlankComponent implements OnInit {
  currentLang:string; 
  mediaEvent:any;
  
  activityData = [{
    month: 'January',
    spent: 240,
    opened: 8,
    closed: 30
  }, {
    month: 'February',
    spent: 140,
    opened: 6,
    closed: 20
  }, {
    month: 'March',
    spent: 220,
    opened: 10,
    closed: 20
  }, {
    month: 'April',
    spent: 440,
    opened: 40,
    closed: 60
  }, {
    month: 'May',
    spent: 340,
    opened: 40,
    closed: 60
  }];

  tasks = [{
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }]

  tickets = [{
    img: 'assets/images/face-1.jpg',
    name: 'Mike Dake',
    text: 'Excerpt pipe is used.',
    date: new Date('07/12/2018'),
    isOpen: true
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Doe',
    text: 'My dashboard is not working.',
    date: new Date('07/7/2018'),
    isOpen: false
  }, {
    img: 'assets/images/face-3.jpg',
    name: 'Jhonson lee',
    text: 'Fix stock issue',
    date: new Date('04/10/2018'),
    isOpen: false
  }, {
    img: 'assets/images/face-4.jpg',
    name: 'Mikie Jyni',
    text: 'Renew my subscription.',
    date: new Date('07/7/2018'),
    isOpen: false
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Dake',
    text: 'Payment confirmation.',
    date: new Date('04/10/2018'),
    isOpen: false
  }]

  photos = [{
    name: 'Photo 1',
    url: 'assets/images/sq-15.jpg'
  }, {
    name: 'Photo 2',
    url: 'assets/images/sq-8.jpg'
  }, {
    name: 'Photo 3',
    url: 'assets/images/sq-9.jpg'
  }, {
    name: 'Photo 4',
    url: 'assets/images/sq-10.jpg'
  }, {
    name: 'Photo 5',
    url: 'assets/images/sq-11.jpg'
  }, {
    name: 'Photo 6',
    url: 'assets/images/sq-12.jpg'
  }]

userId:string;
user:any;
art:any;

  constructor(
    public auth:AuthService,
    public fbs:FirebaseService,
  
   ) { }

ngOnInit() { 


 
}
}