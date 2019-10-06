import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
//import {PaymentModule} from '../../payment/payment.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
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
import {FlexLayoutModule} from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SharedModule } from '../../shared/shared.module';
import {ServiceComponent} from './service.component';
import {ServiceRoutes} from './service.routing';
import { PaymentService } from '../../payment/payment.service';
import { ForeignArtistPrComponent } from './foreign-artist-pr/foreign-artist-pr.component';
import { FormsModule } from '@angular/forms';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
  }
  

@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
       // PaymentModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
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
       
        RouterModule.forChild(ServiceRoutes)
      ],
      declarations: [ServiceComponent, ForeignArtistPrComponent],
     

    })
export class ServiceModule { }