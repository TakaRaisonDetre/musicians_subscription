import { Routes } from '@angular/router';

import { ServiceComponent } from './service.component';
import {ForeignArtistPrComponent} from './foreign-artist-pr/foreign-artist-pr.component';


export const ServiceRoutes: Routes = [
  { path: '', component: ServiceComponent, data: { title: 'How to Use Tour' } },
  { path: 'foreign-artists-service', component: ForeignArtistPrComponent, data: { title: 'Foreign Artist Promotion' } }
];