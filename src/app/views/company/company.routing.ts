import {Routes} from '@angular/router';
import {EventsListComponent} from '../../views/events/events-list/events-list.component';
import {EventComponent} from '../../views/events/event/event.component';
import {EventsComponent} from '../../views/events/events.component';
import { CompanyComponent } from './company.component';
import {CompanyInfoComponent} from './company-info/company-info.component';
import {BlogsComponent} from './blogs/blogs.component';
import {BlogComponent} from './blog/blog.component';

export const CompanyRoutes : Routes =[
    {
        path: '',
        component: CompanyComponent,
        children:[
            {
                path:'company',
                component: CompanyInfoComponent,
                data : {title:'company', breadcrumb: 'COMPANY'}
            },
            {
                path:'blogs',
                component: BlogsComponent,
                data : {title:'blogs', breadcrumb: 'BLOGS'} 
            },
            {
                path:'blog/:id',
                component: BlogComponent,
                data : {title:'blog', breadcrumb: 'BLOG'}
            },
        ]
    }
];