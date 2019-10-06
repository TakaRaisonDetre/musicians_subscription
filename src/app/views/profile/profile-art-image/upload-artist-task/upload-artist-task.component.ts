import { Component, OnInit, Input } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import { DataService } from 'app/shared/services/data.service';
import { AuthService } from 'app/core/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'upload-artist-task',
  templateUrl: './upload-artist-task.component.html',
  styleUrls: ['./upload-artist-task.component.scss']
})
export class UploadArtistTaskComponent implements OnInit {

@Input() file:File;
task : AngularFireUploadTask;
percentage : Observable<number>
snapshot : Observable<any>
downloadURL;
userId: any;
art: string;


  constructor(
    private storage: AngularFireStorage,
    private db : AngularFirestore,
    private data : DataService,
    public auth : AuthService
  ) { }

  ngOnInit() {
  this.startUpload();
    this.data.currentProject_or_Artist.subscribe(
      art=>this.art=art)
      console.log(this.art)
   this.data.currentUserId.subscribe(
        userid =>this.userId = userid)
  }

startUpload(){
// the storange path 
const path = `artists/${Date.now()}_${this.file.name}`;
// reference to storage bucket
const ref = this.storage.ref(path);
// the main task 
this.task = this.storage.upload(path, this.file);
// progress monitoring
this.percentage = this.task.percentageChanges();

this.snapshot = this.task.snapshotChanges().pipe(
  tap(console.log),
  // the file download URL
  finalize( async()=>{
    this.downloadURL = await ref.getDownloadURL().toPromise();
   
    const imagePathToArtists = `artists/${this.userId}_${this.art}`
    const imagePathToUser = `users/${this.userId}/managed_artists/${this.userId}_${this.art}`

    const image ={
      path: this.downloadURL, 
      accesspath: path,
      roles: {artist:true},
     };
    this.db.doc(imagePathToArtists).set(image, {merge:true});
    this.db.doc(imagePathToUser).set(image, {merge:true});

   
  }),
) 

}

isActive(snapshot){
  return snapshot.state = 'running'
  && snapshot.bytesTransferred < snapshot.totalBytes;
}

}
