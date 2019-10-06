"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
//import { QueryDocumentSnapshot } from '@google-cloud/firestore';
//import { DeclareFunctionStmt } from '@angular/compiler';
//import { QuerySnapshot } from '@google-cloud/firestore';
const functions = require('firebase-functions');
exports.AggregateComments = functions.firestore
    .document('projects/{projectId}/comments/{commentId}')
    .onWrite((change, context) => {
    //
    const commentId = context.params.commentId;
    const projectId = context.params.projectId;
    // ref to the parent document
    const docRef = config_1.db.collection('projects').doc(projectId);
    // get all comments and aggregate
    // return docRef.collection('comments').orderBy('createdAt', 'desc')
    return docRef.collection('comments')
        .get()
        .then(querySnapshot => {
        // get the total comment count! nice ! 
        const commentCount = querySnapshot.size;
        const recentComments = [];
        // add data from the 5 most recent comments to the array
        querySnapshot.forEach(doc => {
            recentComments.push(doc.data());
        });
        recentComments.splice(3);
        // record last comment timestamp
        //const commentlastActivity = recentComments[0].createdAt
        // data to update on the document
        const data = { commentCount, recentComments };
        // run update
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
exports.AggregateProjectFollowers = functions.firestore
    .document('projects/{projectId}/followed/{projectFollowerId}')
    .onWrite((change, context) => {
    const projectFollowerId = context.params.projectFollowerId;
    const projectId = context.params.projectId;
    const docRef = config_1.db.collection('projects').doc(projectId);
    // get all follower data and aggregate 
    return docRef.collection('followed')
        .get()
        .then(querySnapshot => {
        // to get total number of followers
        const project_follower_count = querySnapshot.size;
        const recentFollowers = [];
        // add ata from the 5 most recent followers to the array
        querySnapshot.forEach(doc => {
            recentFollowers.push(doc.data());
        });
        recentFollowers.splice(6);
        const data = { project_follower_count, recentFollowers };
        // run update on firebase
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
exports.AggregateProjectDonors = functions.firestore
    .document('projects/{projectId}/patrons/{projectPatronId}')
    .onWrite((change, context) => {
    const projectPatronId = context.params.projectPatronId;
    const projectId = context.params.projectId;
    const docRef = config_1.db.collection('projects').doc(projectId);
    // get all donors data aggregate them 
    return docRef.collection('patrons')
        .get()
        .then(querySnapshot => {
        // to get total numbeer of donors
        const project_donors_count = querySnapshot.size;
        const recentDonors = [];
        // add data from the 5 most recent donors to the array
        querySnapshot.forEach(doc => {
            recentDonors.push(doc.data());
        });
        recentDonors.splice(6);
        const data = { project_donors_count, recentDonors };
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
// get donation total for that project
exports.GetDonationProject = functions.firestore
    .document('projects/{projectId}/patrons/{projectPatronId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const projectPatronId = context.params.projectPatronId;
    const projectId = context.params.projectId;
    const data = snapshot.data();
    const docRef = config_1.db.collection('projects').doc(projectId);
    // get all followers data and aggregate 
    const AggRef = config_1.db.doc(`projects/${projectId}`);
    const aggDoc = yield AggRef.get();
    const aggData = aggDoc.data();
    const next = {
        artist_patron_amount: aggData.project_patron_amount + data.donation
    };
    return AggRef.update(next);
}));
// count of follower
exports.AggregateArtistFollowers = functions.firestore
    .document('artists/{artistId}/followed/{artistFollowerId}')
    .onWrite((change, context) => {
    const artistFollowerId = context.params.artistFollowerId;
    const artistId = context.params.artistId;
    const docRef = config_1.db.collection('artists').doc(artistId);
    // get all followers data and aggregate 
    return docRef.collection('followed')
        .get()
        .then(querySnapShot => {
        const artist_follower_count = querySnapShot.size;
        const recentFollowers = [];
        // add ata from the 5 most recent followers to the array
        querySnapShot.forEach(doc => {
            recentFollowers.push(doc.data());
        });
        recentFollowers.splice(6);
        const data = { artist_follower_count, recentFollowers };
        // run update on firebase
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
// count of patrons
exports.AggregateArtistDonors = functions.firestore
    .document('artists/{artistId}/patrons/{artistPatronId}')
    .onWrite((change, context) => {
    const artistPatronId = context.params.artistPatronId;
    const artistId = context.params.artistId;
    const docRef = config_1.db.collection('artists').doc(artistId);
    // get all followers data and aggregate 
    return docRef.collection('patrons')
        .get()
        .then(querySnapShot => {
        const artist_patron_count = querySnapShot.size;
        const recentDonors = [];
        // add data from 6 most recent donors to the array
        querySnapShot.forEach(doc => {
            recentDonors.push(doc.data());
        });
        recentDonors.splice(6);
        const data = { artist_patron_count, recentDonors };
        // run upate on firebase 
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
// get donation total for that artist 
exports.GetDonationArtist = functions.firestore
    .document('artists/{artistId}/patrons/{artistPatronId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const artistPatronId = context.params.artistPatronId;
    const artistId = context.params.artistId;
    const data = snapshot.data();
    const docRef = config_1.db.collection('artists').doc(artistId);
    // get all followers data and aggregate 
    const AggRef = config_1.db.doc(`artists/${artistId}`);
    const aggDoc = yield AggRef.get();
    const aggData = aggDoc.data();
    const next = {
        artist_patron_amount: aggData.artist_patron_amount + data.donation,
    };
    return AggRef.update(next);
}));
// get donation Monthly total for that artist 
// export const GetMonthlyDonationArtist = functions.firestore
// .document('artists/{artistId}/patrons/{artistPatronId}')
// .onCreate(async(snapshot, context)=>{
//   const artistPatronId = context.params.artistPatronId;
//   const artistId = context.params.artistId;
//   const data = snapshot.data();
//   const docRef = db.collection('artists').doc(artistId)
//   // get all followers data and aggregate 
//   const AggRef = db.doc(`artists/${artistId}`)
//   const aggDoc = await AggRef.get();
//   const aggData = aggDoc.data();
//   const currentTime = new Date()
//   const year = currentTime.getFullYear()
//   if(aggData.createdMonth===1 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1 + data.donation;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6;
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=[Donation_Month_1, Donation_Month_2,  Donation_Month_3,Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===2 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2+ data.donation;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6;
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===3 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3+ data.donation;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6;
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===4 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4+ data.donation;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6;
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===5 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5+ data.donation;
//     const Donation_Month_6 = aggData.Donation_Momth_6;
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===6 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6+ data.donation;
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===7 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6; 
//     const Donation_Month_7 = aggData.Donation_Momth_7+data.donation;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===8 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6; 
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8+data.donation;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===9 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6; 
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9+data.donation;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===10 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6; 
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10+data.donation;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===11 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6; 
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11+data.donation;
//     const Donation_Month_12 = aggData.Donation_Momth_12;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   } else
//   if(aggData.createdMonth===12 && aggData.createdYear===year){
//     const Donation_Month_1 = aggData.Donation_Month_1;
//     const Donation_Month_2 = aggData.Donation_Momth_2;
//     const Donation_Month_3 = aggData.Donation_Momth_3;
//     const Donation_Month_4 = aggData.Donation_Momth_4;
//     const Donation_Month_5 = aggData.Donation_Momth_5;
//     const Donation_Month_6 = aggData.Donation_Momth_6; 
//     const Donation_Month_7 = aggData.Donation_Momth_7;
//     const Donation_Month_8 = aggData.Donation_Momth_8;
//     const Donation_Month_9 = aggData.Donation_Momth_9;
//     const Donation_Month_10 = aggData.Donation_Momth_10;
//     const Donation_Month_11 = aggData.Donation_Momth_11;
//     const Donation_Month_12 = aggData.Donation_Momth_12+data.donation;
//     const MonthlyDonation:any[]=
//   [Donation_Month_1, Donation_Month_2,  Donation_Month_3, Donation_Month_4, Donation_Month_5, Donation_Month_6, Donation_Month_7, Donation_Month_8, Donation_Month_9, Donation_Month_10, Donation_Month_11 ,Donation_Month_12]
//   return AggRef.update(MonthlyDonation)
//   }
//   //   const next ={
//   //   artist_patron_amount : aggData.artist_patron_amount + data.donation,
//   //   // MonthlyDonation
//   //   }
//    return null
//   });
// get total donation entirely 
exports.AggregateProjectDonationForUser = functions.firestore
    .document('users/{userId}/patronized_projects/{donationId}').onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const donationId = context.params.donationId;
    const userId = context.params.userId;
    const data = snapshot.data();
    // const aggRef = db.collection('users').doc(userId)
    //const vx = db.doc('aggregation/{userId}/donations/{donationId}');
    const aggRef = config_1.db.doc('aggregation/project_donation');
    const aggDoc = yield aggRef.get();
    const aggData = aggDoc.data();
    // Aggregate New Data
    const next = {
        total: aggData.total + data.donation,
        count: aggData.count + 1,
    };
    return aggRef.update(next);
}));
// get total donation entirely 
exports.AggregateArtistDonationForUser = functions.firestore
    .document('users/{userId}/patronized_artists/{donationId}').onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const donationId = context.params.donationId;
    const userId = context.params.userId;
    const data = snapshot.data();
    // const aggRef = db.collection('users').doc(userId)
    //const vx = db.doc('aggregation/{userId}/donations/{donationId}');
    const aggRef = config_1.db.doc('aggregation/artist_donation');
    const aggDoc = yield aggRef.get();
    const aggData = aggDoc.data();
    // Aggregate New Data
    const next = {
        total: aggData.total + data.donation,
        count: aggData.count + 1,
    };
    return aggRef.update(next);
}));
//////////////////////////////////////////
/// User Statistics Overview /////////////////////
///////////////////////////////////////////
/// count of managed artists 
exports.AggregateUserManagingArtist = functions.firestore
    .document('users/{userId}/managed_artists/{artistId}')
    .onWrite((change, context) => {
    const artistId = context.params.artistId;
    const userId = context.params.userId;
    const docRef = config_1.db.collection('users').doc(userId);
    // get all followers data and aggregate 
    return docRef.collection('managed_artists')
        .get()
        .then(querySnapShot => {
        const user_managing_artist_count = querySnapShot.size;
        const recent_Managing_Artists = [];
        // add data from 6 most recent donors to the array
        querySnapShot.forEach(doc => {
            recent_Managing_Artists.push(doc.data());
        });
        recent_Managing_Artists.splice(6);
        const data = { user_managing_artist_count, recent_Managing_Artists };
        // run upate on firebase 
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
//// count of managed projects
exports.AggregateUserManagingProject = functions.firestore
    .document('users/{userId}/managed_projects/{projectId}')
    .onWrite((change, context) => {
    const projectId = context.params.projectId;
    const userId = context.params.userId;
    const docRef = config_1.db.collection('users').doc(userId);
    // get all followers data and aggregate 
    return docRef.collection('managed_projects')
        .get()
        .then(querySnapShot => {
        const user_managing_project_count = querySnapShot.size;
        const recent_Managing_Projects = [];
        // add data from 6 most recent donors to the array
        querySnapShot.forEach(doc => {
            recent_Managing_Projects.push(doc.data());
        });
        recent_Managing_Projects.splice(6);
        const data = { user_managing_project_count, recent_Managing_Projects };
        // run upate on firebase 
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
/// count of patronized artist
exports.AggregateUserPatronizingArtist = functions.firestore
    .document('users/{userId}/patronized_artists/{artistId}')
    .onWrite((change, context) => {
    const artistId = context.params.artistId;
    const userId = context.params.userId;
    const docRef = config_1.db.collection('users').doc(userId);
    // get all followers data and aggregate 
    return docRef.collection('patronized_artists')
        .get()
        .then(querySnapShot => {
        const user_patronizing_artist_count = querySnapShot.size;
        const recent_Patronising_artists = [];
        // add data from 6 most recent donors to the array
        querySnapShot.forEach(doc => {
            recent_Patronising_artists.push(doc.data());
        });
        recent_Patronising_artists.splice(6);
        const data = { user_patronizing_artist_count, recent_Patronising_artists };
        // run upate on firebase 
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
//// count of patronizing project
exports.AggregateUserPatronizingProject = functions.firestore
    .document('users/{userId}/patronized_projects/{projectId}')
    .onWrite((change, context) => {
    const projectId = context.params.projectId;
    const userId = context.params.userId;
    const docRef = config_1.db.collection('users').doc(userId);
    // get all followers data and aggregate 
    return docRef.collection('patronized_projects')
        .get()
        .then(querySnapShot => {
        const user_Patronizing_project_count = querySnapShot.size;
        const recent_Patronizing_Projects = [];
        // add data from 6 most recent donors to the array
        querySnapShot.forEach(doc => {
            recent_Patronizing_Projects.push(doc.data());
        });
        recent_Patronizing_Projects.splice(6);
        const data = { user_Patronizing_project_count, recent_Patronizing_Projects };
        // run upate on firebase 
        return docRef.update(data);
    })
        .catch(err => console.log(err));
});
//# sourceMappingURL=aggregate.js.map