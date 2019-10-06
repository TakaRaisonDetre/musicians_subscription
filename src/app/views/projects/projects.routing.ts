import {Routes} from '@angular/router';
import {ProjectsComponent} from './projects.component';
import {ProjectListComponent} from '../projects/project-list/project-list.component'
import { ProjectComponent } from './project/project.component';
import { ProjPaymentComponent } from './project/payment/proj-payment/proj-payment.component';
import {FundingArtistListComponent} from '../projects/funding-artist-list/funding-artist-list.component';
import {FundingArtistComponent} from '../projects/funding-artist/funding-artist.component';
// import {FundingProjectListComponent} from '../projects/funding-project-list/funding-project-list.component';
// import {FundingProjectComponent} from '../projects/funding-project/funding-project.component';
import {VideoComponent} from '../projects/video/video.component';


export const ProjectsRoutes : Routes =[
{
    path : '',
    component : ProjectsComponent,
    children: [
      {
        path: 'funding-project-list',
        component: ProjectListComponent,
        data: { title: 'project', breadcrumb: 'PROJECT' }
      },
      {
          path: 'funding-project/:id',
          component: ProjectComponent,
          data: {title : 'project-single', breadcrumb: 'SINGLE-PROJECT'}, 
      },
      {
        path: 'funding-artist-list',
        component: FundingArtistListComponent,
        data: { title: 'Crowdfunding-Artists', breadcrumb: 'FUNDING-ARTISTS' }
      },
      {
        path: 'funding-artist/:id',
        component: FundingArtistComponent,
        data: {title : 'Crowdfunding-Artist', breadcrumb: 'SINGLE-FUNDING-ARTIST'}, 
    },
      {
        path:'payment/:id',
       // path:'/payment',
        component:ProjPaymentComponent,
        data: {title:'project-payment', breadcrumb:'PROJECT-PAYMENT'}
    },
    {
      path:'video/:id',
     // path:'/payment',
      component:VideoComponent,
      data: {title:'youtube-video', breadcrumb:'YOUTUBE'}
  }
    ]
}];