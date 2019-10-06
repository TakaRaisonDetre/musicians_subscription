import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//import {Npo} from './npos';
import {Artist} from '../models/artist.model';
import {Observable} from 'rxjs/Observable';
import {Participants} from '../models/participants.model';
import {Members} from '../models/memebers.model';

//import {User} from 'firebase/app';
import {Users} from '../models/user.model';
import {Fans} from '../models/fans.model';
import { map, take } from 'rxjs/operators';
import { pipe } from '../../../../node_modules/rxjs';
import {Featured} from '../models/featured_artist.model';
import {Project} from '../models/project.model';
import { isThisISOWeek } from 'date-fns';
import * as firebase from 'firebase'; 
import { ActivatedRouteSnapshot } from '@angular/router';
import { v } from '@angular/core/src/render3';

@Injectable()
export class DonationService{

    artistsCollection: AngularFirestoreCollection<Artist>;
    artists:Observable<Artist[]>;
    artistDoc: AngularFirestoreDocument<Artist>;

    patron_under_artist:Observable<Artist[]>;
    monthly_donation_Collection: AngularFirestoreCollection<Fans>;
    monthly_donation:Observable<Fans[]>;

    constructor(public afs: AngularFirestore){

    }


// add artist Patron Member 
AddArtistsPatronMember(patron, artistId, userId){
    const PathtoProject = `artists/${artistId}/patrons/${userId}_${artistId}`;
    this.afs.doc(PathtoProject).set(patron);
    const PathtoUser = `users/${userId}/patronized_artists/${artistId}_${userId}`;
    this.afs.doc(PathtoUser).set(patron); 
}

// add project Patron Member
AddProjectsPatronMember(patron, projectId, userId){
    const PathtoProject = `projects/${projectId}/patrons/${userId}_${projectId}`;
    this.afs.doc(PathtoProject).set(patron);
   const PathtoUser = `users/${userId}/patronized_projects/${projectId}_${userId}`;
   this.afs.doc(PathtoUser).set(patron); 
}
AddTicketBuyer(Ticket_Buyer, eventId, userId){
    const PathtoProject = `projects/${eventId}/ticket_buyers/${userId}_${eventId}`;
    this.afs.doc(PathtoProject).set(Ticket_Buyer);
    const PathtoUser = `users/${userId}/purchased_ticket/${eventId}_${userId}`;
    this.afs.doc(PathtoUser).set(Ticket_Buyer); 
}
UpdatePhoneforTicketBuyer(phone, eventId, userId){
    const PathtoProject = `projects/${eventId}/ticket_buyers/${userId}_${eventId}`;
    this.afs.doc(PathtoProject).set(phone, {merge: true});
    const PathtoUser = `users/${userId}/purchased_ticket/${eventId}_${userId}`;
    this.afs.doc(PathtoUser).set(phone, {merge:true}); 
}
CheckPatronList(artistId, userId){
    this.patron_under_artist=this.afs.collection(`artists/${artistId}/patrons`,
    ref=> ref.where('userId', '==', `${userId}`)).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
                const data = a.payload.doc.data() as Artist;
                 data.id=a.payload.doc.id;
                 return data;
            });
          }));
         return this.patron_under_artist;



}
GetDonationforArtist(artistId, year){
 
    const DonRef = this.afs.collection('artists').doc(`${artistId}`).collection('monthly_donation')

    return DonRef.doc(`${year}`).snapshotChanges().pipe(map(snap=>{
        const data = snap.payload.data();
        const id = snap.payload.id;
        return {id,...data};
    }));

}
GetDonationforProject(projectId, year){
    const DonRef = this.afs.collection('projects').doc(`${projectId}`).collection('monthly_donation')

    return DonRef.doc(`${year}`).snapshotChanges().pipe(map(snap=>{
        const data = snap.payload.data();
        const id = snap.payload.id;
        return {id,...data};
    }));
}
GetTicketsforEvents(eventId, year){
    const TickRef = this.afs.collection('projects').doc(`${eventId}`).collection('monthly_sales')
    return TickRef.doc(`${year}`).snapshotChanges().pipe(map(snap=>{
      const data = snap.payload.data();
      const id = snap.payload.id;
      return {id,...data};
}));
}



AddMonthlyDonationForArtist(artistId, year, MontlyDonation){
     
    //    this.afs.collection('artists').doc(`${artistId}`)
    //    .update({year : firebase.firestore.FieldValue.arrayUnion(MontlyDonation)})    
       
        const SharedpathThree = `artists/${artistId}/monthly_donation/${year}`;
        this.afs.doc(SharedpathThree).update(MontlyDonation);

}


AddMonthlyDonationForProject(projectId, year, MontlyDonation){
  
 //     this.afs.collection('projects').doc(`${projectId}`)
 //       .update({year : firebase.firestore.FieldValue.arrayUnion(MontlyDonation)})    
       
        const SharedpathThree = `projects/${projectId}/monthly_donation/${year}`;
        this.afs.doc(SharedpathThree).update(MontlyDonation);
   
}

AddMonthlyTicketForEvent(eventId, year, MonthlyTicket){

    const Shared = `projects/${eventId}/monthly_sales/${year}`;
    this.afs.doc(Shared).update(MonthlyTicket);

}

UpdateArtistsPaymentStatus(status, projectId, userId){
    const PathtoProject = `artists/${projectId}/patrons/${userId}_${projectId}`;
    this.afs.doc(PathtoProject).update(status);
    const PathtoUser = `users/${userId}/patronized_artists/${projectId}_${userId}`;
    this.afs.doc(PathtoUser).update(status); 

}
UpdateProjectPaymentStatus(status, projectId, userId){
    const PathtoProject = `projects/${projectId}/patrons/${userId}_${projectId}`;
    this.afs.doc(PathtoProject).update(status);
    const PathtoUser = `users/${userId}/patronized_projects/${projectId}_${userId}`;
    this.afs.doc(PathtoUser).update(status); 

}

}