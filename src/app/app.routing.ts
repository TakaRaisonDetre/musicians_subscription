import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import {ChargeCardComponent} from './stripe_view/charge-card/charge-card.component';
import {SaveCardComponent} from './stripe_view/save-card/save-card.component';
import {SubscriptionPageComponent} from './stripe_view/subscription-page/subscription-page.component';
import {StripeDashboardComponent} from './stripe_view/stripe-dashboard/stripe-dashboard.component';
import {EventChargeCardComponent} from './stripe_view/event-charge-card/event-charge-card.component';
import { FanclubSubscriptionComponent } from './stripe_view/fanclub-subscription/fanclub-subscription.component';
import { ServiceComponent } from './views/service/service.component';


export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  // {
  //   path: 'home',
  //   loadChildren: './views/home/home.module#HomeModule',
  //   data: { title: 'Choose A Demo' }
  // },
// card payment
  {
    path: '', 
    component: AdminLayoutComponent,
    children: [
  { path: 'event-charge/:id', component: EventChargeCardComponent,data: { title: 'stripe', breadcrumb: 'Purchase Event Ticket'} },
  { path: 'charge/:id', component: ChargeCardComponent,data: { title: 'stripe', breadcrumb: 'Charge Card'} },
  {path: 'fan-charge/:id', component : FanclubSubscriptionComponent, data: {title:'stripe', breadcrumb:'Fan Club Subscription'}},
  { path: 'save-card', component: SaveCardComponent, canActivate: [AuthGuard]  },
  { path: 'subscription', component: SubscriptionPageComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: StripeDashboardComponent, canActivate: [AuthGuard]  },
    ]
  },
  // video 
  // { path:'', component: AdminLayoutComponent, 
  //  children:[
  //  {path: 'youtube', component : YoutubeComponent, data: {title:'video', breadcrumb :'artist video'}}
  //  ]},
  // auth
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'} 
      },
    
    ]
  },
  // admin user 
  {
    path: '', 
    component: AdminLayoutComponent,
   // canActivate: [AuthGuard],
    children: [
      {
        path: 'profile', 
        loadChildren: './views/profile/profile.module#ProfileModule', 
        data: { title: 'Profile', breadcrumb: 'PROFILE'}
      },
      {
        path:'service',
        loadChildren:'./views/service/service.module#ServiceModule',
        data: {title : 'Service', breadcrumb:'SERVICE'}
      },
      {
        path:'artists',
        loadChildren:'./views/artists/artists.module#ArtistsModule',
        data: {title : 'artists', breadcrumb:'FEATURED ARTISTS'}
      },
      {
        path:'projects',
        loadChildren:'./views/projects/projects.module#ProjectsModule',
        data: {title : 'projects', breadcrumb:'PROJECTS'}
      },
      {
        path:'events',
        loadChildren:'./views/events/events.module#EventsModule',
        data: {title : 'events', breadcrumb:'EVENTS'}
      },
      {
        path:'company',
        loadChildren:'./views/company/company.module#CompanyModule',
        data: {title : 'company', breadcrumb:'COMPANY'}
      },
      {
        path: 'home',
        loadChildren: './views/home/home.module#HomeModule',
        data: { title: 'top' }
      },
     ]
  },
  { 
    path: '**', 
    redirectTo: 'sessions/404'
  }
];

