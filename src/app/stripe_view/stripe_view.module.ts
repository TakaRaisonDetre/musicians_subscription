import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { 
  MatStepperModule,
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
  MatProgressBarModule,
 
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChargeCardComponent } from './charge-card/charge-card.component';
import { FanclubSubscriptionComponent} from './fanclub-subscription/fanclub-subscription.component';
import { ReadMeComponent } from './read-me/read-me.component';
import { PaymentModule } from '../payment/payment.module';
import { SaveCardComponent } from './save-card/save-card.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
import { StripeDashboardComponent } from './stripe-dashboard/stripe-dashboard.component';
import { ConnectPageComponent } from './connect-page/connect-page.component';
import {EventChargeCardComponent} from './event-charge-card/event-charge-card.component';

import {AuthService} from '../core/auth.service';
import { FirebaseService } from '../shared/services/firebase.service';
import { DataService } from '../shared/services/data.service';
// to receive project ID membership for single payment
import { SharedModule } from '../shared/shared.module';
import { DonationService } from 'app/shared/services/donation.service';



@NgModule({
  imports: [
    CommonModule,
    PaymentModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    

    MatStepperModule,
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
    //RouterModule.forChild(StripeRoutes)
  ],
  declarations: [
    ChargeCardComponent, 
    FanclubSubscriptionComponent,
    EventChargeCardComponent,
    ReadMeComponent, 
    SaveCardComponent, 
    SubscriptionPageComponent, 
    StripeDashboardComponent, 
    ConnectPageComponent
  ],
  providers:[FirebaseService,AuthService,DataService, DonationService]
})
export class StripeViewModule { }
