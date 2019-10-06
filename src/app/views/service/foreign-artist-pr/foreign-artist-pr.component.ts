import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foreign-artist-pr',
  templateUrl: './foreign-artist-pr.component.html',
  styleUrls: ['./foreign-artist-pr.component.scss']
})
export class ForeignArtistPrComponent implements OnInit {
  isAnnualSelected: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
