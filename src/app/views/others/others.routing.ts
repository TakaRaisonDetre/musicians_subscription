import { Routes } from '@angular/router';

import { AppBlankComponent } from './app-blank/app-blank.component';

export const OthersRoutes: Routes = [
  {
    path: '',
    children: [ {
      path: '',
      component: AppBlankComponent,
      data: { title: 'DashBoard', breadcrumb: 'DASHBOARD' }
    }]
  }
];