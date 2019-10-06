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
  MatSidenavModule,
  MatToolbarModule

 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';


import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileBlankComponent } from './profile-blank/profile-blank.component';
import { ProfileRoutes } from "./profile.routing";
import { AuthService } from '../../core/auth.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import {DataService} from '../../shared/services/data.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireFunctionsModule} from 'angularfire2/functions';
import {FileSizePipe} from '../../shared/pipes/fileSize.pipe';
import {DropZoneDirective} from '../../shared/directives/drop-zone.directive';

import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfilePublicComponent } from './profile-public/profile-public.component';
import { ProfileAccountingComponent } from './profile-accounting/profile-accounting.component';
import { ProfileConnectionsComponent } from './profile-connections/profile-connections.component';
import { ProfileInboxComponent } from './profile-inbox/profile-inbox.component';
import { ProfileMailComposeComponent } from './profile-mail-compose/profile-mail-compose.component';

import { SharedModule } from '../../shared/shared.module';
import {PaymentModule} from '../../payment/payment.module';
import {PaymentService} from '../../payment/payment.service';
import { followService } from '../../shared/services/follow.service';
import { InboxService } from '../../shared/services/inbox.service';
import { ProfileArtImageComponent } from './profile-art-image/profile-art-image.component';
import { UploadArtistTaskComponent } from './profile-art-image/upload-artist-task/upload-artist-task.component';
import { ProfileEventsComponent } from './profile-events/profile-events.component';
import { ProfileEventImageComponent } from './profile-event-image/profile-event-image.component';
import { UploadEventTaskComponent } from './profile-event-image/upload-event-task/upload-event-task.component';
import { ProfileRevenueComponent } from './profile-revenue/profile-revenue.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    PaymentModule,
    
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    QuillModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatToolbarModule,
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
  
   
    RouterModule.forChild(ProfileRoutes)
  ],
  declarations: [
    ProfileComponent, 
    ProfileOverviewComponent, 
    ProfileSettingsComponent, 
    ProfileBlankComponent,
    ProfileProjectComponent, 
    ProfilePublicComponent, 
    ProfileAccountingComponent,
    ProfileConnectionsComponent,
    ProfileInboxComponent, 
    ProfileMailComposeComponent,
    ProfileArtImageComponent,
    ProfileEventImageComponent, 
    ProfileEventsComponent, 
    ProfileRevenueComponent, 
    FileSizePipe, 
    DropZoneDirective,  
    UploadArtistTaskComponent,  
    UploadEventTaskComponent, 
    
  ],
  entryComponents:[ProfileMailComposeComponent, ProfileArtImageComponent,ProfileEventImageComponent],
  providers:[AuthService, FirebaseService, DataService, InboxService, followService]
})
export class ProfileModule { }
