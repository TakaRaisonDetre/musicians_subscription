import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RoutePartsService } from "./shared/services/route-parts.service";
import { ThemeService } from './shared/services/theme.service';
import { filter } from 'rxjs/operators';
import { Setting, SpotifyAuthorizationResponse, Theme } from './shared/common.interface';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './shared/services/data.service';
import {AuthService} from './core/auth.service';
import {PaymentService} from './payment/payment.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'Raison Detre';
  pageTitle = '';
  currentLang:string
  spotifyAuthResponse: SpotifyAuthorizationResponse;
  authorized: boolean;
  constructor(
    public title: Title, 
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private themeService: ThemeService,
    private renderer: Renderer2,
    private _activatedRoute: ActivatedRoute, 
    
    private _translate: TranslateService, 
    private auth: AuthService,
    private pmt: PaymentService,
    private data: DataService
  ) { 
    _translate.setDefaultLang('jp')
  }

  ngOnInit() {
    this.changePageTitle();



      // langulage 
this.data.currentLanguage.subscribe(currentLang=>{
  this.currentLang = currentLang;
  this._translate.use(this.currentLang)
})

  }

  ngAfterViewInit() {
    this.themeService.applyMatTheme(this.renderer)
  }
  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      var routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length)
        return this.title.setTitle(this.appTitle);
      // Extract title from parts;
      this.pageTitle = routeParts
                      .reverse()
                      .map((part) => part.title )
                      .reduce((partA, partI) => {return `${partA} > ${partI}`});
      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }
 
}
