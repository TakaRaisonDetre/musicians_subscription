import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { pipe } from '../../../../node_modules/rxjs';
import {Inbox} from '../../shared/models/inbox.model';

export interface Mail {
    senderId : any;
    senderName : any;
    senderPhoto : any;
    receiverId: any;
    receiverName :any;
    receiverPhote :any;
    subject :any;
    message :any;
    createdAt :any;
    selected : boolean;

}

@Injectable()
export class InboxService {

    outgoingMailCollection : AngularFirestoreCollection<Inbox>
    outgoingMail:Observable<Inbox[]>;
    incomingMailCollection : AngularFirestoreCollection<Inbox>
    incomingMail:Observable<Inbox[]>;
    MessageDoc: AngularFirestoreDocument<Inbox>;
    constructor (private afs : AngularFirestore){

    }
getOutGoingMail(userId){
   this.outgoingMail = this.afs.collection('inbox',
     ref=>{ return ref
      .where('senderId', '==', `${userId}`)
     }).snapshotChanges().pipe(map(changes=>{
        return changes.map(a=>{
            const data = a.payload.doc.data() as Inbox
            data.id=a.payload.doc.id;
            return data;
           });
     }));
     return this.outgoingMail;
}   

getIncomingMail(userId){
   this.incomingMail = this.afs.collection('inbox',
   ref=>{return ref
    .where('recieverid', '==', `${userId}`)
   }).snapshotChanges().pipe(map(changes=>{
      return changes.map(a=>{
          const data = a.payload.doc.data() as Inbox
          data.id=a.payload.doc.id;
          return data;
         });
   }));
   return this.incomingMail;
    

} 
SaveMail(mailData){
const Path ='inbox/'
this.afs.collection(Path).add(mailData)
}

deleteMessage(messageid : Inbox){
 this.MessageDoc = this.afs.doc(`inbox/${messageid}`)
this.MessageDoc.delete();
}
}