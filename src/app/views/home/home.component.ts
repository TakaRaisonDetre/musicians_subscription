import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
import PerfectScrollbar from 'perfect-scrollbar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  /****** Only for demo) **********/
  public versions: any[] = [
    {
      name: 'Control your Projects',
      photo: 'assets/images/screenshots/screen_shot3.png',
      dest: 'dashboard',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple"
      }`
    }, {
      name: 'Check Mails',
      photo: 'assets/images/screenshots/screen_shot4.png',
      dest: 'inbox',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "full",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple"
      }`
    },
    {
      name: 'Manage Donations',
      photo: 'assets/images/screenshots/screen_shot5.png',
      dest: 'dashboard',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": true,
        "breadcrumb": "simple"
      }`,
      theme: `{
        "name": "egret-dark-purple"
      }`
    },
    {
      name: 'Manage Videos',
      photo: 'assets/images/screenshots/screen_shot6.png',
      dest: 'dashboard',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": true,
        "breadcrumb": "simple"
      }`,
      theme: `{
        "name": "egret-dark-pink"
      }`
    },
    {
      name: 'Look for Artists',
      photo: 'assets/images/screenshots/screen_shot1.png',
      dest: 'dashboard',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": true,
        "breadcrumb": "simple"
      }`,
      theme: `{
        "name": "egret-blue"
      }`
    },
    {
      name: 'Check Events',
      photo: 'assets/images/screenshots/screen_shot2.png',
      dest: 'dashboard',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": true,
        "breadcrumb": "simple"
      }`
    },
  
   
  ]

  private homePS: PerfectScrollbar;
  constructor(
    private router: Router,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.homePS) this.homePS.destroy();
    this.loader.close();
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.homePS = new PerfectScrollbar('.scrollable')
    // });
  }

  /****** Remove this (Only for demo) **********/
  goToDashboard(v) {
    let origin = window.location.origin;
    if(v.theme) {
      return window.location.href = `${origin}/${v.dest}/?layout=${v.conf}&theme=${v.theme}`;
    }
    window.location.href = `${origin}/${v.dest}/?layout=${v.conf}`;
  }
  goToMainDash() {
    this.loader.open();
    this.router.navigateByUrl('/service')
  }
}
