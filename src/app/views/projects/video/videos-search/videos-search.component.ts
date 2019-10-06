import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { YoutubeApiService } from '../../../../shared/services/video_service/youtube-api.service';
import { YoutubePlayerService } from '../../../../shared/services/video_service/youtube-player.service';
import { NotificationService } from '../../../../shared/services/video_service/notification.service';
// to receive artist / project ID 
import {FirebaseService} from '../../../../shared/services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';

// Share firebase artists
import {DataService} from "../../../../shared/services/data.service";

@Component({
  selector: 'videos-search',
  templateUrl: './videos-search.component.html',
  styleUrls: ['./videos-search.component.css']
})
export class VideosSearchComponent {
  @Output() videosUpdated = new EventEmitter();
  @Input() loadingInProgress;

  artist:any;
  artistId:any;
  art:any;
  id:any;
  yt:any;
  npo:any;

  private last_search: string;

  public searchForm = this.fb.group({
    query: ['', Validators.required]
  });


  constructor( 
    public fb: FormBuilder,
    private youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private notificationService: NotificationService,
    private fbs: FirebaseService,
    private route : ActivatedRoute,
    private router : Router,
    private data: DataService
    ) 
    { 
      // share this artist Id wirh data service
    this.data.currentProject.subscribe(artistId=>this.artistId=artistId);

      this.artist = this.route.params.switchMap(
        param=>this.fbs.getSingleArtist(param.id))
      
      this.artist.subscribe(art=>{
        this.art=art;
        console.log(this.art.id)
         // this.youtubeService.searchVideos('')
     this.youtubeService.searchVideos(this.art.videoquery) 
     .then(data => {
        this.videosUpdated.emit(data);
       console.log(this.art.videoquery)
      })
      })  
      

    }

    doSearch(event): void {
      if (this.loadingInProgress ||
        (this.searchForm.value.query.trim().length === 0) ||
        (this.last_search && this.last_search === this.searchForm.value.query)) {
        return;
      }
  
      this.videosUpdated.emit([]);
      this.last_search = this.searchForm.value.query;
  
      this.youtubeService.searchVideos(this.last_search)
        .then(data => {
          if (data.length < 1) {
            this.notificationService.showNotification('No matches found.');
          }
          this.videosUpdated.emit(data);
        })
    }
  }
  