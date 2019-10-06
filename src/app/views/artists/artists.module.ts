import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { 
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatChipsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatInputModule,
  MatProgressBarModule
 } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';
// component 
import {ArtistComponent} from './artist.component';
import {ArtistListComponent} from './artists_list/artist_list.component'
// import {AlbumComponent} from './album/album.component';
// import {TrackComponent} from './track/track.component';
// Route
import {ArtistRoutes} from './artists.routing';
import { FirebaseService } from '../../shared/services/firebase.service';
import { DataService } from '../../shared/services/data.service';


/// FOR VIDEO ////
import { HttpModule } from '@angular/http';
import {BrowserNotificationService} from '../../shared/services/video_service/browser-notification.service';
import {NotificationService} from '../../shared/services/video_service/notification.service';
import {PlaylistStoreService} from '../../shared/services/video_service/playlist-store.service';
import {YoutubeApiService} from '../../shared/services/video_service/youtube-api.service';
import {YoutubePlayerService} from '../../shared/services/video_service/youtube-player.service'
import {VideoDurationPipe} from '../../shared/pipes/video_pipe/video-duration.pipe';
import {VideoLikesViewsPipe} from '../../shared/pipes/video_pipe/video-likes-views.pipe';
import {VideoNamePipe} from '../../shared/pipes/video_pipe/video-name.pipe' 
import {LazyScrollDirective} from '../../shared/directives/lazy-scroll/lazy-scroll.directive';
///////////////////



// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatMenuModule,
      MatSlideToggleModule,
      MatGridListModule,
      MatChipsModule,
      MatCheckboxModule,
      MatRadioModule,
      MatTabsModule,
      MatInputModule,
      MatProgressBarModule,
      FlexLayoutModule,
      NgxDatatableModule,
      ChartsModule,
      FileUploadModule,
      SharedModule,
      RouterModule.forChild(ArtistRoutes)
    ],
    declarations: [
      ArtistListComponent, 
      ArtistComponent, 
     
    ],
    providers: [
      FirebaseService, 
      DataService,
    
    ]
  })
  export class ArtistsModule { }
  