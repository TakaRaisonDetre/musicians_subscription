import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {AuthService} from './auth.service';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../../environments/environment';
import {NotifyService} from '../shared/services/auth/notify.service';

import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule ({
    imports :[
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule
    ],
    providers : [
        AuthService, 
        NotifyService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
})
export class CoreModule{}