import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentService } from './payment.service';
import { UserChargesComponent } from './user-charges/user-charges.component';
import { UserSourcesComponent } from './user-sources/user-sources.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { ConnectRedirectComponent } from './connect-redirect/connect-redirect.component';

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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,

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
  ],
  declarations: [
    PaymentFormComponent,
    UserChargesComponent, 
    UserSourcesComponent, 
    SubscriptionPlanComponent,
    UserSubscriptionsComponent, 
    ConnectRedirectComponent
  ],
  exports: [
    PaymentFormComponent, 
    UserChargesComponent, 
    UserSourcesComponent, 
    SubscriptionPlanComponent, 
    UserSubscriptionsComponent, 
    ConnectRedirectComponent
  ],
  providers: [PaymentService]
})
export class PaymentModule { }
