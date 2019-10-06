import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from "./profile-overview/profile-overview.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { ProfileBlankComponent } from "./profile-blank/profile-blank.component";
import {ProfileProjectComponent} from './profile-project/profile-project.component';
import {ProfilePublicComponent} from './profile-public/profile-public.component';
import {ProfileConnectionsComponent} from './profile-connections/profile-connections.component';
import {ProfileAccountingComponent} from './profile-accounting/profile-accounting.component';
import {ProfileInboxComponent} from './profile-inbox/profile-inbox.component';
import { ProfileEventsComponent } from './profile-events/profile-events.component';
import { ProfileRevenueComponent } from './profile-revenue/profile-revenue.component';



export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
    {  // not in use
        path: 'accounting',
        component: ProfileAccountingComponent,
        data: { title: 'accounting', breadcrumb: 'ACCOUNTING' }
    }, 
     {
       path: 'revenue',
       component: ProfileRevenueComponent,
       data: { title: 'Revenue', breadcrumb:'Income'}
     },
    {
      path: 'overview',
      component: ProfileOverviewComponent,
      data: { title: 'Overview', breadcrumb: 'OVERVIEW' }
    }, 
    {
      path: 'settings',
      component: ProfileSettingsComponent,
      data: { title: 'Settings', breadcrumb: 'SETTINGS' }
    }, 
    {
      path: 'artist',
      component: ProfileBlankComponent,
      data: { title: 'artist', breadcrumb: 'ARTISTS' }
    },
    {
      path: 'project',
      component: ProfileProjectComponent,
      data: { title: 'Projects', breadcrumb: 'PROJECT' }
    },
    {
      path:'event',
      component : ProfileEventsComponent,
      data :{ title: 'Events', breadcrumb: 'EVENTS'}
    },
    {
      path: 'connections',
      component: ProfileConnectionsComponent,
      data: { title: 'connections', breadcrumb: 'Connection' }
    }
  ]
  },
  {
    path: 'user-public/:id',
    component: ProfilePublicComponent,
    data: { title: 'User-public', breadcrumb: 'USER' }
}, 
{
  path: 'inbox',
  component: ProfileInboxComponent,
  data: { title: 'inbox', breadcrumb: 'INBOX' }
}, 

];