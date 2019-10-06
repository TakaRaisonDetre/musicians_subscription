import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {AuthService} from '../../core/auth.service';
import {FirebaseService} from '../../shared/services/firebase.service';
// check to see if user is login
import {first, tap} from 'rxjs/operators';
import { DataService } from '../../shared/services/data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  lang:string
  
  activeView : string = 'overview';
  userId:any;
  user:any;

  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)',]
  }];
  
  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];

  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: false
    }
  };

  constructor(
    public auth : AuthService,
    private router: ActivatedRoute,
    private data:DataService,
    private fbs:FirebaseService
  ) { 
     
      
    }

  ngOnInit() {
    this.activeView = this.router.snapshot.params['view']
    
   
   
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
   
    
  

  

      
  }

}
