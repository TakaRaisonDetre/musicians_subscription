import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogClose} from '@angular/material';
import {FormGroup, FormControl, Validators, FormBuilder ,AbstractControl} from '@angular/forms';
import {DataService} from '../../../shared/services/data.service';
import {InboxService} from '../../../shared/services/inbox.service';
import {AuthService} from '../../../core/auth.service';
import  {finalize, tap} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-profile-art-image',
  templateUrl: './profile-art-image.component.html',
  styleUrls: ['./profile-art-image.component.scss']
})
export class ProfileArtImageComponent implements OnInit {

isHovering : boolean;
files:File[]=[];
art:string;

toggleHover(event:boolean){
  this.isHovering =event;

}
onDrop(files:FileList){
  for(let i=0; i<files.length; i++)
  {
    this.files.push(files.item(i));
  };
}

  constructor(
    public snackBar : MatSnackBar,
    private afs: AngularFirestore,
    private fb : FormBuilder,
    private composeDialog : MatDialog,
    private data: DataService,
    public auth : AuthService,
    private storage : AngularFireStorage,
    private db : AngularFirestore
  ) { }

  ngOnInit() {
    this.data.currentProject_or_Artist.subscribe(art=>
      this.art=art)
      console.log(this.art)
  }

}
