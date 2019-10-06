import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//import {Npo} from './npos';
import {Artist} from '../models/artist.model';
import { SSF_Artist } from '../models/ssf_artist.model';

import {EventImage} from '../models/event_image.model';
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

@Injectable()
export class FirebaseService {


artistsCollection: AngularFirestoreCollection<Artist>;
artists:Observable<Artist[]>;
artistDoc: AngularFirestoreDocument<Artist>;

projectCollection: AngularFirestoreCollection<Project>;
project: Observable<Project[]>;


artists_Under_User_Collection:AngularFirestoreCollection<Artist>;
artist_under_user:Observable<Artist[]>;
id:any;

fan_under_User_Collection: AngularFirestoreCollection<Fans>;
fan_under_user:Observable<Fans[]>;

ssf_artists_collection:AngularFirestoreCollection<SSF_Artist>;
ssf_artists:Observable<SSF_Artist[]>;

featured_Collection:AngularFirestoreCollection<Featured>;
featured:Observable<Featured[]>;

eventsCollection:AngularFirestoreCollection<Event>;
events:Observable<Event[]>;

imgCollection:AngularFirestoreCollection<EventImage>;
imgs:Observable<EventImage[]>;

ParticipantsCollection:AngularFirestoreCollection<Participants>;
participants:Observable<Participants[]>;

FansCollection: AngularFirestoreCollection<Members>;
members:Observable<Members[]>;

NPOCollection : AngularFirestoreCollection<Project>;
npos:Observable<Project[]>;

fArtists:Observable<Artist[]>;
artistwithFans: Observable<Artist[]>;

constructor(public afs: AngularFirestore){
    this.artistsCollection = this.afs.collection('artists');
   
    this.ParticipantsCollection=this.afs.collection('event-paritipation');
 
}
getUsersNumber(){
    return this.afs.collection(`users`).valueChanges();
}
getArtistNumber(){
    return this.afs.collection(`artists`).valueChanges();
}
getProjectNumber(){
    return this.afs.collection(`projects`).valueChanges();
}
getEventNumber(){
    return this.afs.collection(`projects`, ref=>{
        return ref
    .where('type','==', 'EventIdea')
    }).valueChanges();
}

getUser(uid: string){
    return this.afs.doc(`users/${uid}`).snapshotChanges().pipe(map(snap=>{
        const data = snap.payload.data() as Users
        const id = snap.payload.id;
        return {id,...data};
    }))
}

getSingleArtist(id : string){
    return this.afs.doc(`artists/${id}`).snapshotChanges().pipe(map(snap=>{
        const data = snap.payload.data() as Artist;
        const id = snap.payload.id;
        return {id,...data};
    }));
}
// get all starts that belong to artist 
getSingleArtistbyUser(userId) {
    const artRef = this.afs.collection('artists', ref=> 
ref.where('userId','==', `${userId}`));
     
    return artRef.valueChanges();
}
getSingleProject(id : string){
    return this.afs.doc(`projects/${id}`).snapshotChanges().pipe(map(snap=>{
        const data = snap.payload.data() as Event;
        const id = snap.payload.id;
        return {id,...data};
    }));
}
getEventImages(){
  this.imgs = this.afs.collection('event-image').snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
            const data = a.payload.doc.data() as EventImage;
            data.id=a.payload.doc.id;
            return data;
        });
    }));
    
        return this.imgs;
    }
getEventImageswithEventID(eventId){
    const eventImageRef = this.afs.collection('event-image', ref=>ref.where(
            'eventId','==', `${eventId}`));
            return eventImageRef.valueChanges();
          }



getArtists(){
this.artists=this.afs.collection('artists',ref=>{
    return ref
    .where('isOpen','==',true)
}).snapshotChanges().pipe(map(changes=>{
    return changes.map(a=>{
        const data = a.payload.doc.data() as Artist;
        data.id=a.payload.doc.id;
        return data;
    });
}));
    return this.artists;
}

getFeaturedArtists(){
    this.featured = this.afs.collection('featured_artists').snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
            const data = a.payload.doc.data() as Featured;
            data.id=a.payload.doc.id;
            return data;
        })
    }));
    return this.featured;
}

getSingleFeaturedArtist(artistId){
    return this.afs.doc(`featured_artists/${artistId}`).snapshotChanges().pipe(map(snap=>{
        const data = snap.payload.data() as Featured;
        const id = snap.payload.id;
        return {id,...data};
    }));
}
// get artist from user collection 
 getArtistsUnderUser(userId){
 this.artist_under_user=this.afs.collection(`users/${userId}/managed_artists`).snapshotChanges().pipe(map(changes=>{
return changes.map(a=>{
        const data = a.payload.doc.data() as Artist;
         data.id=a.payload.doc.id;
         return data;
    });
  }));
 return this.artist_under_user;
 }
 
