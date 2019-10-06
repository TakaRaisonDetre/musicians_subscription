import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { pipe } from '../../../../node_modules/rxjs';
import {Follower} from '../../shared/models/follower.model';
import {Connection} from '../../shared/models/connection.model';


export interface Follow 
{
followedId:any;
followingId:any;
value:1;
}


@Injectable()
export class followService {
follower_under_User_Collection: AngularFirestoreCollection<Follower>;
fallower_under_user:Observable<Follower[]>;

requestCollection : AngularFirestoreCollection<Connection>;
requests:Observable<Connection[]>;


constructor(private afs: AngularFirestore)
{ }

getUserFollowerforArtists(followedId)
{
　　const FollowedRef = this.afs.collection(`artists/${followedId}/followed`);
　　return FollowedRef.valueChanges();
}
// this does not work 
getArtistsUserFollow(userId)
 {
 　　const FollowingRef = this.afs.collection(`users/${userId}/following_artists`);
 　　return FollowingRef.valueChanges();
  }
getUserFollowerforProject(projectId)
{
　　const FollowedRef = this.afs.collection(`projects/${projectId}/followed`);
　　return FollowedRef.valueChanges();
 }
// this does not work 
 getProjectUnderThisUser(userId)
 {
 　　const FollowingProject = this.afs.collection(`users/${userId}/following_projects`);
 　　return FollowingProject.valueChanges();
 }
getUserFollowing(followingId)
{
　　const FollowingRef = this.afs.collection('follow', ref=>ref.where('followingId','==', followingId));
　　return FollowingRef.valueChanges();
}
// Update follower
setFollower_artist(followingId, followedId, value){
    const fl : Follow ={ followingId, followedId, value };
   // create custom Id for that document
   const flPath = `artist_follows/${fl.followingId}_${fl.followedId}`;
   //set a data, return the promise
   return this.afs.doc(flPath).set(fl);
}
setArtistFollow(Member, artistId, usersId){
    //this.FansCollection.add(Member)
    const Path =`artists/${artistId}/followed/${usersId}_${artistId}`;
    this.afs.doc(Path).set(Member);
    const Path2 = `users/${usersId}/following_artists/${artistId}_${usersId}`;
    this.afs.doc(Path2).set(Member);
    }
setProjectFollow(Member, projectId, userId){
     //this.FansCollection.add(Member)
     const Path =`projects/${projectId}/followed/${userId}_${projectId}`;
     this.afs.doc(Path).set(Member);
     const Path2 = `users/${userId}/following_projects/${projectId}_${userId}`;
     this.afs.doc(Path2).set(Member);
}
// User Connection Reqeust
ConnectwithUser(connection, RequesterId, requestedId){
  const Path = `connections/${RequesterId}_${requestedId}`;
  this.afs.doc(Path).set(connection);
  const Path1 = `users/${requestedId}/connected_users/${RequesterId}`;
  this.afs.doc(Path1).set(connection);
  const Path2 = `users/${RequesterId}/connected_users/${requestedId}`;
  this.afs.doc(Path2).set(connection);
}

CheckToConnected(userId, RequesterId){
    return this.afs.doc(`users/${RequesterId}/connected_users/${userId}`).snapshotChanges().pipe(map(snap=>{
        const data = snap.payload.data() as Connection;
        const id = snap.payload.id;
        return {id,...data};
    }));
}

ConnectionRequestList(userId){
    this.requests= this.afs.collection('connections', 
    ref=>{ return ref
        .where('requestTo','==', `${userId}`)
        .where('connected','==', false)
    }).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
         const data = a.payload.doc.data() as Connection;
         data.id=a.payload.doc.id;
         return data;
        });
    }));
    return this.requests;  
}
getConnectionTo(userId){
    this.requests = this.afs.collection(`users/${userId}/connected_users`,
    ref=>{return ref
    //this needs to be reviewd
    
    }).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
            const data = a.payload.doc.data() as Connection;
            data.id=a.payload.doc.id;
            return data;
           });
       }));
       return this.requests;  
}
getConnectionFrom(userId){
    this.requests = this.afs.collection(`users/${userId}/connected_users`,
    ref=>{return ref
        .where('requestFrom','==', `${userId}` )
        .where('connected','==', true)
    }).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
            const data = a.payload.doc.data() as Connection;
            data.id=a.payload.doc.id;
            return data;
           });
       }));
       return this.requests;  
}

ConfirmConnection(requestorId, requestedId){
 const connected = {connected:true}
 const path = `connections/${requestorId}_${requestedId}`;
   this.afs.doc(path).update(connected);
   const Path1 = `users/${requestedId}/connected_users/${requestorId}`;
   this.afs.doc(Path1).update(connected);
   const Path2 = `users/${requestorId}/connected_users/${requestedId}`;
   this.afs.doc(Path2).update(connected);
}

}