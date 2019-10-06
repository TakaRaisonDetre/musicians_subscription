import  { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
    

    //firebase user ID corss component sharing
     private userIdSource = new BehaviorSubject<string>('');
     currentUserId = this.userIdSource.asObservable();

    private mailidToSource = new BehaviorSubject<string>('');
    currentMailRecieverid = this.mailidToSource.asObservable();
   
    private mailNameToSource = new BehaviorSubject<string>('');
    currentMailRecieverName = this.mailNameToSource.asObservable();
   
    private mailPhotoToSource = new BehaviorSubject<string>('');
    currentMailRecieverPhoto = this.mailPhotoToSource.asObservable();
     

    // firebase artist ID cross compoent sharing 
    private messageSource = new BehaviorSubject<string>("");
    curentMessage = this.messageSource.asObservable();

   // language cross component sharing 
   private languageSource = new BehaviorSubject<string>('en')
   currentLanguage = this.languageSource.asObservable();

   // share project ID
   private projectSource = new BehaviorSubject<string>("");
   currentProject = this.projectSource.asObservable();

 // membership share
 private membertypeSource = new BehaviorSubject<string>("");
  currentmemberType = this.membertypeSource.asObservable();

// featured artist share 
private featuredArtistSource = new BehaviorSubject<string>("");
  currentFeaturedArtist = this.featuredArtistSource.asObservable();

private project_or_artistSource = new BehaviorSubject<string>("");
  currentProject_or_Artist = this.project_or_artistSource.asObservable();

    constructor(){}

changeCurrentUserId(userId : string){
    this.userIdSource.next(userId)
}
changeMailtoID(recieverid : string) {
    this.mailidToSource.next(recieverid);  
}
changeMailtoName( recieverName:string){
    this.mailNameToSource.next(recieverName);
}
changeMailtoPhoto(reciverPhoto:string){
    this.mailPhotoToSource.next(reciverPhoto);
}
changeMessage(fb_artistId : string) {
    this.messageSource.next(fb_artistId);
}
changeLanguage(currentLang : string){
    this.languageSource.next(currentLang);
}
changeProject(currentProject : string){
    this.projectSource.next(currentProject);
}
changeMemberType(currentmemberType: string){
    this.membertypeSource.next(currentmemberType);
}
changeFeaturedArtist(currentFeaturedArtist: string){
    this.featuredArtistSource.next(currentFeaturedArtist);
}
changeProjectOrArtist(currentProject_or_Artist: string){
    this.project_or_artistSource.next(currentProject_or_Artist);
}
}