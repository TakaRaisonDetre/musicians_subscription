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
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/auth.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FileSizePipe} from '../../shared/pipes/fileSize.pipe';
import {DropZoneDirective} from '../../shared/directives/drop-zone.directive';
import { followService } from '../../shared/services/follow.service';
import {DataService} from '../../shared/services/data.service';
import {DonationService} from '../../shared/services/donation.service';

import { CompanyComponent } from './company.component';
import {CompanyInfoComponent} from './company-info/company-info.component';
import {BlogsComponent} from './blogs/blogs.component';
import {BlogComponent} from './blog/blog.component';
import {CompanyRoutes} from './company.routing';



// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
  }
  

@NgModule({
    imports :[
        CommonModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
    
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
        RouterModule.forChild(CompanyRoutes)
    ],
    declarations:[CompanyComponent, CompanyInfoComponent, BlogsComponent, BlogComponent],
    providers:[AuthService, FirebaseService, DataService, followService, DonationService] 
})
export class CompanyModule{}