// get project assocaited with the user 
getProjectsUnderUser(userId){
    this.project = this.afs.collection(`users/${userId}/managed_projects`).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
            const data = a.payload.doc.data() as Project;
            data.id=a.payload.doc.id;
            return data
        });
    }));
    return this.project;
}

getFanUnderThisArtist(userId, artistName){
    this.fan_under_user = this.afs.collection('artists')
    .doc(`${userId}_${artistName}`).collection('fans').snapshotChanges().pipe(map(
        changes=>{
          return changes.map(f=>{
           const data =f.payload.doc.data()
           data.id = f.payload.doc.id;
           return data;
          });
        }));
        return this.fan_under_user;
}
getFeaturedProjects(){
this.npos= this.afs.collection('projects', ref=>{
    return ref
    .where('featured','==', true)
    .where('isOpen','==', true)
}).snapshotChanges().pipe(map(changes=>{
    return changes.map(a=>{
     const data = a.payload.doc.data() as Project;
     data.id=a.payload.doc.id;
     return data;
    });
}));
return this.npos;
}
getFeaturedArt(){
    this.npos= this.afs.collection('artists', ref=>{
        return ref
        .where('featured','==', true)
        .where('isOpen','==', true)
    }).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
         const data = a.payload.doc.data() as Project;
         data.id=a.payload.doc.id;
         return data;
        });
    }));
    return this.npos;
    }
 getFundedArt(){
  this.fArtists= this.afs.collection('artists', ref=>{
    return ref
    .where('isFunding','==', true)
    .where('isOpen','==', true)
}).snapshotChanges().pipe(map(changes=>{
    return changes.map(a=>{
     const data = a.payload.doc.data() as Artist;
     data.id=a.payload.doc.id;
     return data;
    });
}));
return this.fArtists;
}
getFanClubArt(){
    this.artistwithFans = this.afs.collection('artists', ref=>{
        return ref 
        .where('isMonthlySubscribed','==', true)
        .where('isOpen','==', true)
    }).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
         const data = a.payload.doc.data() as Artist;
         data.id=a.payload.doc.id;
         return data;
        });
    }));
    return this.artistwithFans;
    }
getNPOProjects(){
   this.npos = this.afs.collection('projects', ref=>{
       return ref
       .where('type','==','npo')
       .where('isOpen','==', true)
   }).snapshotChanges().pipe(map(changes=>{
    return changes.map(a=>{
        const data = a.payload.doc.data() as Project;
        data.id = a.payload.doc.id;
        return data;
    });
   }));
 return this.npos
}
getMediaArtProjects(){
    this.npos = this.afs.collection('projects', ref=>{
        return ref
        .where('status','==', false)
        .where('type','==','EventIdea')
        .where('isOpen','==', true)
    }).snapshotChanges().pipe(map(changes=>{
     return changes.map(a=>{
         const data = a.payload.doc.data() as Project;
         data.id = a.payload.doc.id;
         return data;
     });
    }));
  return this.npos
 }    
 getEventDunamiseProjects(){
    this.npos = this.afs.collection('projects', ref=>{
        return ref
     //  .where('status', '==', true)
        .where('type', '==', 'EventIdea')
        .where('isOpen','==', true)
    }).snapshotChanges().pipe(map(changes=>{
     return changes.map(a=>{
         const data = a.payload.doc.data() as Project;
         data.id = a.payload.doc.id;
         return data;
     });
    }));
  return this.npos
 } 
 getEventEnergiaProjects(){
     this.npos = this.afs.collection('projects', ref=>{
         return ref
        // .where('status','==',false)
         .where('type','==', 'Event')
         .where('isOpen','==',true)
     }).snapshotChanges().pipe(map(changes=>{
         return changes.map(a=>{
             const data = a.payload.doc.data() as Project;
             data.id=a.payload.doc.id;
             return data;
         });
     }));
     return this.npos
 }
 getFilmProjects(){
    this.npos = this.afs.collection('projects', ref=>{
        return ref
        .where('type','==','Film')
        .where('isOpen','==', true)
    }).snapshotChanges().pipe(map(changes=>{
     return changes.map(a=>{
         const data = a.payload.doc.data() as Project;
         data.id = a.payload.doc.id;
         return data;
     });
    }));
  return this.npos
 }    
//////////////
//// Addition of artist
///////////
AddArtist(artist: Artist, year, userId, artistName){
// shared path commonly used user-artist sub collection and artist collection 
    const sharedPath = `artists/${userId}_${artistName}`;
// artist collection data
    this.afs.doc(sharedPath).set(artist);
// subcollection of users
   const SharedPathTwo = `users/${userId}/managed_artists/${userId}_${artistName}`;
// user sub collection 
   this.afs.doc(SharedPathTwo).set(artist);
  
   let monthlydonation = {
   Jan:0,Feb:0,Mar:0,Apr:0 ,May:0,
    Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,
   }
   
const SharedpathThree = `artists/${userId}_${artistName}/monthly_donation/${year}`;
const SharedpathFour =  `artists/${userId}_${artistName}/monthly_fanclub_subscription/${year}`;
this.afs.doc(SharedpathThree).set(monthlydonation);
this.afs.doc(SharedpathFour).set(monthlydonation);

}

