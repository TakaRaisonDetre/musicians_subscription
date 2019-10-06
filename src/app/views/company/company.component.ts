import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from '../../core/auth.service';
import {FirebaseService} from '../../shared/services/firebase.service';
// check to see if user is login
import {tap} from 'rxjs/operators';
import { DataService } from '../../shared/services/data.service';
import * as firebase from 'firebase/app';




@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  lang:string;
  userId:string;
  user:any;
  projectId:any;
  featuredproject:any;
  featuredartists:any
  isActive = false;

  DefaultState : boolean = true; 


  constructor(
    public auth : AuthService,
    private router: ActivatedRoute,
    private route:Router,
    private data:DataService,
    public fbs:FirebaseService,) { }

  ngOnInit() {
  this.DefaultState=true;

  }
  navigatetoCompany(){
    
      this.route.navigate([`/company/company`]);
      this.DefaultState=false;
  
  }
  navigatetoBlog(){
    
    this.route.navigate([`/company/blogs`]);
    this.DefaultState=false;

}

}
