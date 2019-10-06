import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProjectDataService {

// share project ID
private projectSource = new BehaviorSubject<string>("");
currentProject = this.projectSource.asObservable();

// membership share
private membertypeSource = new BehaviorSubject<string>("");
currentmemberType = this.membertypeSource.asObservable();

  constructor(){}

changeProject(currentProject : string){
    this.projectSource.next(currentProject);
}

changeMemberType(currentmemberType: string){
    this.membertypeSource.next(currentmemberType);
}
}

