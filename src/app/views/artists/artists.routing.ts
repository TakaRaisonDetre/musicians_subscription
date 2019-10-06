import { Routes } from '@angular/router';

import {ArtistComponent} from './artist.component';
import {ArtistListComponent} from './artists_list/artist_list.component'



export const ArtistRoutes: Routes = [
  {   
    path: '',
    component: ArtistListComponent
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
    
  },

];

// export const ArtistRoutes:Routes = [{
//     path: '',
//     children: [{
//       path: '',
//       component: ArtistListComponent
//     }, {
//       path: 'musician/:id',
//       component: ArtistComponent,
//       data: { title: 'Artist Detail', breadcrumb: 'Artist Detail' },
//      children:[
//        {
//         path: 'musician/:id/artist/:id',
//         component: AlbumComponent,
//         data: { title: 'Spotify album', breadcrumb: 'ALBUM' }

//       },
//       {
//         path: 'musician/:id/track/:id',
//         component: TrackComponent,
//         data: { title: 'Spotify album tracks', breadcrumb: 'TRACKS' }

//       }
//     ]
//     },
//   ]
//   }];