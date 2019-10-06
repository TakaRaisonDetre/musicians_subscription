import {Routes} from '@angular/router';
import {EventsListComponent} from '../../views/events/events-list/events-list.component';
import {EventComponent} from '../../views/events/event/event.component';
import {EventsComponent} from '../../views/events/events.component';

export const EventsRoutes : Routes =[
    {
        path : '',
        component : EventsComponent,
        children: [
          {
            path: 'event-list',
            component: EventsListComponent,
            data: { title: 'event', breadcrumb: 'EVENTS' }
          },
          {
              path: 'event/:id',
              component: EventComponent,
              data: {title : 'event-single', breadcrumb: 'SINGLE-EVENT'}, 
          },
         
        ]
    }


];