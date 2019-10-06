import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { 
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatChipsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatStepperModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,

 } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {QuillModule} from 'ngx-quill'
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {SharedModule} from '../../shared/shared.module';
import {ProjectsComponent} from "./projects.component";
import {ProjectListComponent} from "./project-list/project-list.component";

import {ProjectsRoutes} from "./projects.routing";
import { AuthService } from '../../core/auth.service';
import { FirebaseService } from '../../shared/services/firebase.service';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FileSizePipe} from '../../shared/pipes/fileSize.pipe';
import {DropZoneDirective} from '../../shared/directives/drop-zone.directive';
import { ProjectComponent } from './project/project.component';
import { ProjPaymentComponent } from './project/payment/proj-payment/proj-payment.component';
import { FundingArtistComponent } from './funding-artist/funding-artist.component';
import { FundingArtistListComponent } from './funding-artist-list/funding-artist-list.component';
import { followService } from '../../shared/services/follow.service';
import {DataService} from '../../shared/services/data.service';
import {DonationService} from '../../shared/services/donation.service';


/// FOR VIDEO ////
import { HttpModule } from '@angular/http';
import { VideoComponent } from './video/video.component';
import {BrowserNotificationService} from '../../shared/services/video_service/browser-notification.service';
import {NotificationService} from '../../shared/services/video_service/notification.service';
import {PlaylistStoreService} from '../../shared/services/video_service/playlist-store.service';
import {YoutubeApiService} from '../../shared/services/video_service/youtube-api.service';
import {YoutubePlayerService} from '../../shared/services/video_service/youtube-player.service'
import {VideoDurationPipe} from '../../shared/pipes/video_pipe/video-duration.pipe';
import {VideoLikesViewsPipe} from '../../shared/pipes/video_pipe/video-likes-views.pipe';
import {VideoNamePipe} from '../../shared/pipes/video_pipe/video-name.pipe' 
import {LazyScrollDirective} from '../../shared/directives/lazy-scroll/lazy-scroll.directive';
import { VideoPlayerComponent } from './video/video-player/video-player.component';
import { VideosListComponent } from './video/videos-list/videos-list.component';
import { VideosPlaylistComponent } from './video/videos-playlist/videos-playlist.component';
import { VideosSearchComponent } from './video/videos-search/videos-search.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FundingProjectListComponent } from './funding-project-list/funding-project-list.component';
// import { FundingProjectComponent } from './funding-project/funding-project.component';
///////////////////

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
    imports: [
   
      HttpModule,
      ReactiveFormsModule,
     
      CommonModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      HttpClientModule,
      MatStepperModule,
      FormsModule,
      MatNativeDateModule,
      MatDatepickerModule,
      QuillModule,
      ReactiveFormsModule,
      MatListModule,
      MatSelectModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatExpansionModule,
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
      MatTooltipModule,
      MatDialogModule,
      MatSnackBarModule,
      SharedModule,
      
      RouterModule.forChild(ProjectsRoutes)
    ],
    declarations: [
      ProjectsComponent,
      ProjectListComponent, 
      ProjectComponent, 
      ProjPaymentComponent, 
      FundingArtistComponent, 
      FundingArtistListComponent, VideoComponent,
      // FundingProjectListComponent,
      // FundingProjectComponent,
      // // YOUTUBE COMPONENTS
      VideoComponent,

      // YOUTUBE Pipe
       VideoDurationPipe,
       VideoLikesViewsPipe,
        VideoNamePipe,
       LazyScrollDirective,
       VideoPlayerComponent,
       VideosListComponent,
      VideosPlaylistComponent,
       VideosSearchComponent,
      
      ////////////


    ],
    providers:[
      AuthService, 
      FirebaseService, 
      DataService, 
      followService,
      DonationService,
     // YOUTUBE Service
      YoutubeApiService,
      YoutubePlayerService,
      PlaylistStoreService,
      NotificationService,
      BrowserNotificationService
   ////////////////////
    ]
  })
  export class ProjectsModule { }
  