updateArtist(artist: Artist, userId){
    // shared path commonly used user-artist sub collection and artist collection 
      const sharedPath = `artists/${artist.id}`;
     // artist collection data
      this.afs.doc(sharedPath).update(artist);
  // subcollection of users
     const SharedPathTwo = `users/${userId}/managed_artists/${artist.id}`;
   // user sub collection 
     this.afs.doc(SharedPathTwo).update(artist);
  
  }
/////////////
//// Addition of Project
////////////
AddProject(project : Project, year, userId, projectName ) {
    const sharedPath = `projects/${userId}_${projectName}`;
    // save data to project collection
    this.afs.doc(sharedPath).set(project);
    // as sub collection of users 
    const sharedPathTwo = `users/${userId}/managed_projects/${userId}_${projectName}`
    // save it
    this.afs.doc(sharedPathTwo).set(project);

    let monthlydonation = {
        Jan:0,Feb:0,Mar:0,Apr:0,May:0,
        Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,
       }
       const SharedpathThree = `projects/${userId}_${projectName}/monthly_donation/${year}`;
       this.afs.doc(SharedpathThree).set(monthlydonation);
       const SharedpathFour = `projects/${userId}_${projectName}/monthly_sales/${year}`;
       this.afs.doc(SharedpathFour).set(monthlydonation);
}
updateProject(Project : Project, userId){
    
    const  sharedPath = `projects/${Project.id}`;
    this.afs.doc(sharedPath).update(Project);

    const sharedPathTwo = `users/${userId}/managed_projects/${Project.id}`;
    this.afs.doc(sharedPathTwo).update(Project);
}



  updateUser(user: Users, userId){
    // shared path commonly used 
    const savePath = `users/${userId}`;
    this.afs.doc(savePath).update(user);

}
// descriptive html field 
updateUserDescription(description, userId){
    const savePath=`users/${userId}`;
    this.afs.doc(savePath).update(description);
}
// descriptive html field 
updateUserExpectation(description, userId){
    const savePath=`users/${userId}`;
    this.afs.doc(savePath).update(description);
}

updateUserInfo(profile, userId){
    const savePath = `users/${userId}`;
    this.afs.doc(savePath).update(profile);
}
 updateArtistImage(path, userId){
     // shared path commonly used user-artist sub collection and artist collection 
     const sharedPath = `artists/${userId}_artist`;
     // artist collection data
      this.afs.doc(sharedPath).update(path);
  // subcollection of users
     const SharedPathTwo = `users/${userId}/artists/${userId}_artist`;
   // user sub collection 
     this.afs.doc(SharedPathTwo).update(path); 
 } 

/////////////
//// Event participants to firebase
/////////////

setAttendees(userInfo:Participants, eventId, userId){
    this.ParticipantsCollection.add(userInfo)
    const Path = `events/${eventId}/participants/${userId}`;
    this.afs.doc(Path).set(userInfo);
}




// setAttendees(userId, eventId, totalAmount){
//     // Star document data
//     const participants : Participants = {userId, eventId, totalAmount};
//     // custom doc Id for relationship
//     const participantsPath = `event-paritipation/${participants.userId}_${participants.eventId}`;
//     // set a data return the promise
//     return this.afs.doc(participantsPath).set(participants)
// }

//////////////
///// Fan to firebase 
//////////////

setFans(Member:Members, artistId, usersId){
//this.FansCollection.add(Member)
const Path =`artists/${artistId}/fans/${usersId}`;
this.afs.doc(Path).set(Member);
}
setArtPlan(Member:Members, artistId, usersId){
   // this.FansCollection.add(Member)
    const Path =`artists/${artistId}/fans/${usersId}`;
    this.afs.doc(Path).update(Member);
}
//////////////
//// Donor to firebase
/////////////
setDonors(DonorInfo, npoId, userId){
const Path = `npos/${npoId}/donors/${userId}`;
this.afs.doc(Path).set(DonorInfo)

}
setNPOPlan(DonorInfo, npoId, userId){
    const Path = `npos/${npoId}/donors/${userId}`;
    this.afs.doc(Path).update(DonorInfo)
}


AddProjectPatron(patron, projectId, userId){
    const Path = `projects/${projectId}/patrons/${userId}`;
    //const Path = `patrons/${userId}`
    this.afs.doc(Path).set(patron);
    const SharedPathTwo = `users/${userId}/patronized_project/${projectId}`;
    // user sub collection 
      this.afs.doc(SharedPathTwo).set(patron); 
   
}



}